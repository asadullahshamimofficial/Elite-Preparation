import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, Link } from 'react-router-dom';
import { Lock, LogIn, ArrowLeft, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, openAuthModal, loginAsAdmin } = useAuth();
  const location = useLocation();

  // Admin passcode login state
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Only open the public auth modal for regular study series, NOT for /admin
    if (!requireAdmin && !isAuthenticated) {
      openAuthModal(location.pathname);
    }
  }, [isAuthenticated, requireAdmin, location.pathname]);

  // Handle Admin Passcode Login directly on /admin
  const handleAdminPasscodeSubmit = (e) => {
    e.preventDefault();
    setAdminError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const res = loginAsAdmin(adminPasscode);
      if (!res.success) {
        setAdminError(res.message);
      }
    }, 300);
  };

  // If this is an Admin Route and user is NOT Admin -> show secure Admin Passcode Portal
  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#070b12] text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0d1322] border border-amber-500/30 rounded-3xl p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/10">
              <ShieldCheck size={32} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">এডমিন সিকিউরিটি পোর্টাল</h2>
              <p className="text-xs text-slate-400 mt-1">
                এডমিন প্যানেলে প্রবেশের জন্য অনুমোদিত সিকিউরিটি পাসওয়ার্ড প্রদান করুন
              </p>
            </div>
          </div>

          {adminError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-400 text-xs">
              <AlertCircle size={16} className="shrink-0" />
              <span>{adminError}</span>
            </div>
          )}

          <form onSubmit={handleAdminPasscodeSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                এডমিন পাসওয়ার্ড / সিকিউরিটি কোড
              </label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="পাসওয়ার্ড লিখুন..."
                  required
                  autoFocus
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={18} />
              <span>{isSubmitting ? 'যাচাই হচ্ছে...' : 'এডমিন প্যানেলে প্রবেশ করুন'}</span>
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-amber-400 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>মূল সাইটে ফিরে যান</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // If this is a Student Study Route and user is NOT authenticated
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

  return children;
}
