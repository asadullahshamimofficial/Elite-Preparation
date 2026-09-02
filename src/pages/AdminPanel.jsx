import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { questions as defaultFiqhQuestions } from '../data/fiqhData';
import { balaghatQuestions as defaultBalaghatQuestions } from '../data/balaghatData';
import { getAllStudents, getLoginLogs, getPageViewLogs } from '../services/firebase';
import {
  ShieldCheck,
  BookOpen,
  Users,
  PlusCircle,
  Download,
  Upload,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  Layers,
  ArrowLeft,
  LogOut,
  Save,
  X,
  FileText,
  AlertCircle,
  BarChart2,
  Clock,
  Activity,
  RefreshCw,
  Smartphone
} from 'lucide-react';

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'students' | 'analytics'
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Questions State from LocalStorage or default
  const [fiqhList, setFiqhList] = useState(() => {
    const saved = localStorage.getItem('custom_fiqh_questions');
    return saved ? JSON.parse(saved) : defaultFiqhQuestions;
  });

  const [balaghatList, setBalaghatList] = useState(() => {
    const saved = localStorage.getItem('custom_balaghat_questions');
    return saved ? JSON.parse(saved) : defaultBalaghatQuestions;
  });

  // Students list — loaded from Firestore
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  // Analytics data
  const [loginLogs, setLoginLogs] = useState([]);
  const [pageViewLogs, setPageViewLogs] = useState([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Load students when tab opens
  useEffect(() => {
    if (activeTab === 'students' && students.length === 0) {
      setStudentsLoading(true);
      getAllStudents().then(list => {
        setStudents(list);
        setStudentsLoading(false);
      });
    }
  }, [activeTab]);

  // Load analytics when tab opens
  useEffect(() => {
    if (activeTab === 'analytics') {
      loadAnalytics();
    }
  }, [activeTab]);

  const loadAnalytics = async () => {
    setAnalyticsLoading(true);
    const [logs, views] = await Promise.all([getLoginLogs(), getPageViewLogs()]);
    setLoginLogs(logs);
    setPageViewLogs(views);
    setAnalyticsLoading(false);
  };

  // Modal State for adding/editing questions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    subject: 'balaghat', // 'fiqh' | 'balaghat' | 'mantiq'
    chapterId: 'balaghat',
    questionBn: '',
    questionAr: '',
    bookRef: 'دروس البلاغة',
    definitionBn: '',
    definitionAr: '',
    meaningBn: '',
    meaningAr: '',
    example: ''
  });

  const [notification, setNotification] = useState('');

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Combine questions
  const allQuestions = [
    ...fiqhList.map(q => ({ ...q, subject: 'fiqh', subjectName: 'ফিকহ প্রথম পত্র' })),
    ...balaghatList.map(q => ({
      ...q,
      subject: q.chapterId === 'mantiq' ? 'mantiq' : 'balaghat',
      subjectName: q.chapterId === 'mantiq' ? 'মানতিক পর্ব' : 'বালাগাত পর্ব'
    }))
  ];

  const filteredQuestions = allQuestions.filter(q => {
    const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
    const matchesSearch = searchTerm.trim() === '' ||
      q.questionBn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.questionAr?.includes(searchTerm);
    return matchesSubject && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setEditingQuestion(null);
    setFormData({
      subject: 'balaghat',
      chapterId: 'balaghat',
      questionBn: '',
      questionAr: '',
      bookRef: 'دروس البلاغة',
      definitionBn: '',
      definitionAr: '',
      meaningBn: '',
      meaningAr: '',
      example: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (q) => {
    setEditingQuestion(q);
    setFormData({
      subject: q.subject,
      chapterId: q.chapterId || q.subject,
      questionBn: q.questionBn || '',
      questionAr: q.questionAr || '',
      bookRef: q.bookRef || '',
      definitionBn: q.definitionBn || (typeof q.meaning === 'object' ? q.meaning?.shari : '') || '',
      definitionAr: q.definitionAr || '',
      meaningBn: q.meaningBn || (typeof q.meaning === 'object' ? q.meaning?.linguistic : '') || '',
      meaningAr: q.meaningAr || '',
      example: q.example || ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = (q) => {
    if (!window.confirm(`আপনি কি নিশ্চিতভাবে এই প্রশ্নটি মুছে ফেলতে চান? (${q.questionBn.slice(0, 30)}...)`)) return;

    if (q.subject === 'fiqh') {
      const updated = fiqhList.filter(item => item.id !== q.id);
      setFiqhList(updated);
      localStorage.setItem('custom_fiqh_questions', JSON.stringify(updated));
    } else {
      const updated = balaghatList.filter(item => item.id !== q.id);
      setBalaghatList(updated);
      localStorage.setItem('custom_balaghat_questions', JSON.stringify(updated));
    }
    showToast('প্রশ্নটি সফলভাবে মুছে ফেলা হয়েছে');
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!formData.questionBn.trim()) {
      alert('অনুগ্রহ করে বাংলা প্রশ্নটি লিখুন');
      return;
    }

    if (formData.subject === 'fiqh') {
      if (editingQuestion) {
        const updated = fiqhList.map(item => item.id === editingQuestion.id ? { ...item, ...formData } : item);
        setFiqhList(updated);
        localStorage.setItem('custom_fiqh_questions', JSON.stringify(updated));
      } else {
        const newQ = {
          id: fiqhList.length + 1,
          chapterId: formData.chapterId || 'hajj',
          questionNum: (fiqhList.length + 1).toString(),
          ...formData
        };
        const updated = [...fiqhList, newQ];
        setFiqhList(updated);
        localStorage.setItem('custom_fiqh_questions', JSON.stringify(updated));
      }
    } else {
      if (editingQuestion) {
        const updated = balaghatList.map(item => item.id === editingQuestion.id ? { ...item, ...formData } : item);
        setBalaghatList(updated);
        localStorage.setItem('custom_balaghat_questions', JSON.stringify(updated));
      } else {
        const newQ = {
          id: balaghatList.length + 1,
          chapterId: formData.subject === 'mantiq' ? 'mantiq' : 'balaghat',
          ...formData
        };
        const updated = [...balaghatList, newQ];
        setBalaghatList(updated);
        localStorage.setItem('custom_balaghat_questions', JSON.stringify(updated));
      }
    }

    setIsModalOpen(false);
    showToast(editingQuestion ? 'প্রশ্নটি সফলভাবে আপডেট হয়েছে' : 'নতুন প্রশ্ন সফলভাবে যুক্ত হয়েছে');
  };

  const handleExportJSON = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      fiqhQuestions: fiqhList,
      balaghatQuestions: balaghatList,
      studentsList: students
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elite_preparation_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('সম্পূর্ণ ব্যাকআপ JSON সফলভাবে ডাউনলোড হয়েছে');
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans pb-16">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-500 text-black font-bold text-sm shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 size={18} />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Navbar */}
      <header className="sticky top-0 z-40 bg-[#0d1322]/95 backdrop-blur-md border-b border-amber-500/20 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-bold"
            >
              <ArrowLeft size={16} />
              <span>মূল সাইট</span>
            </Link>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <ShieldCheck size={18} />
              </span>
              <div>
                <h1 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>এডমিন কন্ট্রোল প্যানেল</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                    সুপার এডমিন
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
              <span>লগইন: <strong>{user?.name || 'এডমিন'}</strong></span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25 transition-colors"
            >
              <LogOut size={14} />
              <span>লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6">
        
        {/* Top Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#0e1424] border border-amber-500/20 shadow-lg">
            <span className="text-xs text-slate-400 font-medium">মোট প্রশ্ন</span>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {allQuestions.length} টি
            </div>
            <span className="text-[11px] text-slate-500">ফিকহ ১২ + বালাগাত-মানতিক ১৯</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e1424] border border-emerald-500/20 shadow-lg">
            <span className="text-xs text-slate-400 font-medium">নিবন্ধিত শিক্ষার্থী</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {students.length} জন
            </div>
            <span className="text-[11px] text-slate-500">মোবাইল ও জিমেইল ভেরিফাইড</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e1424] border border-cyan-500/20 shadow-lg">
            <span className="text-xs text-slate-400 font-medium">সক্রিয় কোর্সসমূহ</span>
            <div className="text-2xl font-black text-cyan-400 mt-1">
              ২টি বিষয়
            </div>
            <span className="text-[11px] text-slate-500">ফিকহ ১ম + বালাগাত ও মানতিক</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e1424] border border-yellow-500/20 shadow-lg">
            <span className="text-xs text-slate-400 font-medium">হোস্টিং ও ডিপ্লয়মেন্ট</span>
            <div className="text-sm font-black text-yellow-400 mt-2 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Netlify Live Ready</span>
            </div>
            <span className="text-[11px] text-slate-500">SPA 404 Protected</span>
          </div>
        </div>

        {/* Tab Selection & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e1424] border border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'questions'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen size={15} />
              <span>প্রশ্নোত্তর তালিকা ({allQuestions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'students'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              <Users size={15} />
              <span>শিক্ষার্থী তালিকা ({students.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'analytics'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              <BarChart2 size={15} />
              <span>Analytics</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {activeTab === 'questions' && (
              <button
                onClick={handleOpenAddModal}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <PlusCircle size={15} />
                <span>নতুন প্রশ্ন যোগ করুন</span>
              </button>
            )}

            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors flex items-center gap-1.5 border border-slate-700"
              title="সম্পূর্ণ ডেটা JSON ফরম্যাটে ডাউনলোড করুন"
            >
              <Download size={15} />
              <span className="hidden sm:inline">JSON ব্যাকআপ</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Questions Management */}
        {activeTab === 'questions' && (
          <div className="space-y-4">
            
            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="প্রশ্ন অনুসন্ধান করুন (বাংলা বা আরবী)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0e1424] border border-slate-800 focus:border-amber-500 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white focus:outline-none"
                />
              </div>

              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-[#0e1424] border border-slate-800 focus:border-amber-500 rounded-xl py-2.5 px-3 text-xs text-slate-200 focus:outline-none font-bold"
              >
                <option value="all">সকল বিষয় (৩১টি)</option>
                <option value="fiqh">ফিকহ প্রথম পত্র (১২টি)</option>
                <option value="balaghat">বালাগাত পর্ব (১০টি)</option>
                <option value="mantiq">মানতিক পর্ব (৯টি)</option>
              </select>
            </div>

            {/* Questions Table / List */}
            <div className="space-y-3">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12 bg-[#0e1424] rounded-2xl border border-slate-800 text-slate-500 text-sm">
                  কোনো প্রশ্ন পাওয়া যায়নি
                </div>
              ) : (
                filteredQuestions.map((q, idx) => (
                  <div
                    key={`${q.subject}-${q.id}`}
                    className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800/80 hover:border-amber-500/40 transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            {q.subjectName}
                          </span>
                          <span className="text-xs text-slate-400 font-mono font-bold">
                            #{q.id}
                          </span>
                          {q.bookRef && (
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                              {q.bookRef}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-white leading-relaxed">
                          {q.questionBn}
                        </h4>

                        {q.questionAr && (
                          <p className="text-xs text-amber-300/80 font-serif" dir="rtl">
                            {q.questionAr}
                          </p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleOpenEditModal(q)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-700 transition-colors"
                          title="সম্পাদনা করুন"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q)}
                          className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Students List */}
        {activeTab === 'students' && (
          <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white">নিবন্ধিত শিক্ষার্থী তালিকা</h3>
                <p className="text-xs text-slate-400">Firebase থেকে লোড হওয়া সকল নিবন্ধিত শিক্ষার্থী</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold">
                মোট: {students.length} জন
              </span>
            </div>

            {studentsLoading ? (
              <div className="text-center py-8 text-slate-400 text-sm">লোড হচ্ছে...</div>
            ) : students.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">এখনো কোনো শিক্ষার্থী নিবন্ধিত হয়নি।</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                      <th className="pb-3 font-semibold pr-4">নাম</th>
                      <th className="pb-3 font-semibold pr-4">ইমেইল</th>
                      <th className="pb-3 font-semibold pr-4">মোবাইল</th>
                      <th className="pb-3 font-semibold pr-4">মাদরাসা</th>
                      <th className="pb-3 font-semibold">রেজিস্ট্রেশন তারিখ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {students.map((st, i) => (
                      <tr key={st.uid || i} className="hover:bg-slate-800/30">
                        <td className="py-3 font-bold text-white pr-4">{st.name || 'N/A'}</td>
                        <td className="py-3 text-amber-400 pr-4">{st.email || '—'}</td>
                        <td className="py-3 font-mono text-slate-300 pr-4">{st.mobile || '—'}</td>
                        <td className="py-3 text-slate-300 pr-4">{st.madrasah || '—'}</td>
                        <td className="py-3 text-slate-400">
                          {st.createdAt ? new Date(st.createdAt).toLocaleDateString('bn-BD') : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">

            {/* Analytics Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <BarChart2 size={18} className="text-amber-400" />
                  ব্যবহারকারী Analytics
                </h3>
                <p className="text-xs text-slate-400 mt-1">Firebase Firestore থেকে রিয়েলটাইম ডাটা</p>
              </div>
              <button
                onClick={loadAnalytics}
                disabled={analyticsLoading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={14} className={analyticsLoading ? 'animate-spin' : ''} />
                রিফ্রেশ
              </button>
            </div>

            {analyticsLoading ? (
              <div className="text-center py-12 text-slate-400">ডাটা লোড হচ্ছে...</div>
            ) : (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0e1424] border border-cyan-500/20">
                    <p className="text-xs text-slate-400">মোট লগইন</p>
                    <p className="text-2xl font-black text-cyan-400 mt-1">{loginLogs.length}</p>
                    <p className="text-[11px] text-slate-500">সর্বশেষ ২০০টি</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0e1424] border border-purple-500/20">
                    <p className="text-xs text-slate-400">মোট পেজ ভিজিট</p>
                    <p className="text-2xl font-black text-purple-400 mt-1">{pageViewLogs.length}</p>
                    <p className="text-[11px] text-slate-500">সর্বশেষ ৫০০টি</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0e1424] border border-emerald-500/20 col-span-2 sm:col-span-1">
                    <p className="text-xs text-slate-400">মোট সময় (মিনিট)</p>
                    <p className="text-2xl font-black text-emerald-400 mt-1">
                      {Math.round(pageViewLogs.reduce((acc, v) => acc + (v.durationSeconds || 0), 0) / 60)}
                    </p>
                    <p className="text-[11px] text-slate-500">সকল শিক্ষার্থীর সম্মিলিত</p>
                  </div>
                </div>

                {/* Page Visit Stats */}
                <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Activity size={15} className="text-purple-400" />
                    পেজ ভিজিট পরিসংখ্যান
                  </h4>
                  {(() => {
                    const pageStats = {};
                    pageViewLogs.forEach(v => {
                      if (!pageStats[v.page]) pageStats[v.page] = { visits: 0, totalSec: 0 };
                      pageStats[v.page].visits++;
                      pageStats[v.page].totalSec += (v.durationSeconds || 0);
                    });
                    const sorted = Object.entries(pageStats).sort((a, b) => b[1].visits - a[1].visits);
                    if (sorted.length === 0) return <p className="text-xs text-slate-500">এখনো কোনো পেজ ভিজিট রেকর্ড নেই।</p>;
                    const maxVisits = sorted[0][1].visits;
                    return sorted.map(([page, stat]) => (
                      <div key={page} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200">{page}</span>
                          <span className="text-slate-400">{stat.visits} ভিজিট · {Math.round(stat.totalSec / 60)} মিনিট</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                            style={{ width: `${(stat.visits / maxVisits) * 100}%` }}
                          />
                        </div>
                      </div>
                    ));
                  })()}
                </div>

                {/* Login History */}
                <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Clock size={15} className="text-cyan-400" />
                    সাম্প্রতিক লগইন হিস্টোরি
                  </h4>
                  {loginLogs.length === 0 ? (
                    <p className="text-xs text-slate-500">এখনো কোনো লগইন রেকর্ড নেই।</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-slate-400 border-b border-slate-800">
                            <th className="pb-2 font-semibold pr-4">নাম</th>
                            <th className="pb-2 font-semibold pr-4">ইমেইল</th>
                            <th className="pb-2 font-semibold">সময়</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                          {loginLogs.slice(0, 50).map((log) => (
                            <tr key={log.id} className="hover:bg-slate-800/20">
                              <td className="py-2 font-semibold text-white pr-4">{log.name || '—'}</td>
                              <td className="py-2 text-amber-400 pr-4">{log.email || '—'}</td>
                              <td className="py-2 text-slate-400">
                                {log.loginAt?.toDate
                                  ? log.loginAt.toDate().toLocaleString('bn-BD')
                                  : '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Per-user page time breakdown */}
                <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Smartphone size={15} className="text-emerald-400" />
                    শিক্ষার্থী অনুযায়ী সময় বিশ্লেষণ
                  </h4>
                  {(() => {
                    const userStats = {};
                    pageViewLogs.forEach(v => {
                      const key = v.uid;
                      if (!userStats[key]) userStats[key] = { name: v.name || v.email || key, totalSec: 0, pages: {} };
                      userStats[key].totalSec += (v.durationSeconds || 0);
                      userStats[key].pages[v.page] = (userStats[key].pages[v.page] || 0) + (v.durationSeconds || 0);
                    });
                    const sorted = Object.values(userStats).sort((a, b) => b.totalSec - a.totalSec);
                    if (sorted.length === 0) return <p className="text-xs text-slate-500">এখনো কোনো ডাটা নেই।</p>;
                    return sorted.slice(0, 20).map((u, i) => (
                      <div key={i} className="flex items-start justify-between gap-4 py-2 border-b border-slate-800/40 last:border-0">
                        <div>
                          <p className="font-semibold text-white text-xs">{u.name}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {Object.entries(u.pages).map(([pg, sec]) => `${pg}: ${Math.round(sec/60)}মি`).join(' · ')}
                          </p>
                        </div>
                        <span className="shrink-0 text-emerald-400 font-bold text-xs">
                          {Math.round(u.totalSec / 60)} মিনিট
                        </span>
                      </div>
                    ));
                  })()}
                </div>
              </>
            )}
          </div>
        )}

      </main>

      {/* Add / Edit Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0e1424] border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-100">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">
                {editingQuestion ? 'প্রশ্ন সম্পাদনা করুন' : 'নতুন প্রশ্ন যোগ করুন'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-3.5 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">বিষয় নির্বাচন করুন</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                  >
                    <option value="fiqh">ফিকহ প্রথম পত্র</option>
                    <option value="balaghat">বালাগাত পর্ব</option>
                    <option value="mantiq">মানতিক পর্ব</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-300">মূল কিতাবের নাম (রেফারেন্স)</label>
                  <input
                    type="text"
                    value={formData.bookRef}
                    onChange={(e) => setFormData({ ...formData, bookRef: e.target.value })}
                    placeholder="যেমন: دروس البلاغة / المرقاة"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">বাংলা প্রশ্নপত্র *</label>
                <textarea
                  rows={2}
                  value={formData.questionBn}
                  onChange={(e) => setFormData({ ...formData, questionBn: e.target.value })}
                  placeholder="যেমন: علم البلاغة-এর পরিচয় প্রদানপূর্বক এর আলোচ্য বিষয় ও উদ্দেশ্য বর্ণনা কর..."
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">আরবী মূল প্রশ্ন (ইবারত)</label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={formData.questionAr}
                  onChange={(e) => setFormData({ ...formData, questionAr: e.target.value })}
                  placeholder="عرف علم البلاغة مع بيان موضوعه وغرضه..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-serif text-amber-300 focus:outline-none text-right"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">আভিধানিক অর্থ</label>
                  <input
                    type="text"
                    value={formData.meaningBn}
                    onChange={(e) => setFormData({ ...formData, meaningBn: e.target.value })}
                    placeholder="যেমন: অলংকার শাস্ত্র"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">উদাহরণ</label>
                  <input
                    type="text"
                    value={formData.example}
                    onChange={(e) => setFormData({ ...formData, example: e.target.value })}
                    placeholder="যেমন: أبوك قائم (তোমার পিতা দণ্ডায়মান)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">পারিভাষিক আরবী সংজ্ঞা</label>
                <input
                  type="text"
                  dir="rtl"
                  value={formData.definitionAr}
                  onChange={(e) => setFormData({ ...formData, definitionAr: e.target.value })}
                  placeholder="البلاغه هى علم بقواعد..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-serif text-amber-300 focus:outline-none text-right"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">পারিভাষিক বাংলা ব্যাখ্যা</label>
                <textarea
                  rows={2}
                  value={formData.definitionBn}
                  onChange={(e) => setFormData({ ...formData, definitionBn: e.target.value })}
                  placeholder="বালাগাত হলো এমন কিছু নিয়মনীতি জানার নাম..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-bold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 shadow-lg flex items-center gap-1.5"
                >
                  <Save size={14} />
                  <span>সংরক্ষণ করুন</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
