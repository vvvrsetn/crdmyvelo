import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomTabNavigation from '../../components/navigation/BottomTabNavigation';
import Icon from '../../components/AppIcon';

const LessonDetailsPage = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();

  const mockLesson = {
    id: 537,
    name: 'ΑΡΧΕΣ ΔΙΑΦΗΜΙΣΗΣ',
    currentAbsences: 3,
    absenceLimit: 6,
    records: [
      {
        id: 1,
        date: '11 Νοέμβριος 2026',
        count: 3,
        lesson: 'ΑΡΧΕΣ MARKETING'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <BottomTabNavigation />
      
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center">
        <button onClick={() => navigate('/')} className="mr-3">
          <Icon name="ChevronLeft" size={24} color="#374151" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Στοιχεία Μαθήματος</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">ΑΡΧΕΣ ΔΙΑΦΗΜΙΣΗΣ</h2>
          
          <div className="bg-teal-50 rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-500">3</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600">Διαθέσιμο υπόλοιπο</div>
                <div className="text-2xl font-bold text-gray-900">3</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">Καταχωρήσεις</h3>
          <p className="text-sm text-gray-500 mb-3">11 Νοέμβριος 2026</p>
          
          <div className="space-y-3">
            {mockLesson?.records?.map((record) => (
              <div
                key={record?.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{record?.lesson}</h4>
                  </div>
                  <div className="text-2xl font-bold text-teal-600">+{record?.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailsPage;
