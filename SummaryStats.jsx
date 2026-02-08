import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="BookOpen" size={24} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-1">Σύνολο Μαθημάτων</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{stats?.totalLessons}</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="AlertCircle" size={24} color="var(--color-warning)" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-1">Μέσος Όρος Απουσιών</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{stats?.averageAbsences}%</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="Calendar" size={24} color="var(--color-accent)" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-1">Προσεχείς Προθεσμίες</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{stats?.upcomingDeadlines}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStats;
