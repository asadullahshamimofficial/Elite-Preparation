import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { saveStudentProfile, getStudentProfile } from '../services/firebase';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Award,
  Save,
  CheckCircle2,
  ArrowLeft,
  BookOpen,
  Bookmark,
  MessageCircle,
  LogOut,
  Sparkles,
  ShieldCheck,
  Calendar,
  Layers,
  FileCheck
} from 'lucide-react';

export default function StudentProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    madrasah: user?.madrasah || '',
    district: user?.district || '',
    group: user?.group || 'সাধারণ বিভাগ',
    rollNo: user?.rollNo || '',
    goal: user?.goal || 'আলিম ২০২৬ পরীক্ষায় জিপিএ ৫.০০ (A+) অর্জন করা'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [stats, setStats] = useState({
    fiqhCount: 12,
    balaghatCount: 19,
    bookmarksCount: 0
  });

  useEffect(() => {
    // Load existing profile & bookmarks count
    try {
      const savedBookmarks = JSON.parse(localStorage.getItem('fiqh_bookmarks') || '[]');
      setStats(prev => ({ ...prev, bookmarksCount: savedBookmarks.length }));

      if (user?.id) {
        getStudentProfile(user.id).then(data => {
          if (data) {
            setFormData(prev => ({ ...prev, ...data }));
          }
        });
      }
    } catch (err) {
      console.error('Error loading profile:', err);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSaveSuccess(false);

    try {
      await saveStudentProfile(user?.id || user?.email || 'student_' + Date.now(), formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userInitial = (formData.name || user?.name || 'শিক্ষার্থী').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans pb-20 selection:bg-amber-500 selection:text-black">
      
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-[#0d1322]/95 backdrop-blur-md border-b border-amber-500/20 px-4 sm:px-8 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold"
            >
              <ArrowLeft size={16} />
              <span>মূল সাইট</span>
            </Link>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <User size={16} />
              </span>
              <h1 className="text-sm font-bold text-white">শিক্ষার্থী ড্যাশবোর্ড ও প্রোফাইল</h1>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25 transition-colors"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Profile Banner Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0e1526] via-[#111a30] to-[#0e1526] border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-black font-black text-3xl sm:text-4xl flex items-center justify-center shadow-xl shadow-amber-500/20 shrink-0">
              {userInitial}
            </div>

            {/* Profile Info */}
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {formData.name || 'শিক্ষার্থী'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 size={13} /> ভেরিফাইড শিক্ষার্থী
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300">
                {formData.madrasah || 'মাদরাসার নাম যুক্ত করুন'} • {formData.group}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono text-amber-300">
                  <Mail size={13} /> {formData.email || user?.email}
                </span>
                {formData.phone && (
                  <span className="flex items-center gap-1 font-mono text-slate-300">
                    <Phone size={13} /> {formData.phone}
                  </span>
                )}
                {formData.district && (
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin size={13} /> {formData.district}
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#0e1424] border border-amber-500/20 shadow-lg">
            <span className="text-xs text-slate-400 font-medium">ফিকহ ১ম পত্র</span>
            <div className="text-xl font-black text-amber-400 mt-1">১২টি প্রশ্ন</div>
            <span className="text-[10px] text-slate-500">সম্পূর্ণ প্রস্তুত</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e1424] border border-amber-500/20 shadow-lg">
            <span className="text-xs text-slate-400 font-medium">বালাগাত ও মানতিক</span>
            <div className="text-xl font-black text-amber-400 mt-1">১৯টি প্রশ্ন</div>
            <span className="text-[10px] text-slate-500">সম্পূর্ণ প্রস্তুত</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e1424] border border-emerald-500/20 shadow-lg">
            <span className="text-xs text-slate-400 font-medium">সংরক্ষিত প্রশ্ন</span>
            <div className="text-xl font-black text-emerald-400 mt-1">{stats.bookmarksCount} টি</div>
            <span className="text-[10px] text-slate-500">বুকমার্ক করা</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e1424] border border-yellow-500/20 shadow-lg">
            <span className="text-xs text-slate-400 font-medium">পরীক্ষা লক্ষ্য</span>
            <div className="text-sm font-black text-yellow-400 mt-2 flex items-center gap-1">
              <Award size={16} className="text-amber-400" />
              <span>জিপিএ ৫.০০</span>
            </div>
            <span className="text-[10px] text-slate-500">আলিম ২০২৬</span>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                <span>ব্যক্তিগত ও শিক্ষা সংক্রান্ত তথ্য</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                আপনার প্রয়োজনীয় তথ্যগুলো আপডেট করুন। এটি ফায়ারবেজ ও আপনার ডিভাইসে সংরক্ষিত থাকবে।
              </p>
            </div>
          </div>

          {/* Success Toast Banner */}
          {saveSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>আপনার প্রোফাইল তথ্য সফলভাবে সংরক্ষিত হয়েছে!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  সম্পূর্ণ নাম *
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="আপনার নাম লিখুন..."
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  জিমেইল আইডি (ভেরিফাইড)
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-400 cursor-not-allowed font-sans"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  মোবাইল নম্বর
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  মাদরাসার নাম *
                </label>
                <div className="relative">
                  <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="madrasah"
                    value={formData.madrasah}
                    onChange={handleChange}
                    required
                    placeholder="যেমন: ঢাকা আলিয়া মাদরাসা"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  জেলা / শহর
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="যেমন: ঢাকা / চট্টগ্রাম"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  আলিম বিভাগ
                </label>
                <select
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl py-3 px-3 text-sm text-white focus:outline-none transition-colors"
                >
                  <option value="সাধারণ বিভাগ">সাধারণ বিভাগ</option>
                  <option value="মুজাব্বিদ বিভাগ">মুজাব্বিদ বিভাগ</option>
                  <option value="বিজ্ঞান বিভাগ">বিজ্ঞান বিভাগ</option>
                  <option value="হিফজুল কুরআন বিভাগ">হিফজুল কুরআন বিভাগ</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  রোল নম্বর (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  placeholder="যেমন: ১২৩৪৫৬"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                আপনার আলিম ২০২৬ পরীক্ষার লক্ষ্য
              </label>
              <input
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="যেমন: আলিম পরীক্ষায় সর্বোচ্চ ফলাফল ও জিপিএ ৫.০০ অর্জন"
                className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <Save size={16} />
                <span>{isLoading ? 'সংরক্ষণ হচ্ছে...' : 'তথ্য সংরক্ষণ করুন'}</span>
              </button>
            </div>

          </form>
        </div>

        {/* Quick Links Section */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            to="/alim/fiqh-1st-paper"
            className="p-5 rounded-2xl bg-[#0e1424] border border-slate-800 hover:border-amber-500/40 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-all">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-400">ফিকহ ১ম পত্র পড়ুন</h4>
                <p className="text-xs text-slate-400">কিতাবুল হজ্জ থেকে উদহিয়্যাহ</p>
              </div>
            </div>
            <ArrowLeft size={16} className="rotate-180 text-slate-500 group-hover:text-amber-400" />
          </Link>

          <Link
            to="/alim/balagat-and-mantiq"
            className="p-5 rounded-2xl bg-[#0e1424] border border-slate-800 hover:border-amber-500/40 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-all">
                <Layers size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-400">বালাগাত ও মানতিক পড়ুন</h4>
                <p className="text-xs text-slate-400">১৯টি পূর্ণাঙ্গ প্রশ্ন ও ছক</p>
              </div>
            </div>
            <ArrowLeft size={16} className="rotate-180 text-slate-500 group-hover:text-amber-400" />
          </Link>
        </div>

      </main>
    </div>
  );
}
