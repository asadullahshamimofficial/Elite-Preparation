import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import QaCard from './components/QaCard';
import QuizModal from './components/QuizModal';
import BookmarkDrawer from './components/BookmarkDrawer';
import { chapters, questions, quizData } from './data/fiqhData';

export default function App() {
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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', `${fontSize}rem`);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('fiqh_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSelectQuestion = (id) => {
    setActiveChapterId('all');
    setTimeout(() => {
      const el = document.getElementById(`q-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Filter questions by active chapter & search query
  const filteredQuestions = questions.filter(q => {
    const matchesChapter = activeChapterId === 'all' || q.chapterId === activeChapterId;
    const matchesSearch = searchTerm.trim() === '' ||
      q.questionBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.questionAr && q.questionAr.includes(searchTerm)) ||
      JSON.stringify(q).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesChapter && matchesSearch;
  });

  const activeChapterObj = chapters.find(c => c.id === activeChapterId);
  const bookmarkedQuestions = questions.filter(q => bookmarkedIds.includes(q.id));

  return (
    <div className="app-container">
      <Header
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

      <div className="main-layout">
        <Sidebar
          chapters={chapters}
          activeChapterId={activeChapterId}
          setActiveChapterId={setActiveChapterId}
        />

        <main className="content-area">
          {/* Chapter Banner */}
          <div className="chapter-banner">
            <h2>
              {activeChapterId === 'all' ? 'ফিকহ প্রথম পত্র - মূল বিষয়বস্তু' : `${activeChapterObj?.titleBn} (${activeChapterObj?.titleAr})`}
            </h2>
            <p style={{ marginTop: '0.4rem' }}>
              {activeChapterId === 'all'
                ? 'ইসলামী ফিকহ শাস্ত্রের প্রথম পত্রের ৭টি অধ্যায় ও প্রশ্নোত্তরের পূর্ণাঙ্গ নির্দেশিকা ও পড়াশোনা প্ল্যাটফর্ম'
                : activeChapterObj?.description}
            </p>
          </div>

          {/* Q&A List */}
          {filteredQuestions.length === 0 ? (
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-md)',
              padding: '3rem 1.5rem',
              textAlign: 'center',
              color: 'var(--text-muted)'
            }}>
              <h3>কোনো প্রশ্ন পাওয়া যায়নি</h3>
              <p style={{ marginTop: '0.5rem' }}>আপনার অনুসন্ধানের সাথে মেলে এমন কোনো প্রশ্ন পাওয়া যায়নি। অনুগ্রহ করে অন্য কীওয়ার্ড দিয়ে সন্ধান করুন।</p>
            </div>
          ) : (
            filteredQuestions.map(q => (
              <QaCard
                key={q.id}
                q={q}
                isBookmarked={bookmarkedIds.includes(q.id)}
                toggleBookmark={toggleBookmark}
              />
            ))
          )}
        </main>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizModal
          quizData={quizData}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {/* Bookmark Drawer */}
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
