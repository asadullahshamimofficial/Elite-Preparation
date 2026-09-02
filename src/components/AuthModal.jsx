import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  GraduationCap,
  Phone,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function AuthModal() {
  const { authModalOpen, closeAuthModal, register, login, redirectAfterLogin, setRedirectAfterLogin } = useAuth();
  const navigate = useNavigate();

  // Tab: 'login' | 'register'
  const [tab, setTab] = useState('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPw, setShowLoginPw] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regMadrasah, setRegMadrasah] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [showRegPw, setShowRegPw] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetForms = () => {
    setLoginEmail('');
    setLoginPassword('');
    setShowLoginPw(false);

    setRegName('');
    setRegMadrasah('');
    setRegMobile('');
    setRegEmail('');
    setRegPassword('');
    setRegConfirm('');
    setShowRegPw(false);
    setShowRegConfirm(false);

    setError('');
    setSuccess('');
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForms();
    closeAuthModal();
  };

  if (!authModalOpen) return null;

  const afterAuth = () => {
    const dest = redirectAfterLogin || '/';
    if (setRedirectAfterLogin) setRedirectAfterLogin(null);
    resetForms();
    closeAuthModal();
    if (window.location.pathname !== dest) {
      navigate(dest);
    }
  };

  // ── Login handler ─────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!loginEmail.trim() || !loginPassword) {
      setError('ইমেইল ও পাসওয়ার্ড দেওয়া আবশ্যক।');
      return;
    }
    setIsLoading(true);
    try {
      await login(loginEmail.trim().toLowerCase(), loginPassword);
      afterAuth();
    } catch (err) {
      const msg = err.code;
      if (msg === 'auth/invalid-credential' || msg === 'auth/wrong-password' || msg === 'auth/user-not-found') {
        setError('ইমেইল বা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।');
      } else if (msg === 'auth/too-many-requests') {
        setError('অনেকবার ভুল চেষ্টা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।');
      } else {
        setError('লগইন ব্যর্থ হয়েছে: ' + (err.message || msg));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Register handler ──────────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!regName.trim()) { setError('আপনার পূর্ণ নাম লিখুন।'); return; }
    if (!regMobile.trim()) { setError('মোবাইল নাম্বার দেওয়া আবশ্যক।'); return; }
    if (!/^01[3-9]\d{8}$/.test(regMobile.replace(/[-\s]/g, ''))) {
      setError('সঠিক বাংলাদেশি মোবাইল নাম্বার দিন (যেমন: 01712345678)।'); return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) { setError('সঠিক ইমেইল ঠিকানা দিন।'); return; }
    if (regPassword.length < 6) { setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।'); return; }
    if (regPassword !== regConfirm) { setError('পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না।'); return; }

    setIsLoading(true);
    try {
      await register({
        name: regName.trim(),
        madrasah: regMadrasah.trim(),
        mobile: regMobile.replace(/[-\s]/g, ''),
        email: regEmail.trim().toLowerCase(),
        password: regPassword
      });
      afterAuth();
    } catch (err) {
      const msg = err.code;
      if (msg === 'auth/email-already-in-use') {
        setError('এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে। লগইন করুন।');
      } else if (msg === 'auth/weak-password') {
        setError('পাসওয়ার্ড আরও শক্তিশালী করুন (কমপক্ষে ৬ অক্ষর)।');
      } else if (msg === 'auth/invalid-email') {
        setError('ইমেইল ঠিকানাটি সঠিক নয়।');
      } else {
        setError('রেজিস্ট্রেশন ব্যর্থ: ' + (err.message || msg));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0e1424] border border-amber-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-black font-black text-2xl mb-3 shadow-lg shadow-amber-500/20">
            eP
          </div>
          <h3 className="text-xl font-bold text-white">স্টাডি সিরিজে প্রবেশ করুন</h3>
          <p className="text-xs text-slate-400 mt-1">আলিম পরীক্ষার্থীদের জন্য বিশেষভাবে তৈরি</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-slate-900/80 p-1 mb-6 gap-1">
          <button
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              tab === 'login'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn size={15} />
            লগইন
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              tab === 'register'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus size={15} />
            রেজিস্ট্রেশন
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2 text-rose-400 text-xs leading-relaxed">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* ── LOGIN FORM ── */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">ইমেইল ঠিকানা *</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="student@example.com"
                  required
                  autoFocus
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">পাসওয়ার্ড *</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showLoginPw ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="আপনার পাসওয়ার্ড"
                  required
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-11 text-sm text-white focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPw(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showLoginPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
            >
              <LogIn size={16} />
              {isLoading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
            </button>

            <p className="text-center text-xs text-slate-500 pt-1">
              অ্যাকাউন্ট নেই?{' '}
              <button type="button" onClick={() => { setTab('register'); setError(''); }} className="text-amber-400 font-semibold hover:underline">
                রেজিস্ট্রেশন করুন
              </button>
            </p>
          </form>
        )}

        {/* ── REGISTER FORM ── */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">পূর্ণ নাম *</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  placeholder="যেমন: মুহাম্মদ আব্দুল্লাহ"
                  required
                  autoFocus
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Madrasah (optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">মাদ্রাসার নাম <span className="text-slate-500 font-normal">(ঐচ্ছিক)</span></label>
              <div className="relative">
                <GraduationCap size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={regMadrasah}
                  onChange={e => setRegMadrasah(e.target.value)}
                  placeholder="যেমন: ঢাকা আলিয়া মাদরাসা"
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">মোবাইল নাম্বার *</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="tel"
                  value={regMobile}
                  onChange={e => setRegMobile(e.target.value)}
                  placeholder="01712345678"
                  required
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">ইমেইল ঠিকানা *</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="student@example.com"
                  required
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">পাসওয়ার্ড * <span className="text-slate-500 font-normal">(কমপক্ষে ৬ অক্ষর)</span></label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showRegPw ? 'text' : 'password'}
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  placeholder="শক্তিশালী পাসওয়ার্ড দিন"
                  required
                  minLength={6}
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-11 text-sm text-white focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPw(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showRegPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">কনফার্ম পাসওয়ার্ড *</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showRegConfirm ? 'text' : 'password'}
                  value={regConfirm}
                  onChange={e => setRegConfirm(e.target.value)}
                  placeholder="পাসওয়ার্ড আবার লিখুন"
                  required
                  className={`w-full bg-slate-900/90 border rounded-xl py-3 pl-10 pr-11 text-sm text-white focus:outline-none transition-colors ${
                    regConfirm && regConfirm !== regPassword
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-slate-700 focus:border-amber-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowRegConfirm(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showRegConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {regConfirm && regConfirm !== regPassword && (
                <p className="text-[11px] text-rose-400 mt-1">পাসওয়ার্ড মিলছে না</p>
              )}
              {regConfirm && regConfirm === regPassword && regPassword.length >= 6 && (
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 size={11} /> পাসওয়ার্ড মিলেছে
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-1 disabled:opacity-60"
            >
              <UserPlus size={16} />
              {isLoading ? 'রেজিস্ট্রেশন হচ্ছে...' : 'রেজিস্ট্রেশন করুন'}
              {!isLoading && <ArrowRight size={15} />}
            </button>

            <p className="text-center text-xs text-slate-500 pt-1">
              আগেই অ্যাকাউন্ট আছে?{' '}
              <button type="button" onClick={() => { setTab('login'); setError(''); }} className="text-amber-400 font-semibold hover:underline">
                লগইন করুন
              </button>
            </p>
          </form>
        )}

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <Sparkles size={12} className="text-amber-400" />
            Firebase দ্বারা সুরক্ষিত • আলিম পরীক্ষা ২০২৬
          </p>
        </div>
      </div>
    </div>
  );
}
