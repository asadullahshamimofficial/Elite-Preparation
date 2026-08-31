import React from 'react';
import { BookOpen, Search, Sun, Moon, Bookmark, HelpCircle, Printer, Type } from 'lucide-react';

export default function Header({
  searchTerm,
  setSearchTerm,
  theme,
  toggleTheme,
  fontSize,
  setFontSize,
  bookmarkedIds,
  setShowBookmarks,
  setShowQuiz,
  handlePrint
}) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-badge">
            <BookOpen size={24} />
          </div>
          <div className="logo-text">
            <h1>ফিকহ প্রথম পত্র</h1>
            <p>الفقه الكتاب الأول - الفتاوى الشرعية</p>
          </div>
        </div>

        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="অনুসন্ধান করুন (যেমন: হজ্জ, বিবাহ, طلاق, ركن)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="controls-group">
          {/* Font size toggle */}
          <button
            className="btn-icon"
            title="লেখা বড়/ছোট করুন"
            onClick={() => setFontSize(prev => prev >= 1.25 ? 0.9 : prev + 0.1)}
          >
            <Type size={18} />
          </button>

          {/* Theme switch */}
          <button
            className="btn-icon"
            title="থিম পরিবর্তন করুন"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Bookmarks */}
          <button
            className="btn-icon"
            title="সংরক্ষিত প্রশ্নসমূহ"
            onClick={() => setShowBookmarks(true)}
            style={{ position: 'relative' }}
          >
            <Bookmark size={18} />
            {bookmarkedIds.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--accent-gold)',
                color: '#000',
                fontSize: '0.7rem',
                fontWeight: '700',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {bookmarkedIds.length}
              </span>
            )}
          </button>

          {/* Print */}
          <button className="btn-icon" title="প্রিন্ট ভিউ" onClick={handlePrint}>
            <Printer size={18} />
          </button>

          {/* Quiz Button */}
          <button className="btn-pill" onClick={() => setShowQuiz(true)}>
            <HelpCircle size={18} />
            <span>কুইজ পরীক্ষা</span>
          </button>
        </div>
      </div>
    </header>
  );
}
