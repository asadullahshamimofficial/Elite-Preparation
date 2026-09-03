import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import QaCard from '../components/QaCard';
import QuizModal from '../components/QuizModal';
import BookmarkDrawer from '../components/BookmarkDrawer';
import { chapters, questions as localQuestions, quizData } from '../data/fiqhData';
import { fetchQuestionsFromFirestore } from '../services/firebase';
import { ChevronDown, ChevronUp } from 'lucide-react';
import usePageTracking from '../hooks/usePageTracking';

export default function FiqhApp() {
  usePageTracking('ফিকহ ১ম পত্র');
  const [activeChapterId, setActiveChapterId] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(1.0);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const saved = localStorage.getItem('fiqh_bookmarks');
    return saved ? JSON.parse(saved) : [1, 4];
  });
  const [showQuiz, setShowQuiz] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [expandAll, setExpandAll] = useState(false);
  const [expandToggleKey, setExpandToggleKey] = useState(0);

  // Firestore-first questions: fetch from cloud, fallback to local
  const [questions, setQuestions] = useState(localQuestions);
  useEffect(() => {
    fetchQuestionsFromFirestore().then(data => {
      if (data?.fiqh && data.fiqh.length > 0) {
        setQuestions(data.fiqh);
      }
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', `${fontSize}rem`);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('fiqh_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handlePrint = () => window.print();

  const handleSelectQuestion = (id) => {
    setActiveChapterId('all');
    setTimeout(() => {
      document.getElementById(`q-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleToggleExpandAll = () => {
    setExpandAll(prev => !prev);
    setExpandToggleKey(prev => prev + 1);
  };

  const filteredQuestions = questions.filter(q => {
    const matchesChapter = activeChapterId === 'all' || q.chapterId === activeChapterId;
    const matchesSearch = searchTerm.trim() === '' ||
      q.questionBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.questionAr && q.questionAr.includes(searchTerm)) ||
      JSON.stringify(q).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesChapter && matchesSearch;
  });

  const bookmarkedQuestions = questions.filter(q => bookmarkedIds.includes(q.id));

  const tabs = [
    { id: 'all', label: 'সবগুলো' },
    ...chapters.map(c => ({ id: c.id, label: c.titleBn }))
  ];

  return (
    <div className="app-container">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between px-4 py-2 text-xs border-b bg-[#0b0f17] border-amber-500/20">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
            ← হোমে ফিরুন
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-medium hidden sm:inline">ফিকহ প্রথম পত্র — আলিম ২০২৬</span>
        </div>
        <Link to="/alim/balagat-and-mantiq" className="text-slate-400 hover:text-amber-400 transition-colors hidden sm:inline">
          বালাগাত ও মানতিক
        </Link>
      </div>

      {/* Main Header */}
      <Header
        titleBn="ফিকহ প্রথম পত্র"
        titleAr="الفقه الكتاب الأول - الفتاوى الشرعية"
        searchPlaceholder="অনুসন্ধান করুন (যেমন: হজ্জ, بيع, طلاق, ركن)..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        theme={theme}
        toggleTheme={toggleTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        bookmarkedIds={bookmarkedIds}
        setShowBookmarks={setShowBookmarks}
        setShowQuiz={setShowQuiz}
        handlePrint={handlePrint}
      />

      {/* Horizontal Pill Tab Bar */}
      <div className="sticky top-0 z-30 bg-[#0d131f]/95 backdrop-blur-md border-b border-amber-500/20 px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveChapterId(tab.id)}
              className={`
                whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-sm font-semibold
                transition-all duration-200 border
                ${activeChapterId === tab.id
                  ? 'bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/30'
                  : 'bg-[#1a2035] text-slate-300 border-slate-700 hover:border-amber-500/50 hover:text-amber-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}

          {/* Divider + Expand All */}
          <div className="ml-auto shrink-0 flex items-center gap-2 pl-3 border-l border-slate-700">
            <button
              onClick={handleToggleExpandAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1a2035] text-slate-300 border border-slate-700 hover:border-amber-500/50 hover:text-amber-300 transition-all whitespace-nowrap"
            >
              {expandAll ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              <span>{expandAll ? 'সব বন্ধ' : 'সব খুলুন'}</span>
            </button>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/30 whitespace-nowrap">
              {filteredQuestions.length}টি
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto w-full px-4 py-6">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="text-lg font-semibold">কোনো প্রশ্ন পাওয়া যায়নি</p>
            <p className="text-sm mt-2">অন্য কীওয়ার্ড দিয়ে সন্ধান করুন</p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => (
            <QaCard
              key={`${q.id}-${expandToggleKey}`}
              q={q}
              isBookmarked={bookmarkedIds.includes(q.id)}
              toggleBookmark={toggleBookmark}
              defaultOpen={expandAll || idx === 0}
            />
          ))
        )}
      </div>

      {showQuiz && <QuizModal quizData={quizData} onClose={() => setShowQuiz(false)} />}
      {showBookmarks && (
        <BookmarkDrawer
          bookmarkedQuestions={bookmarkedQuestions}
          onClose={() => setShowBookmarks(false)}
          onSelectQuestion={handleSelectQuestion}
        />
      )}
    </div>
  );
}
