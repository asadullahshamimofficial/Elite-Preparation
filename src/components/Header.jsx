import React from 'react';
import { BookOpen, Search, Sun, Moon, Bookmark, HelpCircle, Printer, Type, Menu } from 'lucide-react';

export default function Header({
  titleBn = "ফিকহ প্রথম পত্র",
  titleAr = "الفقه الكتاب الأول - الفتاوى الشرعية",
  searchPlaceholder = "অনুসন্ধান করুন (যেমন: হজ্জ, বিবাহ, طلاق, ركن)...",
  searchTerm,
  setSearchTerm,
  theme,
  toggleTheme,
  fontSize,
  setFontSize,
  bookmarkedIds = [],
  setShowBookmarks,
  setShowQuiz,
  handlePrint,
  onOpenSidebar
}) {
  return (
    <header className="app-header">
      <div className="header-content">
        
        {/* Left: Mobile Drawer Trigger + Subject Title */}
        <div className="logo-section flex items-center gap-3">
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="md:hidden p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0"
              title="অধ্যায় বা পর্ব নির্বাচন করুন"
            >
              <Menu size={20} />
            </button>
          )}

          <div className="logo-badge shrink-0">
            <BookOpen size={22} />
          </div>

          <div className="logo-text">
            <h1 className="text-base sm:text-xl font-bold text-amber-400 leading-tight">
              {titleBn}
            </h1>
            <p className="text-xs text-slate-400 font-serif hidden sm:block">
              {titleAr}
            </p>
          </div>
        </div>

        {/* Center: Search Box */}
        <div className="search-box">
          <Search className="search-icon" size={17} />
          <input
            type="text"
            className="search-input text-sm"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Right: Controls Group */}
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
            className="btn-icon relative"
            title="সংরক্ষিত প্রশ্নসমূহ"
            onClick={() => setShowBookmarks(true)}
          >
            <Bookmark size={18} />
            {bookmarkedIds.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                {bookmarkedIds.length}
              </span>
            )}
          </button>

          {/* Print */}
          <button className="btn-icon hidden sm:flex" title="প্রিন্ট ভিউ" onClick={handlePrint}>
            <Printer size={18} />
          </button>

          {/* Quiz Button */}
          <button className="btn-pill shrink-0" onClick={() => setShowQuiz(true)}>
            <HelpCircle size={17} />
            <span className="text-xs font-bold">কুইজ টেস্ট</span>
          </button>
        </div>

      </div>
    </header>
  );
}
