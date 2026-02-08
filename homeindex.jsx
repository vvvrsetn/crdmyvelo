import React, { useState, useEffect } from 'react';
import BottomTabNavigation from '../../components/navigation/BottomTabNavigation';
import StatsChart from '../../components/charts/StatsChart';
import Icon from '../../components/AppIcon';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('lessons');
  const [selectedSemesters, setSelectedSemesters] = useState(['1', '2', '3', '4']);
  const [lessonsBySemester, setLessonsBySemester] = useState({});
  const [absencesBySemester, setAbsencesBySemester] = useState({});
  const [worksBySemester, setWorksBySemester] = useState({});
  const [examsBySemester, setExamsBySemester] = useState({});
  const [newsList, setNewsList] = useState([]);
  const [showAddWorkModal, setShowAddWorkModal] = useState(false);
  const [showEditWorkModal, setShowEditWorkModal] = useState(false);
  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const [showEditExamModal, setShowEditExamModal] = useState(false);
  const [workForm, setWorkForm] = useState({ title: '', lesson: '', dueDate: '', description: '', semester: '1' });
  const [editingWork, setEditingWork] = useState(null);
  const [examForm, setExamForm] = useState({ lesson: '', date: '', time: '', semester: '1' });
  const [editingExam, setEditingExam] = useState(null);
  const [activeSemester, setActiveSemester] = useState('1');

  useEffect(() => {
    const savedLessons = localStorage.getItem('lessonsBySemester');
    const savedAbsences = localStorage.getItem('absencesBySemester');
    const savedWorks = localStorage.getItem('worksBySemester');
    const savedExams = localStorage.getItem('examsBySemester');
    const savedNews = localStorage.getItem('newsList');
    const savedActiveSemester = localStorage.getItem('activeSemester');
    const savedSelectedSemesters = localStorage.getItem('selectedSemesters');

    if (savedLessons) setLessonsBySemester(JSON.parse(savedLessons));
    if (savedAbsences) setAbsencesBySemester(JSON.parse(savedAbsences));
    if (savedWorks) {
      setWorksBySemester(JSON.parse(savedWorks));
    } else {
      setWorksBySemester({ '1': [], '2': [], '3': [], '4': [] });
    }
    if (savedExams) {
      setExamsBySemester(JSON.parse(savedExams));
    } else {
      setExamsBySemester({ '1': [], '2': [], '3': [], '4': [] });
    }
    if (savedNews) setNewsList(JSON.parse(savedNews));
    if (savedActiveSemester) setActiveSemester(savedActiveSemester);
    if (savedSelectedSemesters) setSelectedSemesters(JSON.parse(savedSelectedSemesters));
  }, []);

  useEffect(() => {
    localStorage.setItem('worksBySemester', JSON.stringify(worksBySemester));
  }, [worksBySemester]);

  useEffect(() => {
    localStorage.setItem('examsBySemester', JSON.stringify(examsBySemester));
  }, [examsBySemester]);

  const handleAddWork = () => {
    if (workForm?.title && workForm?.lesson && workForm?.dueDate) {
      const newWork = {
        id: Date.now(),
        title: workForm?.title,
        lesson: workForm?.lesson,
        dueDate: workForm?.dueDate,
        description: workForm?.description,
        semester: activeSemester,
        status: 'pending',
        submissionDate: null,
        score: null
      };
      setWorksBySemester(prev => ({
        ...prev,
        [activeSemester]: [...(prev?.[activeSemester] || []), newWork]
      }));
      setWorkForm({ title: '', lesson: '', dueDate: '', description: '', semester: activeSemester });
      setShowAddWorkModal(false);
    }
  };

  const handleEditWork = (work) => {
    setEditingWork(work);
    setWorkForm({
      title: work?.title,
      lesson: work?.lesson,
      dueDate: work?.dueDate,
      description: work?.description || '',
      submissionDate: work?.submissionDate || '',
      score: work?.score || '',
      status: work?.status
    });
    setShowEditWorkModal(true);
  };

  const handleUpdateWork = () => {
    if (workForm?.title && workForm?.lesson && workForm?.dueDate) {
      setWorksBySemester(prev => ({
        ...prev,
        [editingWork?.semester]: (prev?.[editingWork?.semester] || [])?.map(w =>
          w?.id === editingWork?.id
            ? {
                ...w,
                title: workForm?.title,
                lesson: workForm?.lesson,
                dueDate: workForm?.dueDate,
                description: workForm?.description,
                submissionDate: workForm?.submissionDate,
                score: workForm?.score ? parseFloat(workForm?.score) : null,
                status: workForm?.status
              }
            : w
        )
      }));
      setEditingWork(null);
      setWorkForm({ title: '', lesson: '', dueDate: '', description: '', semester: activeSemester });
      setShowEditWorkModal(false);
    }
  };

  const handleDeleteWork = (workId, semester) => {
    setWorksBySemester(prev => ({
      ...prev,
      [semester]: (prev?.[semester] || [])?.filter(w => w?.id !== workId)
    }));
    setShowEditWorkModal(false);
    setEditingWork(null);
  };

  const handleAddExam = () => {
    if (examForm?.lesson && examForm?.date && examForm?.time) {
      const newExam = {
        id: Date.now(),
        lesson: examForm?.lesson,
        date: examForm?.date,
        time: examForm?.time,
        semester: activeSemester,
        score: null,
        maxScore: 100
      };
      setExamsBySemester(prev => ({
        ...prev,
        [activeSemester]: [...(prev?.[activeSemester] || []), newExam]
      }));
      setExamForm({ lesson: '', date: '', time: '', semester: activeSemester });
      setShowAddExamModal(false);
    }
  };

  const handleEditExam = (exam) => {
    setEditingExam(exam);
    setExamForm({
      lesson: exam?.lesson,
      date: exam?.date,
      time: exam?.time,
      score: exam?.score || '',
      maxScore: exam?.maxScore || 100
    });
    setShowEditExamModal(true);
  };

  const handleUpdateExam = () => {
    if (examForm?.lesson && examForm?.date && examForm?.time) {
      setExamsBySemester(prev => ({
        ...prev,
        [editingExam?.semester]: (prev?.[editingExam?.semester] || [])?.map(e =>
          e?.id === editingExam?.id
            ? {
                ...e,
                lesson: examForm?.lesson,
                date: examForm?.date,
                time: examForm?.time,
                score: examForm?.score ? parseFloat(examForm?.score) : null,
                maxScore: examForm?.maxScore ? parseFloat(examForm?.maxScore) : 100
              }
            : e
        )
      }));
      setEditingExam(null);
      setExamForm({ lesson: '', date: '', time: '', semester: activeSemester });
      setShowEditExamModal(false);
    }
  };

  const handleDeleteExam = (examId, semester) => {
    setExamsBySemester(prev => ({
      ...prev,
      [semester]: (prev?.[semester] || [])?.filter(e => e?.id !== examId)
    }));
    setShowEditExamModal(false);
    setEditingExam(null);
  };

  const getActiveSemesterLessons = () => {
    return lessonsBySemester?.[activeSemester] || [];
  };

  const getAllSelectedLessons = () => {
    const allLessons = [];
    selectedSemesters?.forEach(sem => {
      const lessons = lessonsBySemester?.[sem] || [];
      lessons?.forEach(lesson => {
        allLessons?.push({ ...lesson, semester: sem });
      });
    });
    return allLessons;
  };

  const getAllSelectedWorks = () => {
    const allWorks = [];
    selectedSemesters?.forEach(sem => {
      const works = worksBySemester?.[sem] || [];
      works?.forEach(work => {
        allWorks?.push({ ...work, semester: sem });
      });
    });
    return allWorks;
  };

  const getAllSelectedExams = () => {
    const allExams = [];
    selectedSemesters?.forEach(sem => {
      const exams = examsBySemester?.[sem] || [];
      exams?.forEach(exam => {
        allExams?.push({ ...exam, semester: sem });
      });
    });
    return allExams;
  };

  const getLessonAbsences = (lessonId, semester) => {
    const absences = absencesBySemester?.[semester] || [];
    return absences?.filter(a => a?.lessonId === lessonId)?.reduce((sum, a) => sum + (a?.absences || 0), 0);
  };

  const tabs = [
    { id: 'lessons', label: 'Μαθήματα' },
    { id: 'works', label: 'Εργασίες' },
    { id: 'exams', label: 'Εξετάσεις' },
    { id: 'stats', label: 'Στατιστικά' },
    { id: 'beready', label: 'Be ready' },
    { id: 'news', label: 'Νέα' }
  ];

  const renderLessonsBySemester = () => {
    return selectedSemesters?.map(sem => {
      const lessons = lessonsBySemester?.[sem] || [];
      if (lessons?.length === 0) return null;

      return (
        <div key={sem} className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-8 bg-teal-500 rounded"></div>
            <h3 className="text-base font-bold text-gray-900">{sem}ο Εξάμηνο</h3>
          </div>
          <div className="space-y-2">
            {lessons?.map((lesson) => {
              const absences = getLessonAbsences(lesson?.id, sem);
              return (
                <div
                  key={lesson?.id}
                  className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                      <span className="text-lg font-bold text-gray-700">{absences}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 truncate">{lesson?.name}</h3>
                      <div className="text-xs text-gray-500">{lesson?.lessonNumber}</div>
                      <div className="text-xs text-gray-400">Διαθέσιμο: {lesson?.absenceLimit}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-teal-500 pb-20">
      <BottomTabNavigation />
      
      <div className="bg-teal-500 text-white px-4 pt-6 pb-4">
        <div className="text-sm font-medium">myKatartisi</div>
        <div className="text-xs opacity-90">Ενεργό Εξάμηνο: {activeSemester}</div>
      </div>

      <div className="bg-white rounded-t-3xl min-h-screen">
        <div className="flex overflow-x-auto border-b border-gray-200">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'text-teal-500 border-b-2 border-teal-500' :'text-gray-500'
              }`}
            >
              {tab?.label}
            </button>
          ))}
        </div>

        <div className="px-4 py-6">
          {activeTab === 'lessons' && (
            <div>
              {renderLessonsBySemester()}
              {getAllSelectedLessons()?.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Icon name="BookOpen" size={48} color="#d1d5db" className="mx-auto mb-2" />
                  <p className="text-sm">Δεν υπάρχουν μαθήματα</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'works' && (
            <div className="space-y-3">
              <button
                onClick={() => setShowAddWorkModal(true)}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Plus" size={20} color="#ffffff" />
                Προσθήκη Εργασίας
              </button>

              {getAllSelectedWorks()?.length > 0 ? (
                getAllSelectedWorks()?.map((work) => (
                  <div key={work?.id} className="bg-white border border-gray-200 rounded-lg p-3" onClick={() => handleEditWork(work)}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm text-gray-900">{work?.title}</h3>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Εξ. {work?.semester}</span>
                        </div>
                        <p className="text-xs text-gray-500">{work?.lesson}</p>
                        <p className="text-xs text-gray-500">Προθεσμία: {work?.dueDate}</p>
                        {work?.score !== null && (
                          <p className="text-xs text-teal-600 font-medium">Βαθμός: {work?.score}</p>
                        )}
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        work?.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {work?.status === 'completed' ? 'Ολοκληρώθηκε' : 'Εκκρεμεί'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Icon name="FileText" size={48} color="#d1d5db" className="mx-auto mb-4" />
                  <p className="text-gray-500">Δεν υπάρχουν εργασίες</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'exams' && (
            <div className="space-y-3">
              <button
                onClick={() => setShowAddExamModal(true)}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Plus" size={20} color="#ffffff" />
                Προσθήκη Εξέτασης
              </button>

              {getAllSelectedExams()?.length > 0 ? (
                getAllSelectedExams()?.map((exam) => (
                  <div key={exam?.id} className="bg-white border border-gray-200 rounded-lg p-3" onClick={() => handleEditExam(exam)}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm text-gray-900">{exam?.lesson}</h3>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Εξ. {exam?.semester}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Icon name="Calendar" size={14} color="#6b7280" />
                            {exam?.date}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Icon name="Clock" size={14} color="#6b7280" />
                            {exam?.time}
                          </div>
                        </div>
                        {exam?.score !== null && (
                          <p className="text-xs text-teal-600 font-medium mt-1">Βαθμός: {exam?.score}/{exam?.maxScore}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Icon name="Calendar" size={48} color="#d1d5db" className="mx-auto mb-4" />
                  <p className="text-gray-500">Δεν υπάρχουν εξετάσεις</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <StatsChart />
          )}

          {activeTab === 'beready' && (
            <div className="text-center py-12">
              <Icon name="CheckCircle" size={48} color="#d1d5db" className="mx-auto mb-4" />
              <p className="text-gray-500">Δεν υπάρχουν στοιχεία</p>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-3">
              {newsList?.length > 0 ? (
                newsList?.map((news) => (
                  <div key={news?.id} className="bg-white border border-gray-200 rounded-lg p-3">
                    <h3 className="font-semibold text-sm text-gray-900">{news?.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{news?.date}</p>
                    <p className="text-xs text-gray-700 mt-2">{news?.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Icon name="Newspaper" size={48} color="#d1d5db" className="mx-auto mb-4" />
                  <p className="text-gray-500">Δεν υπάρχουν νέα</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showAddWorkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Προσθήκη Εργασίας</h2>
              <button onClick={() => { setShowAddWorkModal(false); setWorkForm({ title: '', lesson: '', dueDate: '', description: '', semester: activeSemester }); }}>
                <Icon name="X" size={24} color="#374151" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Τίτλος</label>
                <input
                  type="text"
                  placeholder="π.χ. Εργασία Μαθηματικών"
                  value={workForm?.title}
                  onChange={(e) => setWorkForm({ ...workForm, title: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Μάθημα</label>
                <select
                  value={workForm?.lesson}
                  onChange={(e) => setWorkForm({ ...workForm, lesson: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Επιλέξτε μάθημα</option>
                  {getActiveSemesterLessons()?.map(lesson => (
                    <option key={lesson?.id} value={lesson?.name}>{lesson?.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Προθεσμία Υποβολής</label>
                <input
                  type="date"
                  value={workForm?.dueDate}
                  onChange={(e) => setWorkForm({ ...workForm, dueDate: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Περιγραφή</label>
                <textarea
                  placeholder="Περιγραφή εργασίας..."
                  value={workForm?.description}
                  onChange={(e) => setWorkForm({ ...workForm, description: e?.target?.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button 
                onClick={handleAddWork}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
              >
                Προσθήκη
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditWorkModal && editingWork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Επεξεργασία Εργασίας</h2>
              <button onClick={() => { setShowEditWorkModal(false); setEditingWork(null); setWorkForm({ title: '', lesson: '', dueDate: '', description: '', semester: activeSemester }); }}>
                <Icon name="X" size={24} color="#374151" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Τίτλος</label>
                <input
                  type="text"
                  value={workForm?.title}
                  onChange={(e) => setWorkForm({ ...workForm, title: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Μάθημα</label>
                <input
                  type="text"
                  value={workForm?.lesson}
                  onChange={(e) => setWorkForm({ ...workForm, lesson: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Προθεσμία Υποβολής</label>
                <input
                  type="date"
                  value={workForm?.dueDate}
                  onChange={(e) => setWorkForm({ ...workForm, dueDate: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ημερομηνία Υποβολής</label>
                <input
                  type="date"
                  value={workForm?.submissionDate}
                  onChange={(e) => setWorkForm({ ...workForm, submissionDate: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Βαθμός</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="π.χ. 8.5"
                  value={workForm?.score}
                  onChange={(e) => setWorkForm({ ...workForm, score: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Κατάσταση</label>
                <select
                  value={workForm?.status}
                  onChange={(e) => setWorkForm({ ...workForm, status: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="pending">Εκκρεμεί</option>
                  <option value="completed">Ολοκληρώθηκε</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleUpdateWork}
                  className="flex-1 bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
                >
                  Αποθήκευση
                </button>
                <button 
                  onClick={() => handleDeleteWork(editingWork?.id, editingWork?.semester)}
                  className="px-6 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  Διαγραφή
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddExamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Προσθήκη Εξέτασης</h2>
              <button onClick={() => { setShowAddExamModal(false); setExamForm({ lesson: '', date: '', time: '', semester: activeSemester }); }}>
                <Icon name="X" size={24} color="#374151" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Μάθημα</label>
                <select
                  value={examForm?.lesson}
                  onChange={(e) => setExamForm({ ...examForm, lesson: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Επιλέξτε μάθημα</option>
                  {getActiveSemesterLessons()?.map(lesson => (
                    <option key={lesson?.id} value={lesson?.name}>{lesson?.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ημερομηνία</label>
                <input
                  type="date"
                  value={examForm?.date}
                  onChange={(e) => setExamForm({ ...examForm, date: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ώρα</label>
                <input
                  type="time"
                  value={examForm?.time}
                  onChange={(e) => setExamForm({ ...examForm, time: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button 
                onClick={handleAddExam}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
              >
                Προσθήκη
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditExamModal && editingExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Επεξεργασία Εξέτασης</h2>
              <button onClick={() => { setShowEditExamModal(false); setEditingExam(null); setExamForm({ lesson: '', date: '', time: '', semester: activeSemester }); }}>
                <Icon name="X" size={24} color="#374151" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Μάθημα</label>
                <input
                  type="text"
                  value={examForm?.lesson}
                  onChange={(e) => setExamForm({ ...examForm, lesson: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ημερομηνία</label>
                <input
                  type="date"
                  value={examForm?.date}
                  onChange={(e) => setExamForm({ ...examForm, date: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ώρα</label>
                <input
                  type="time"
                  value={examForm?.time}
                  onChange={(e) => setExamForm({ ...examForm, time: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Βαθμός</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="π.χ. 8.5"
                  value={examForm?.score}
                  onChange={(e) => setExamForm({ ...examForm, score: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Μέγιστος Βαθμός</label>
                <input
                  type="number"
                  placeholder="π.χ. 100"
                  value={examForm?.maxScore}
                  onChange={(e) => setExamForm({ ...examForm, maxScore: e?.target?.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleUpdateExam}
                  className="flex-1 bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
                >
                  Αποθήκευση
                </button>
                <button 
                  onClick={() => handleDeleteExam(editingExam?.id, editingExam?.semester)}
                  className="px-6 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  Διαγραφή
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
