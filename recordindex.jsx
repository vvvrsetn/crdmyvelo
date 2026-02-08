import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/navigation/BottomTabNavigation';
import Icon from '../../components/AppIcon';

const RecordsPage = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addForm, setAddForm] = useState({ lessonId: '', lesson: '', date: '', absences: '', reason: '', semester: '1' });
  const [editForm, setEditForm] = useState({ lessonId: '', lesson: '', date: '', absences: '', reason: '' });
  const [absencesBySemester, setAbsencesBySemester] = useState({});
  const [lessonsBySemester, setLessonsBySemester] = useState({});
  const [activeSemester, setActiveSemester] = useState('1');

  useEffect(() => {
    const savedAbsences = localStorage.getItem('absencesBySemester');
    const savedLessons = localStorage.getItem('lessonsBySemester');
    const savedActiveSemester = localStorage.getItem('activeSemester');

    if (savedAbsences) {
      setAbsencesBySemester(JSON.parse(savedAbsences));
    } else {
      setAbsencesBySemester({ '1': [], '2': [], '3': [], '4': [] });
    }

    if (savedLessons) {
      setLessonsBySemester(JSON.parse(savedLessons));
    }

    if (savedActiveSemester) {
      setActiveSemester(savedActiveSemester);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('absencesBySemester', JSON.stringify(absencesBySemester));
  }, [absencesBySemester]);

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
  };

  const handleAddRecord = () => {
    if (addForm?.lessonId && addForm?.lesson && addForm?.date && addForm?.absences) {
      const newRecord = {
        id: Date.now(),
        lessonId: parseInt(addForm?.lessonId),
        lesson: addForm?.lesson,
        date: addForm?.date,
        absences: parseInt(addForm?.absences),
        reason: addForm?.reason || 'Χωρίς αιτιολογία',
        semester: activeSemester
      };
      setAbsencesBySemester(prev => ({
        ...prev,
        [activeSemester]: [...(prev?.[activeSemester] || []), newRecord]
      }));
      setAddForm({ lessonId: '', lesson: '', date: '', absences: '', reason: '', semester: activeSemester });
      setShowAddModal(false);
    }
  };

  const handleEditRecord = () => {
    if (editForm?.lesson && editForm?.date && editForm?.absences) {
      setAbsencesBySemester(prev => ({
        ...prev,
        [selectedRecord?.semester]: (prev?.[selectedRecord?.semester] || [])?.map(r => 
          r?.id === selectedRecord?.id 
            ? { ...r, lesson: editForm?.lesson, date: editForm?.date, absences: parseInt(editForm?.absences), reason: editForm?.reason }
            : r
        )
      }));
      setSelectedRecord(null);
      setShowEditModal(false);
      setEditForm({ lessonId: '', lesson: '', date: '', absences: '', reason: '' });
    }
  };

  const handleDeleteRecord = (recordId, semester) => {
    setAbsencesBySemester(prev => ({
      ...prev,
      [semester]: (prev?.[semester] || [])?.filter(r => r?.id !== recordId)
    }));
    setSelectedRecord(null);
  };

  const openEditModal = (record) => {
    setEditForm({ lessonId: record?.lessonId, lesson: record?.lesson, date: record?.date, absences: record?.absences?.toString(), reason: record?.reason });
    setShowEditModal(true);
    setSelectedRecord(record);
  };

  const getAllRecords = () => {
    const allRecords = [];
    Object.keys(absencesBySemester)?.forEach(sem => {
      const records = absencesBySemester?.[sem] || [];
      records?.forEach(record => {
        allRecords?.push({ ...record, semester: sem });
      });
    });
    return allRecords?.sort((a, b) => b?.id - a?.id);
  };

  const getActiveSemesterLessons = () => {
    return lessonsBySemester?.[activeSemester] || [];
  };

  const handleLessonSelect = (e) => {
    const selectedLessonId = e?.target?.value;
    const lesson = getActiveSemesterLessons()?.find(l => l?.id?.toString() === selectedLessonId);
    if (lesson) {
      setAddForm({ ...addForm, lessonId: lesson?.id, lesson: lesson?.name });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <BottomTabNavigation />
      
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center">
        <button onClick={() => navigate('/')} className="mr-3">
          <Icon name="ChevronLeft" size={24} color="#374151" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Καταχωρήσεις</h1>
      </div>

      <div className="px-4 py-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full bg-white border-2 border-dashed border-teal-300 rounded-xl p-6 mb-6 hover:border-teal-500 transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center">
              <Icon name="Plus" size={24} color="#14b8a6" />
            </div>
            <span className="text-teal-600 font-medium">Νέα καταχώρηση</span>
          </div>
        </button>

        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Όλες οι καταχωρήσεις</h2>
        </div>

        <div className="space-y-3">
          {getAllRecords()?.length > 0 ? (
            getAllRecords()?.map((record) => (
              <div
                key={record?.id}
                onClick={() => handleViewDetails(record)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={20} color="#14b8a6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{record?.lesson}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Εξ. {record?.semester}</span>
                    </div>
                    <p className="text-sm text-gray-500">{record?.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-teal-600">+{record?.absences}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Icon name="FileText" size={48} color="#d1d5db" className="mx-auto mb-2" />
              <p className="text-sm">Δεν υπάρχουν καταχωρήσεις</p>
            </div>
          )}
        </div>
      </div>

      {selectedRecord && !showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Λεπτομέρειες καταχώρησης</h2>
              <button onClick={() => setSelectedRecord(null)}>
                <Icon name="X" size={24} color="#374151" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-4">
              <div>
                <label className="text-sm text-gray-500">Ημερομηνία Εισαγωγής</label>
                <p className="text-base font-medium text-gray-900">{selectedRecord?.date}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Εξάμηνο</label>
                <p className="text-base font-medium text-gray-900">Εξάμηνο {selectedRecord?.semester}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Νούμερο</label>
                <p className="text-base font-medium text-gray-900">{selectedRecord?.absences}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Μάθημα</label>
                <p className="text-base font-medium text-gray-900">{selectedRecord?.lesson}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Αιτιολογία</label>
                <p className="text-base font-medium text-gray-900">{selectedRecord?.reason || 'Βόλτα'}</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => openEditModal(selectedRecord)}
                  className="flex-1 bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
                >
                  Επεξεργασία καταχώρησης
                </button>
                <button 
                  onClick={() => handleDeleteRecord(selectedRecord?.id, selectedRecord?.semester)}
                  className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors"
                >
                  <Icon name="Trash2" size={20} color="#ef4444" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Επεξεργασία καταχώρησης</h2>
              <button onClick={() => { setShowEditModal(false); setEditForm({ lessonId: '', lesson: '', date: '', absences: '', reason: '' }); }}>
                <Icon name="X" size={24} color="#374151" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Μάθημα
                </label>
                <input
                  type="text"
                  value={editForm?.lesson}
                  onChange={(e) => setEditForm({ ...editForm, lesson: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ημερομηνία
                </label>
                <input
                  type="text"
                  placeholder="π.χ. Δευτέρα, 11 Νοέμβριος 2026"
                  value={editForm?.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Αριθμός Απουσιών
                </label>
                <input
                  type="number"
                  placeholder="π.χ. 3"
                  value={editForm?.absences}
                  onChange={(e) => setEditForm({ ...editForm, absences: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Αιτιολογία (προαιρετικό)
                </label>
                <input
                  type="text"
                  placeholder="π.χ. Ασθένεια"
                  value={editForm?.reason}
                  onChange={(e) => setEditForm({ ...editForm, reason: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button 
                onClick={handleEditRecord}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
              >
                Αποθήκευση Αλλαγών
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Προσθήκη Καταχώρησης</h2>
              <button onClick={() => { setShowAddModal(false); setAddForm({ lessonId: '', lesson: '', date: '', absences: '', reason: '', semester: activeSemester }); }}>
                <Icon name="X" size={24} color="#374151" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Μάθημα
                </label>
                <select
                  value={addForm?.lessonId}
                  onChange={handleLessonSelect}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Επιλέξτε μάθημα</option>
                  {getActiveSemesterLessons()?.map((lesson) => (
                    <option key={lesson?.id} value={lesson?.id}>{lesson?.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ημερομηνία
                </label>
                <input
                  type="text"
                  placeholder="π.χ. Δευτέρα, 11 Νοέμβριος 2026"
                  value={addForm?.date}
                  onChange={(e) => setAddForm({ ...addForm, date: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Αριθμός Απουσιών
                </label>
                <input
                  type="number"
                  placeholder="π.χ. 3"
                  value={addForm?.absences}
                  onChange={(e) => setAddForm({ ...addForm, absences: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Αιτιολογία (προαιρετικό)
                </label>
                <input
                  type="text"
                  placeholder="π.χ. Ασθένεια"
                  value={addForm?.reason}
                  onChange={(e) => setAddForm({ ...addForm, reason: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button 
                onClick={handleAddRecord}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
              >
                Προσθήκη Καταχώρησης
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordsPage;
