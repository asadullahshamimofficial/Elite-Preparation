import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Mail,
  ArrowRight,
  User,
  GraduationCap,
  AlertCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function AuthModal() {
  const {
    authModalOpen,
    closeAuthModal,
    loginWithGoogle,
    redirectAfterLogin
  } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [madrasah, setMadrasah] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setError('অনুগ্রহ করে একটি সঠিক জিমেইল আইডি দিন (যেমন: student@gmail.com)');
      return;
    }

    if (!name.trim()) {
      setError('অনুগ্রহ করে আপনার নাম লিখুন');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const studentName = name.trim();
      const studentMadrasah = madrasah.trim() || 'আলিম মাদরাসা';
      loginWithGoogle(cleanEmail, studentName, studentMadrasah);
      closeAuthModal();
      if (redirectAfterLogin) {
        navigate(redirectAfterLogin);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0e1424] border border-amber-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Top Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-black font-black text-2xl mb-3 shadow-lg shadow-amber-500/20">
            eP
          </div>
          <h3 className="text-xl font-bold text-white">স্টাডি সিরিজে প্রবেশ করুন</h3>
          <p className="text-xs text-slate-400 mt-1">
            আলিম ২০২৬ পরীক্ষার্থীদের জন্য বিশেষায়িত স্মার্ট স্টাডি প্ল্যাটফর্ম
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-400 text-xs leading-relaxed">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Gmail Login Form */}
        <form onSubmit={handleGoogleLogin} className="space-y-4 text-xs">
          
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              আপনার জিমেইল (Gmail) আইডি *
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@gmail.com"
                required
                className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              আপনার সম্পূর্ণ নাম *
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: মুহাম্মদ আব্দুল্লাহ"
                required
                className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              মাদরাসার নাম (ঐচ্ছিক)
            </label>
            <div className="relative">
              <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={madrasah}
                onChange={(e) => setMadrasah(e.target.value)}
                placeholder="যেমন: ঢাকা আলিয়া মাদরাসা"
                className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-2"
          >
            <span>{isLoading ? 'প্রবেশ করা হচ্ছে...' : 'জিমেইল দিয়ে পড়াশোনা শুরু করুন'}</span>
            <ArrowRight size={16} />
          </button>

        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>১০০% নিরাপদ ও ফ্রি স্টাডি অ্যাক্সেস</span>
          </div>
        </div>

      </div>
    </div>
  );
}
