import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/navigation/BottomTabNavigation';
import SemesterSelector from '../../components/navigation/SemesterSelector';
import LessonCard from './components/LessonCard';
import SummaryStats from './components/SummaryStats';
import AddAbsenceModal from './components/AddAbsenceModal';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AcademicHomeDashboard = () => {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [showAbsenceModal, setShowAbsenceModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const mockLessons = [
    {
      id: 1,
      name: "Προγραμματισμός Υπολογιστών Ι",
      instructor: "Δρ. Γεώργιος Παπαδόπουλος",
      currentAbsences: 2,
      absenceLimit: 10,
      hoursPerWeek: 4,
      credits: 6
    },
    {
      id: 2,
      name: "Μαθηματικά Ι",
      instructor: "Καθ. Μαρία Κωνσταντίνου",
      currentAbsences: 8,
      absenceLimit: 10,
      hoursPerWeek: 5,
      credits: 7
    },
    {
      id: 3,
      name: "Φυσική Ι",
      instructor: "Δρ. Νικόλαος Αθανασίου",
      currentAbsences: 1,
      absenceLimit: 8,
      hoursPerWeek: 3,
      credits: 5
    },
    {
      id: 4,
      name: "Αγγλικά Ι",
      instructor: "Κα. Ελένη Δημητρίου",
      currentAbsences: 5,
      absenceLimit: 12,
      hoursPerWeek: 2,
      credits: 4
    },
    {
      id: 5,
      name: "Εισαγωγή στην Πληροφορική",
      instructor: "Δρ. Κωνσταντίνος Ιωάννου",
      currentAbsences: 0,
      absenceLimit: 10,
      hoursPerWeek: 3,
      credits: 5
    },
    {
      id: 6,
      name: "Διακριτά Μαθηματικά",
      instructor: "Καθ. Σοφία Μιχαηλίδου",
      currentAbsences: 9,
      absenceLimit: 10,
      hoursPerWeek: 4,
      credits: 6
    }
  ];

  const summaryStats = {
    totalLessons: mockLessons?.length,
    averageAbsences: Math.round(
      (mockLessons?.reduce((sum, lesson) => sum + (lesson?.currentAbsences / lesson?.absenceLimit) * 100, 0) / mockLessons?.length)
    ),
    upcomingDeadlines: 3
  };

  const handleAddAbsence = (lesson) => {
    setSelectedLesson(lesson);
    setShowAbsenceModal(true);
  };

  const handleViewDetails = (lesson) => {
    console.log('Viewing details for:', lesson?.name);
  };

  const handleAbsenceSubmit = (absenceData) => {
    console.log('Absence submitted:', absenceData);
    setShowAbsenceModal(false);
    setSelectedLesson(null);
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
    console.log('Semester changed to:', semester?.label);
  };

  const handleQuickNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <BottomTabNavigation />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Αρχική Σελίδα
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Επισκόπηση ακαδημαϊκής πορείας και απουσιών
            </p>
          </div>
          <SemesterSelector
            currentSemester={selectedSemester}
            onSemesterChange={handleSemesterChange}
          />
        </div>

        <div className="space-y-6 md:space-y-8">
          <SummaryStats stats={summaryStats} />

          <QuickActions onNavigate={handleQuickNavigate} />

          <div>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Τα Μαθήματά Μου
              </h2>
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={() => console.log('Add new lesson')}
              >
                Νέο Μάθημα
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {mockLessons?.map((lesson) => (
                <LessonCard
                  key={lesson?.id}
                  lesson={lesson}
                  onAddAbsence={handleAddAbsence}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Info" size={24} color="var(--color-primary)" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                  Συμβουλή
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Παρακολουθείτε τακτικά τις απουσίες σας για να αποφύγετε προβλήματα με τα όρια. Μαθήματα με κόκκινη ένδειξη χρειάζονται άμεση προσοχή.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAbsenceModal && selectedLesson && (
        <AddAbsenceModal
          lesson={selectedLesson}
          onClose={() => {
            setShowAbsenceModal(false);
            setSelectedLesson(null);
          }}
          onSubmit={handleAbsenceSubmit}
        />
      )}
    </div>
  );
};

export default AcademicHomeDashboard;
