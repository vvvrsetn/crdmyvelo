import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import Icon from '../AppIcon';


const SetupFlowNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  const setupSteps = [
    {
      id: 'login',
      path: '/login-authentication',
      title: 'Σύνδεση',
      description: 'Εισαγωγή στο σύστημα',
      completed: false
    },
    {
      id: 'institution',
      path: '/saek-institution-selection',
      title: 'Επιλογή ΣΑΕΚ',
      description: 'Επιλέξτε το ίδρυμά σας',
      completed: false
    }
  ];

  useEffect(() => {
    const stepIndex = setupSteps?.findIndex(step => step?.path === location?.pathname);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  }, [location?.pathname]);

  const handleNext = () => {
    if (currentStep < setupSteps?.length - 1) {
      const nextStep = setupSteps?.[currentStep + 1];
      navigate(nextStep?.path);
    } else {
      navigate('/academic-home-dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = setupSteps?.[currentStep - 1];
      navigate(prevStep?.path);
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === setupSteps?.length - 1;

  return (
    <div className="setup-flow-container">
      <div className="setup-flow-card">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <Icon name="GraduationCap" size={32} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <h1 className="text-h3 font-heading text-center mb-2">myStudent</h1>
          <p className="text-muted-foreground text-center font-caption">
            Διαχείριση Ακαδημαϊκής Πορείας
          </p>
        </div>

        <div className="setup-flow-progress">
          {setupSteps?.map((step, index) => (
            <div
              key={step?.id}
              className={`setup-flow-step ${
                index === currentStep ? 'active' : ''
              } ${index < currentStep ? 'completed' : ''}`}
              aria-label={`Step ${index + 1}: ${step?.title}`}
            />
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-h4 font-heading mb-2">
            {setupSteps?.[currentStep]?.title}
          </h2>
          <p className="text-muted-foreground font-caption">
            {setupSteps?.[currentStep]?.description}
          </p>
        </div>

        <div className="flex gap-3">
          {!isFirstStep && (
            <Button
              variant="outline"
              onClick={handleBack}
              iconName="ChevronLeft"
              iconPosition="left"
              className="flex-1"
            >
              Πίσω
            </Button>
          )}
          <Button
            variant="default"
            onClick={handleNext}
            iconName={isLastStep ? 'Check' : 'ChevronRight'}
            iconPosition="right"
            className="flex-1"
          >
            {isLastStep ? 'Ολοκλήρωση' : 'Συνέχεια'}
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-caption text-muted-foreground text-center">
            Βήμα {currentStep + 1} από {setupSteps?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetupFlowNavigation;
