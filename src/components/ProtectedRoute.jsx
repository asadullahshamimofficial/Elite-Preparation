import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, Link } from 'react-router-dom';
import { Lock, LogIn, ArrowLeft, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, openAuthModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal(location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-[#0e1424] border border-amber-500/30 rounded-2xl p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/10">
            <Lock size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">স্টাডি সিরিজ লক করা আছে</h2>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              আলিম ২০২৬ স্টাডি সিরিজের সম্পূর্ণ প্রশ্নোত্তর ও বিস্তারিত সমাধান পড়ার জন্য অনুগ্রহ করে আপনার মোবাইল নম্বর বা জিমেইল দিয়ে প্রবেশ করুন।
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => openAuthModal(location.pathname)}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              <span>লগইন করে পড়া শুরু করুন</span>
            </button>

            <Link
              to="/"
              className="w-full py-3 rounded-xl font-medium text-xs bg-slate-800/80 text-slate-300 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={14} />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-[#0e1424] border border-rose-500/30 rounded-2xl p-8 shadow-2xl space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center">
            <ShieldAlert size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">এডমিন অনুমতি প্রয়োজন</h2>
            <p className="text-sm text-slate-400 mt-2">
              এই পেজে প্রবেশের জন্য আপনার এডমিন সিকিউরিটি পাসকোড প্রয়োজন।
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => openAuthModal('/admin')}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-amber-500 text-black hover:bg-amber-400 transition-all"
            >
              এডমিন লগইন করুন
            </button>

            <Link
              to="/"
              className="w-full py-3 rounded-xl font-medium text-xs bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
