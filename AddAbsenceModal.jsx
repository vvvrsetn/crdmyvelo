import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddAbsenceModal = ({ lesson, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');
  const [date, setDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit({
      lessonId: lesson?.id,
      reason,
      date
    });
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="absence-modal-title"
    >
      <div className="bg-card rounded-xl p-6 md:p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 id="absence-modal-title" className="text-xl md:text-2xl font-bold text-foreground">
            Προσθήκη Απουσίας
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-smooth focus-ring"
            aria-label="Κλείσιμο"
          >
            <Icon name="X" size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Μάθημα</p>
          <p className="font-semibold text-foreground">{lesson?.name}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Τρέχουσες απουσίες: <span className="font-medium text-foreground">{lesson?.currentAbsences} / {lesson?.absenceLimit}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Ημερομηνία Απουσίας"
            type="date"
            value={date}
            onChange={(e) => setDate(e?.target?.value)}
            required
          />

          <Input
            label="Αιτιολογία (προαιρετικό)"
            type="text"
            placeholder="π.χ. Ασθένεια, Προσωπικοί λόγοι"
            value={reason}
            onChange={(e) => setReason(e?.target?.value)}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Ακύρωση
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Check"
              iconPosition="left"
              className="flex-1"
            >
              Προσθήκη
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAbsenceModal;
