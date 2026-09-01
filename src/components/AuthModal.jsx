import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  User,
  GraduationCap,
  AlertCircle
} from 'lucide-react';

export default function AuthModal() {
  const {
    authModalOpen,
    closeAuthModal,
    loginWithPhone,
    loginWithGoogle,
    loginAsAdmin,
    redirectAfterLogin
  } = useAuth();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('phone'); // 'phone' | 'google' | 'admin'
  const [step, setStep] = useState(1); // 1: Input, 2: OTP, 3: Profile Setup
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [email, setEmail] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [name, setName] = useState('');
  const [madrasah, setMadrasah] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleSendPhoneOtp = (e) => {
    e.preventDefault();
    setError('');
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন (যেমন: 017XXXXXXXX)');
      return;
    }

    setIsLoading(true);
    // Generate a 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);

    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');
    if (otpCode !== generatedOtp && otpCode !== '123456') {
      setError('ভুল OTP কোড! স্ক্রিনে প্রদর্শিত ৬ ডিজিটের কোডটি লিখুন অথবা ১২৩৪৫৬ ব্যবহার করুন।');
      return;
    }

    // Proceed to Step 3: Profile setup (or login directly if name exists)
    setStep(3);
  };

  const handleCompletePhoneLogin = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('অনুগ্রহ করে আপনার নাম প্রদান করুন');
      return;
    }
    const studentMadrasah = madrasah.trim() || 'আলিম মাদরাসা';
    loginWithPhone(phoneNumber, name, studentMadrasah);
    closeAuthModal();
    if (redirectAfterLogin) {
      navigate(redirectAfterLogin);
    }
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !email.includes('@')) {
      setError('অনুগ্রহ করে একটি সঠিক জিমেইল আইডি দিন');
      return;
    }
    const studentName = name.trim() || email.split('@')[0];
    const studentMadrasah = madrasah.trim() || 'আলিম মাদরাসা';
    loginWithGoogle(email, studentName, studentMadrasah);
    closeAuthModal();
    if (redirectAfterLogin) {
      navigate(redirectAfterLogin);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const res = loginAsAdmin(adminPasscode);
      if (res.success) {
        closeAuthModal();
        navigate('/admin');
      } else {
        setError(res.message);
      }
    }, 400);
  };

  const resetForm = () => {
    setStep(1);
    setError('');
    setOtpCode('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0e1424] border border-amber-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Top Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-black font-black text-xl mb-3 shadow-lg shadow-amber-500/20">
            eP
          </div>
          <h3 className="text-xl font-bold text-white">স্টাডি সিরিজে প্রবেশ করুন</h3>
          <p className="text-xs text-slate-400 mt-1">
            আলিম ২০২৬ পরীক্ষার্থীদের জন্য বিশেষায়িত পূর্ণাঙ্গ স্টাডি প্ল্যাটফর্ম
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-400 text-xs leading-relaxed">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tabs: Phone | Gmail | Admin */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800 mb-6 text-xs font-bold">
          <button
            onClick={() => { setActiveTab('phone'); resetForm(); }}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'phone'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Phone size={13} />
            <span>মোবাইল</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('google'); resetForm(); }}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'google'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail size={13} />
            <span>জিমেইল</span>
          </button>

          <button
            onClick={() => { setActiveTab('admin'); resetForm(); }}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'admin'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck size={13} />
            <span>এডমিন</span>
          </button>
        </div>

        {/* Tab 1: Phone Auth with OTP */}
        {activeTab === 'phone' && (
          <div>
            {step === 1 && (
              <form onSubmit={handleSendPhoneOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    আপনার মোবাইল নম্বর দিন
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">
                      +৮৮
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="017XXXXXXXX"
                      required
                      className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-14 pr-4 text-sm text-white focus:outline-none transition-colors font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <span>{isLoading ? 'কোড পাঠানো হচ্ছে...' : 'OTP কোড পাঠান'}</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                  <p className="text-xs text-amber-300">
                    আপনার নম্বর <strong>{phoneNumber}</strong>-এ ৬ সংখ্যার ভেরিফিকেশন কোড পাঠানো হয়েছে।
                  </p>
                  <div className="mt-2 text-xs font-bold text-amber-400 bg-black/40 py-1 px-3 rounded-lg inline-block border border-amber-500/30">
                    টেস্ট কোড: {generatedOtp || '123456'}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    ৬ সংখ্যার OTP কোড লিখুন
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    required
                    className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 px-4 text-center tracking-widest text-lg font-mono font-bold text-white focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    নম্বর পরিবর্তন
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 shadow-lg"
                  >
                    যাচাই করুন
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleCompletePhoneLogin} className="space-y-4">
                <div className="text-center pb-1">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold inline-flex items-center gap-1">
                    <CheckCircle2 size={13} /> নম্বর ভেরিফাইড
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    আপনার সম্পূর্ণ নাম
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="যেমন: মুহাম্মদ আব্দুল্লাহ"
                      required
                      className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    মাদরাসার নাম (ঐচ্ছিক)
                  </label>
                  <div className="relative">
                    <GraduationCap size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={madrasah}
                      onChange={(e) => setMadrasah(e.target.value)}
                      placeholder="যেমন: ঢাকা আলিয়া মাদরাসা"
                      className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <span>পড়াশোনা শুরু করুন</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Gmail Login */}
        {activeTab === 'google' && (
          <form onSubmit={handleGoogleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                আপনার জিমেইল আইডি দিন
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@gmail.com"
                  required
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                আপনার নাম
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: আহমদ হাসান"
                  required
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                মাদরাসার নাম (ঐচ্ছিক)
              </label>
              <div className="relative">
                <GraduationCap size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={madrasah}
                  onChange={(e) => setMadrasah(e.target.value)}
                  placeholder="যেমন: ছারছীনা দারুসসুন্নাত আলিয়া মাদরাসা"
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <span>জিমেইল দিয়ে প্রবেশ করুন</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Tab 3: Admin Passcode Login */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300">
              এডমিন ড্যাশবোর্ডে প্রবেশ করে নতুন প্রশ্ন যোগ, এডিট ও ম্যানেজ করতে পারেন।
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                এডমিন সিকিউরিটি পাসকোড
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="পাসকোড লিখুন (যেমন: admin123)"
                  required
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} />
              <span>{isLoading ? 'যাচাই হচ্ছে...' : 'এডমিন প্যানেলে প্রবেশ করুন'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
