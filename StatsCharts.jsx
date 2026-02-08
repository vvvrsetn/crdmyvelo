import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../AppIcon';

const StatsChart = () => {
  const [selectedSemesters, setSelectedSemesters] = useState(['1', '2', '3', '4']);
  const [selectedMetric, setSelectedMetric] = useState('absences');
  const [chartType, setChartType] = useState('line');
  const [showSettings, setShowSettings] = useState(false);
  const [lessonsBySemester, setLessonsBySemester] = useState({});
  const [absencesBySemester, setAbsencesBySemester] = useState({});
  const [worksBySemester, setWorksBySemester] = useState({});
  const [examsBySemester, setExamsBySemester] = useState({});

  useEffect(() => {
    const savedLessons = localStorage.getItem('lessonsBySemester');
    const savedAbsences = localStorage.getItem('absencesBySemester');
    const savedWorks = localStorage.getItem('worksBySemester');
    const savedExams = localStorage.getItem('examsBySemester');

    if (savedLessons) setLessonsBySemester(JSON.parse(savedLessons));
    if (savedAbsences) setAbsencesBySemester(JSON.parse(savedAbsences));
    if (savedWorks) setWorksBySemester(JSON.parse(savedWorks));
    if (savedExams) setExamsBySemester(JSON.parse(savedExams));
  }, []);

  const COLORS = ['#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const getChartData = () => {
    if (selectedMetric === 'absences') {
      return selectedSemesters?.map((sem, idx) => {
        const absences = absencesBySemester?.[sem] || [];
        const totalAbsences = absences?.reduce((sum, record) => sum + (record?.absences || 0), 0);
        return {
          name: `Εξ. ${sem}`,
          value: totalAbsences,
          fill: COLORS?.[idx % COLORS?.length]
        };
      });
    } else if (selectedMetric === 'works') {
      return selectedSemesters?.map((sem, idx) => {
        const works = worksBySemester?.[sem] || [];
        const avgScore = works?.length > 0 
          ? works?.reduce((sum, w) => sum + (w?.score || 0), 0) / works?.length 
          : 0;
        return {
          name: `Εξ. ${sem}`,
          value: parseFloat(avgScore?.toFixed(2)),
          fill: COLORS?.[idx % COLORS?.length]
        };
      });
    } else if (selectedMetric === 'exams') {
      return selectedSemesters?.map((sem, idx) => {
        const exams = examsBySemester?.[sem] || [];
        const avgScore = exams?.length > 0 
          ? exams?.reduce((sum, e) => sum + (e?.score || 0), 0) / exams?.length 
          : 0;
        return {
          name: `Εξ. ${sem}`,
          value: parseFloat(avgScore?.toFixed(2)),
          fill: COLORS?.[idx % COLORS?.length]
        };
      });
    }
    return [];
  };

  const chartData = getChartData();

  const toggleSemester = (sem) => {
    setSelectedSemesters(prev => 
      prev?.includes(sem) ? prev?.filter(s => s !== sem) : [...prev, sem]
    );
  };

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={3} dot={{ fill: '#14b8a6', r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#14b8a6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry?.name}: ${entry?.value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  const getMetricLabel = () => {
    if (selectedMetric === 'absences') return 'Απουσίες';
    if (selectedMetric === 'works') return 'Μέσος Όρος Εργασιών';
    if (selectedMetric === 'exams') return 'Μέσος Όρος Εξετάσεων';
    return '';
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">{getMetricLabel()}</h3>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon name="Settings" size={20} color="#6b7280" />
          </button>
        </div>

        {showSettings && (
          <div className="mb-4 p-4 bg-gray-50 rounded-xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Μετρική</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMetric('absences')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMetric === 'absences' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  Απουσίες
                </button>
                <button
                  onClick={() => setSelectedMetric('works')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMetric === 'works' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  Εργασίες
                </button>
                <button
                  onClick={() => setSelectedMetric('exams')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMetric === 'exams' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  Εξετάσεις
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Τύπος Γραφήματος</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartType('line')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    chartType === 'line' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  Γραμμή
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    chartType === 'bar' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  Ράβδοι
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    chartType === 'pie' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  Πίτα
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Εξάμηνα</label>
              <div className="flex gap-2">
                {['1', '2', '3', '4']?.map((sem) => (
                  <button
                    key={sem}
                    onClick={() => toggleSemester(sem)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedSemesters?.includes(sem) ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                  >
                    Εξ. {sem}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {chartData?.length > 0 ? (
          renderChart()
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Icon name="BarChart3" size={48} color="#d1d5db" className="mx-auto mb-2" />
            <p className="text-sm">Δεν υπάρχουν δεδομένα</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsChart;
