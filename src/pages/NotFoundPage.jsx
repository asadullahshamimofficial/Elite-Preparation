import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, BookOpen, Search } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Auto-redirect to home after 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col items-center justify-center px-6 py-20 font-sans relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 404 number */}
      <div className="relative mb-6 select-none">
        <span className="text-[10rem] sm:text-[14rem] font-black text-slate-800 leading-none tracking-tighter">
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter bg-gradient-to-b from-amber-400 to-amber-600 bg-clip-text text-transparent">
          404
        </span>
      </div>

      {/* Text */}
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-center">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h1>
      {/* Icon */}
      {/* <div className="mb-6 w-20 h-20 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shadow-xl">
        <Search size={36} className="text-amber-400 opacity-80" />
      </div> */}
      {/* <p className="text-slate-400 text-sm sm:text-base text-center max-w-md mb-2">
        আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে, নামটি পরিবর্তিত হয়েছে, অথবা কখনো ছিলই না।
      </p> */}
      
      <p className="text-slate-500 text-xs text-center mb-10">
        <span className="text-amber-400 font-bold">{countdown}</span> সেকেন্ড পরে স্বয়ংক্রিয়ভাবে হোম পেজে যাবে...
      </p>

      {/* Countdown ring */}
      <div className="relative w-14 h-14 mb-10">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="24" fill="none" stroke="#1e293b" strokeWidth="4" />
          <circle
            cx="28" cy="28" r="24"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 24}`}
            strokeDashoffset={`${2 * Math.PI * 24 * (countdown / 10)}`}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-amber-400 font-bold text-lg">
          {countdown}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <Link
          to="/"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
        >
          <Home size={17} />
          হোম পেজে যান
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 text-slate-200 font-bold text-sm hover:bg-slate-700 transition-all border border-slate-700"
        >
          <ArrowLeft size={17} />
          আগের পেজে ফিরুন
        </button>
      </div>

      {/* Quick links */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <p className="text-slate-500 text-xs">দ্রুত লিংক</p>
        <div className="flex gap-4">
          <Link
            to="/alim/fiqh-1st-paper"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
          >
            <BookOpen size={13} />
            ফিকহ ১ম পত্র
          </Link>
          <span className="text-slate-700">|</span>
          <Link
            to="/alim/balagat-and-mantiq"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
          >
            <BookOpen size={13} />
            বালাগাত ও মানতিক
          </Link>
        </div>
      </div>

      {/* Brand */}
      <div className="absolute bottom-6 text-center">
        <span className="text-slate-700 text-xs">Elite Preparation © 2026</span>
      </div>
    </div>
  );
}
