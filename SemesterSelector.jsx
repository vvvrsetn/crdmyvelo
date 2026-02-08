import React, { useState } from 'react';
import Button from '../ui/Button';
import Icon from '../AppIcon';

const SemesterSelector = ({ currentSemester = null, onSemesterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const semesters = [
    {
      id: 'winter-2025-2026',
      label: 'Χειμερινό 2025-2026',
      period: 'Σεπτέμβριος 2025 - Ιανουάριος 2026',
      isActive: true
    },
    {
      id: 'spring-2024-2025',
      label: 'Εαρινό 2024-2025',
      period: 'Φεβρουάριος 2025 - Ιούνιος 2025',
      isActive: false
    },
    {
      id: 'winter-2024-2025',
      label: 'Χειμερινό 2024-2025',
      period: 'Σεπτέμβριος 2024 - Ιανουάριος 2025',
      isActive: false
    },
    {
      id: 'spring-2023-2024',
      label: 'Εαρινό 2023-2024',
      period: 'Φεβρουάριος 2024 - Ιούνιος 2024',
      isActive: false
    },
    {
      id: 'winter-2023-2024',
      label: 'Χειμερινό 2023-2024',
      period: 'Σεπτέμβριος 2023 - Ιανουάριος 2024',
      isActive: false
    }
  ];

  const activeSemester = currentSemester || semesters?.find(s => s?.isActive);

  const handleSemesterSelect = (semester) => {
    if (onSemesterChange) {
      onSemesterChange(semester);
    }
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="semester-selector-trigger focus-ring"
        aria-label="Select semester"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Icon name="Calendar" size={20} strokeWidth={2} />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">{activeSemester?.label}</span>
          <span className="text-xs text-muted-foreground hidden md:block">
            {activeSemester?.period}
          </span>
        </div>
        <Icon 
          name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
          size={20} 
          strokeWidth={2}
          className="ml-auto"
        />
      </button>
      {isOpen && (
        <div
          className="semester-selector-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="semester-selector-title"
          onClick={handleClose}
          onKeyDown={handleKeyDown}
        >
          <div
            className="semester-selector-content"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 id="semester-selector-title" className="text-h4 font-heading">
                Επιλογή Εξαμήνου
              </h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-muted transition-smooth focus-ring"
                aria-label="Close semester selector"
              >
                <Icon name="X" size={20} strokeWidth={2} />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-auto">
              {semesters?.map((semester) => (
                <button
                  key={semester?.id}
                  onClick={() => handleSemesterSelect(semester)}
                  className={`semester-option w-full focus-ring ${
                    activeSemester?.id === semester?.id ? 'active' : ''
                  }`}
                  aria-pressed={activeSemester?.id === semester?.id}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{semester?.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {semester?.period}
                    </span>
                  </div>
                  {activeSemester?.id === semester?.id && (
                    <Icon 
                      name="Check" 
                      size={20} 
                      color="var(--color-primary)" 
                      strokeWidth={2}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleClose}
                fullWidth
              >
                Κλείσιμο
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SemesterSelector;
