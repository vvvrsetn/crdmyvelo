import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/navigation/BottomTabNavigation';
import Icon from '../../components/AppIcon';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeSemester, setActiveSemester] = useState('1');
  const [selectedSemesters, setSelectedSemesters] = useState(['1']);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showEditLessonModal, setShowEditLessonModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showSemesterSelectModal, setShowSemesterSelectModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [lessonForm, setLessonForm] = useState({ name: '', absenceLimit: '', lessonNumber: '' });
  const [profileForm, setProfileForm] = useState({ saekName: 'ΣΑΕΚ Δάφνης-Υμηττού', firstName: 'ΒΑΓΓΕΛΗΣ', lastName: 'ΚΑΡΑΠΑΝΟΥ' });
  const [newsForm, setNewsForm] = useState({ title: '', content: '', date: '' });
  const [newsList, setNewsList] = useState([]);

  const semesters = [
    { value: '1', label: 'Εξάμηνο 1' },
    { value: '2', label: 'Εξάμηνο 2' },
    { value: '3', label: 'Εξάμηνο 3' },
    { value: '4', label: 'Εξάμηνο 4' }
  ];

  // Semester-specific lessons storage
  const [lessonsBySemester, setLessonsBySemester] = useState({
    '1': [],
    '2': [],
    '3': [],
    '4': []
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedLessons = localStorage.getItem('lessonsBySemester');
    const savedProfile = localStorage.getItem('profileData');
    const savedActiveSemester = localStorage.getItem('activeSemester');
    const savedSelectedSemesters = localStorage.getItem('selectedSemesters');
    const savedNews = localStorage.getItem('newsList');

    if (savedLessons) {
      setLessonsBySemester(JSON.parse(savedLessons));
    } else {
      // Initialize with default data for semester 3
      const defaultLessons = {
        '1': [],
        '2': [],
        '3': [
          { id: 537, name: 'ΑΡΧΕΣ ΔΙΑΦΗΜΙΣΗΣ', absenceLimit: 6, lessonNumber: '537' },
          { id: 538, name: 'ΒΑΣΙΚΕΣ ΕΦΑΡΜΟΓΕΣ ΠΛΗΡΟΦΟΡΙΚΗΣ', absenceLimit: 9, lessonNumber: '538' },
          { id: 539, name: 'ΔΙΑΧΕΙΡΗΣΗ ΜΕΣΩΝ ΚΟΙΝΩΝΙΚΗΣ ΔΙΚΤΥΩΣΗΣ', absenceLimit: 9, lessonNumber: '539' }
        ],
        '4': []
      };
      setLessonsBySemester(defaultLessons);
      localStorage.setItem('lessonsBySemester', JSON.stringify(defaultLessons));
    }

    if (savedProfile) {
      setProfileForm(JSON.parse(savedProfile));
    }

    if (savedActiveSemester) {
      setActiveSemester(savedActiveSemester);
    } else {
      setActiveSemester('3');
      localStorage.setItem('activeSemester', '3');
    }

    if (savedSelectedSemesters) {
      setSelectedSemesters(JSON.parse(savedSelectedSemesters));
    } else {
      setSelectedSemesters(['3']);
      localStorage.setItem('selectedSemesters', JSON.stringify(['3']));
    }

    if (savedNews) {
      setNewsList(JSON.parse(savedNews));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('lessonsBySemester', JSON.stringify(lessonsBySemester));
  }, [lessonsBySemester]);

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileForm));
  }, [profileForm]);

  useEffect(() => {
    localStorage.setItem('activeSemester', activeSemester);
  }, [activeSemester]);

  useEffect(() => {
    localStorage.setItem('selectedSemesters', JSON.stringify(selectedSemesters));
  }, [selectedSemesters]);

  useEffect(() => {
    localStorage.setItem('newsList', JSON.stringify(newsList));
  }, [newsList]);

  const handleAddLesson = () => {
    if (lessonForm?.name && lessonForm?.absenceLimit && lessonForm?.lessonNumber) {
      const newLesson = {
        id: Date.now(),
        name: lessonForm?.name,
        absenceLimit: parseInt(lessonForm?.absenceLimit),
        lessonNumber: lessonForm?.lessonNumber
      };
      setLessonsBySemester(prev => ({
        ...prev,
        [activeSemester]: [...(prev?.[activeSemester] || []), newLesson]
      }));
      setLessonForm({ name: '', absenceLimit: '', lessonNumber: '' });
      setShowLessonModal(false);
    }
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setLessonForm({ name: lesson?.name, absenceLimit: lesson?.absenceLimit?.toString(), lessonNumber: lesson?.lessonNumber });
    setShowEditLessonModal(true);
  };

  const handleUpdateLesson = () => {
    if (lessonForm?.name && lessonForm?.absenceLimit && lessonForm?.lessonNumber) {
      setLessonsBySemester(prev => ({
        ...prev,
        [activeSemester]: (prev?.[activeSemester] || [])?.map(l => 
          l?.id === editingLesson?.id 
            ? { ...l, name: lessonForm?.name, absenceLimit: parseInt(lessonForm?.absenceLimit), lessonNumber: lessonForm?.lessonNumber }
            : l
        )
      }));
      setLessonForm({ name: '', absenceLimit: '', lessonNumber: '' });
      setEditingLesson(null);
      setShowEditLessonModal(false);
    }
  };

  const handleDeleteLesson = (lessonId) => {
    setLessonsBySemester(prev => ({
      ...prev,
      [activeSemester]: (prev?.[activeSemester] || [])?.filter(l => l?.id !== lessonId)
    }));
  };

  const handleSaveProfile = () => {
    setShowEditProfileModal(false);
  };

  const handleAddNews = () => {
    if (newsForm?.title && newsForm?.content && newsForm?.date) {
      const newNews = {
        id: Date.now(),
        title: newsForm?.title,
        content: newsForm?.content,
        date: newsForm?.date
      };
      setNewsList([...newsList, newNews]);
      setNewsForm({ title: '', content: '', date: '' });
      setShowNewsModal(false);
    }
  };

  const toggleSemesterSelection = (semesterValue) => {
    setSelectedSemesters(prev => {
      if (prev?.includes(semesterValue)) {
        return prev?.filter(s => s !== semesterValue);
      } else {
        return [...prev, semesterValue];
      }
    });
  };

  const currentLessons = lessonsBySemester?.[activeSemester] || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <BottomTabNavigation />
      <div className="bg-teal-500 text-white px-4 py-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <Icon name="User" size={32} color="#14b8a6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{profileForm?.firstName} {profileForm?.lastName}</h1>
            <p className="text-sm opacity-90">{profileForm?.saekName}</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-6 space-y-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ρυθμίσεις</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ενεργό Εξάμηνο
              </label>
              <select
                value={activeSemester}
                onChange={(e) => setActiveSemester(e?.target?.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {semesters?.map((semester) => (
                  <option key={semester?.value} value={semester?.value}>
                    {semester?.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Το εξάμηνο που εργάζεστε αυτή τη στιγμή</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Προβολή Εξαμήνων
              </label>
              <button
                onClick={() => setShowSemesterSelectModal(true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-left flex items-center justify-between"
              >
                <span className="text-gray-700">
                  {selectedSemesters?.length === 0 ? 'Επιλέξτε εξάμηνα' : 
                   selectedSemesters?.length === 1 ? `Εξάμηνο ${selectedSemesters?.[0]}` :
                   `${selectedSemesters?.length} εξάμηνα επιλεγμένα`}
                </span>
                <Icon name="ChevronDown" size={20} color="#6b7280" />
              </button>
              <p className="text-xs text-gray-500 mt-1">Επιλέξτε εξάμηνα για προβολή και σύγκριση</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Μαθήματα Εξαμήνου {activeSemester}</h2>
            <button
              onClick={() => setShowLessonModal(true)}
              className="text-teal-500 font-medium text-sm flex items-center gap-1"
            >
              <Icon name="Plus" size={18} color="#14b8a6" />
              Προσθήκη
            </button>
          </div>

          <div className="space-y-3">
            {currentLessons?.length > 0 ? (
              currentLessons?.map((lesson) => (
                <div
                  key={lesson?.id}
                  className="border border-gray-200 rounded-xl p-3 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{lesson?.name}</h3>
                    <p className="text-xs text-gray-500">Αριθμός: {lesson?.lessonNumber}</p>
                    <p className="text-xs text-gray-500">Όριο απουσιών: {lesson?.absenceLimit}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditLesson(lesson)} className="text-teal-500 p-2">
                      <Icon name="Edit" size={18} color="#14b8a6" />
                    </button>
                    <button onClick={() => handleDeleteLesson(lesson?.id)} className="text-red-500 p-2">
                      <Icon name="Trash2" size={18} color="#ef4444" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Icon name="BookOpen" size={48} color="#d1d5db" className="mx-auto mb-2" />
                <p className="text-sm">Δεν υπάρχουν μαθήματα για αυτό το εξάμηνο</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Λογαριασμός</h2>
          
          <div className="space-y-3">
            <button 
              onClick={() => setShowEditProfileModal(true)}
              className="w-full flex items-center justify-between py-3 border-b border-gray-100"
            >
              <span className="text-gray-700">Επεξεργασία προφίλ</span>
              <Icon name="ChevronRight" size={20} color="#9ca3af" />
            </button>
            <button className="w-full flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-700">Αλλαγή κωδικού</span>
              <Icon name="ChevronRight" size={20} color="#9ca3af" />
            </button>
            <button className="w-full flex items-center justify-between py-3">
              <span className="text-red-500">Αποσύνδεση</span>
              <Icon name="LogOut" size={20} color="#ef4444" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ρυθμίσεις Προγραμματιστή</h2>
          
          <div className="space-y-3">
            <button 
              onClick={() => setShowNewsModal(true)}
              className="w-full flex items-center justify-between py-3 border-b border-gray-100"
            >
              <span className="text-gray-700">Διαχείριση Νέων</span>
              <Icon name="ChevronRight" size={20} color="#9ca3af" />
            </button>
          </div>
        </div>
      </div>
      {showSemesterSelectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Επιλογή Εξαμήνων</h2>
              <button onClick={() => setShowSemesterSelectModal(false)}>
                <Icon name="X" size={24} color="#374151" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-3">
              {semesters?.map((semester) => (
                <button
                  key={semester?.value}
                  onClick={() => toggleSemesterSelection(semester?.value)}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{semester?.label}</span>
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                    selectedSemesters?.includes(semester?.value) 
                      ? 'bg-teal-500 border-teal-500' :'border-gray-300'
                  }`}>
                    {selectedSemesters?.includes(semester?.value) && (
                      <Icon name="Check" size={16} color="#ffffff" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="px-4 pb-6">
              <button
                onClick={() => setShowSemesterSelectModal(false)}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
              >
                Επιβεβαίωση
              </button>
            </div>
          </div>
        </div>
      )}
      {showLessonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Προσθήκη Μαθήματος</h2>
              <button onClick={() => { setShowLessonModal(false); setLessonForm({ name: '', absenceLimit: '', lessonNumber: '' }); }}>
                <Icon name="X" size={24} color="#374151" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Όνομα Μαθήματος
                </label>
                <input
                  type="text"
                  placeholder="π.χ. Μαθηματικά Ι"
                  value={lessonForm?.name}
                  onChange={(e) => setLessonForm({ ...lessonForm, name: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Αριθμός Μαθήματος
                </label>
                <input
                  type="text"
                  placeholder="π.χ. 537"
                  value={lessonForm?.lessonNumber}
                  onChange={(e) => setLessonForm({ ...lessonForm, lessonNumber: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Όριο Απουσιών
                </label>
                <input
                  type="number"
                  placeholder="π.χ. 9"
                  value={lessonForm?.absenceLimit}
                  onChange={(e) => setLessonForm({ ...lessonForm, absenceLimit: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button 
                onClick={handleAddLesson}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
              >
                Προσθήκη Μαθήματος
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditLessonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Επεξεργασία Μαθήματος</h2>
              <button onClick={() => { setShowEditLessonModal(false); setEditingLesson(null); setLessonForm({ name: '', absenceLimit: '', lessonNumber: '' }); }}>
                <Icon name="X" size={24} color="#374151" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Όνομα Μαθήματος
                </label>
                <input
                  type="text"
                  placeholder="π.χ. Μαθηματικά Ι"
                  value={lessonForm?.name}
                  onChange={(e) => setLessonForm({ ...lessonForm, name: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Αριθμός Μαθήματος
                </label>
                <input
                  type="text"
                  placeholder="π.χ. 537"
                  value={lessonForm?.lessonNumber}
                  onChange={(e) => setLessonForm({ ...lessonForm, lessonNumber: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Όριο Απουσιών
                </label>
                <input
                  type="number"
                  placeholder="π.χ. 9"
                  value={lessonForm?.absenceLimit}
                  onChange={(e) => setLessonForm({ ...lessonForm, absenceLimit: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button 
                onClick={handleUpdateLesson}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
              >
                Αποθήκευση Αλλαγών
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Επεξεργασία Προφίλ</h2>
              <button onClick={() => setShowEditProfileModal(false)}>
                <Icon name="X" size={24} color="#374151" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Όνομα ΣΑΕΚ
                </label>
                <input
                  type="text"
                  value={profileForm?.saekName}
                  onChange={(e) => setProfileForm({ ...profileForm, saekName: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Όνομα
                </label>
                <input
                  type="text"
                  value={profileForm?.firstName}
                  onChange={(e) => setProfileForm({ ...profileForm, firstName: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Επώνυμο
                </label>
                <input
                  type="text"
                  value={profileForm?.lastName}
                  onChange={(e) => setProfileForm({ ...profileForm, lastName: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button 
                onClick={handleSaveProfile}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
              >
                Αποθήκευση
              </button>
            </div>
          </div>
        </div>
      )}
      {showNewsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Προσθήκη Νέου</h2>
              <button onClick={() => { setShowNewsModal(false); setNewsForm({ title: '', content: '', date: '' }); }}>
                <Icon name="X" size={24} color="#374151" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Τίτλος
                </label>
                <input
                  type="text"
                  placeholder="π.χ. Νέο πρόγραμμα μαθημάτων"
                  value={newsForm?.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ημερομηνία
                </label>
                <input
                  type="text"
                  placeholder="π.χ. 10 Δεκ 2026"
                  value={newsForm?.date}
                  onChange={(e) => setNewsForm({ ...newsForm, date: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Περιεχόμενο
                </label>
                <textarea
                  placeholder="Περιγραφή του νέου..."
                  value={newsForm?.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e?.target?.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button 
                onClick={handleAddNews}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
              >
                Προσθήκη Νέου
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
