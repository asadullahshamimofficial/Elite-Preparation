import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  CheckCircle2,
  Target,
  Clock,
  MessageCircle,
  Headphones,
  Sparkles,
  ArrowRight,
  Phone,
  BookMarked,
  Award,
  GraduationCap,
  ChevronRight,
  ChevronDown,
  Layers,
  ShieldCheck,
  Star,
  Users,
  Send,
  HelpCircle,
  FileCheck,
  Zap,
  Flame,
  Menu,
  X,
  ScrollText,
  FileText,
  Lock,
  LogIn,
  LogOut,
  UserCheck,
  ShieldAlert
} from 'lucide-react';

// Brand Monogram Logo
const BrandLogo = ({ size = 44 }) => (
  <div
    className="relative flex items-center justify-center rounded-full shrink-0 shadow-lg"
    style={{
      width: size,
      height: size,
      background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #fff7db 45%, #ffd466 75%, #d4a017 100%)',
      border: '2px solid #ffffff',
      padding: '7px',
      boxShadow: '0 0 20px rgba(212, 160, 23, 0.45)'
    }}
  >
    <img src="https://i.ibb.co/NgFtF8WW/logo.png" alt="" />
  </div>
);

// 3D Realistic Book Illustration
const BookCover = () => (
  <div className="relative group select-none perspective-1000">
    <div className="relative w-64 sm:w-72 lg:w-80 h-[390px] sm:h-[430px] mx-auto transition-transform duration-500 transform group-hover:-rotate-y-6 group-hover:scale-105">
      {/* Background Ambient Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/25 via-yellow-400/35 to-amber-600/25 rounded-3xl blur-2xl -z-10 group-hover:opacity-100 transition-opacity opacity-75" />

      {/* Book Container */}
      <div
        className="w-full h-full rounded-r-2xl rounded-l-md p-6 flex flex-col justify-between relative shadow-2xl overflow-hidden border-t border-r border-b border-amber-300/40"
        style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f7f7f7 50%, #ededed 100%)',
          boxShadow: '18px 24px 45px rgba(0, 0, 0, 0.45), inset 4px 0 10px rgba(0,0,0,0.12)'
        }}
      >
        {/* Spine shadow line */}
        <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-gray-400/40 via-gray-200/20 to-transparent pointer-events-none" />

        {/* Top Header Note */}
        <div className="text-center pt-1">
          <p className="text-[11px] font-semibold text-gray-600 tracking-tight italic font-serif">
            আলিম ২০২৬ এর পরীক্ষার্থীদের জন্য বিশেষভাবে তৈরি...
          </p>
        </div>

        {/* Center Graphic */}
        <div className="my-auto flex flex-col items-center justify-center">
          <div className="w-24 h-24 mb-3 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-amber-400/15 rounded-full blur-md" />
            <svg className="w-20 h-20 text-gray-800" viewBox="0 0 64 64" fill="currentColor">
              <path d="M32 12C26 8 16 7 4 9v42c12-2 22-1 28 3 6-4 16-5 28-3V9c-12-2-22-1-28 3zm-2 36.5c-5.5-3-14.5-3.8-24-2.2V13.8c9.5-1.6 18.5-.8 24 2.2v32.5zm28-2.2c-9.5-1.6-18.5-.8-24 2.2V16c5.5-3 14.5-3.8 24-2.2v30.3z" opacity="0.85" />
              <path d="M12 22h14v3H12zm0 6h14v3H12zm0 6h14v3H12zm26-12h14v3H38zm0 6h14v3H38zm0 6h14v3H38z" opacity="0.6" fill="#D4A017" />
            </svg>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 text-center tracking-tight mb-1 font-serif">
            এলিট প্রিপারেশন
          </h3>
          <div className="text-base sm:text-lg font-extrabold text-amber-700 tracking-wide text-center">
            আলিম পরীক্ষা ২০২৬
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div className="space-y-1.5 pt-3 border-t border-gray-300/80">
          <div className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>ফিকহ ১ম পত্র পূর্ণাঙ্গ সমাধান</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>বালাগাত ও মানতিক (২১০) সম্পূর্ণ কোর্স</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>চার ইমামের দলীল ও বিস্তারিত ছক</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function HomePage() {
  const { user, isAuthenticated, isAdmin, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const featuresList = [
    {
      icon: BookOpen,
      title: "মূল কিতাবের নির্ভুল এবারত ও রেফারেন্স",
      desc: "আল-হিদায়া, কানযুদ্ দাকায়িক, ফাতহুল কাদীর, ক্বুদূরী, ও دروس البلاغة কিতাব থেকে সরাসরি আরবী মূল পাঠ ও নির্ভরযোগ্য বঙ্গানুবাদ।"
    },
    {
      icon: Target,
      title: "শতভাগ পরীক্ষাকেন্দ্রিক ও সর্বোচ্চ কমন প্রশ্ন",
      desc: "আলিম পরীক্ষার বিগত ১০ বছরের প্রশ্ন এনালাইসিস করে তৈরি শতভাগ সাজেস্টেড ও সম্ভাব্য রচনামূলক ও সংক্ষিপ্ত প্রশ্নমালা।"
    },
    {
      icon: Layers,
      title: "২৪টি তুলনামূলক মাসআলা ও পার্থক্য ছক",
      desc: "হজ্জ বনাম ওমরাহ, নিকাহ বনাম বায়, তালাকের স্তরভেদ ও শিকার-যবাইয়ের জটিল মাসআলাগুলো চমৎকার ছক আকারে উপস্থাপন।"
    },
    {
      icon: ShieldCheck,
      title: "ইমামগণের মতভেদ ও প্রামাণ্য দলীল",
      desc: "ইমাম আবু হানীফা (র), ইমাম শাফেয়ী (র), ইমাম মালেক (র) ও ইমাম আহমাদ (র)-এর মতপার্থক্য এবং কুরআন-হাদিসের অকাট্য দলীল।"
    },
    {
      icon: Flame,
      title: "বালাগাত ও মানতিক (২১০) পূর্ণাঙ্গ মডিউল",
      desc: "ইলমুল বালাগাহ ও ইলমুল মানতিকের ১৯টি গুরুত্বপূর্ণ প্রশ্নের আরবী এবারত, কিতাবের রেফারেন্স ও নির্ভুল সমাধান।"
    },
    {
      icon: Zap,
      title: "স্মার্ট রিডার, ডাবল অ্যাকর্ডিয়ন ও কুইজ",
      desc: "প্রশ্ন ও সেকশন ব্লক ক্লিক করে বন্ধ/খোলার সুবিধা, পিল ট্যাব ফিল্টার, বুকমার্কিং এবং প্রতিটি বিষয়ের ওপর স্বয়ংক্রিয় কুইজ পরীক্ষা।"
    }
  ];

  const studySeries = [
    {
      id: "fiqh-1",
      titleBn: "ফিকহ প্রথম পত্র",
      titleAr: "الفقه - الورقة الأولى",
      badge: "পূর্ণাঙ্গ লাইভ",
      status: "active",
      description: "কিতাবুল হজ্জ, কিতাবুন নিকাহ, কিতাবুত তালাক, কিতাবুজ জিহাদ, কিতাবুস সইদ, কিতাবুয যাবায়েহ এবং কিতাবুল উদহিয়্যাহ—সবগুলো অধ্যায়ের দলীলভিত্তিক সমাধান।",
      pills: ["হজ্জ", "নিকাহ", "তালাক", "জিহাদ", "শিকার", "যবাই", "কোরবানি"],
      link: "/alim/fiqh-1st-paper",
      available: true,
      glow: true
    },
    {
      id: "balagat",
      titleBn: "বালাগাত ও মানতিক (২১০)",
      titleAr: "البلاغة والمنطق",
      badge: "পূর্ণাঙ্গ লাইভ",
      status: "active",
      description: "বালাগাত পর্বের ১০টি এবং মানতিক পর্বের ৯টি—মোট ১৯টি গুরুত্বপূর্ণ প্রশ্নের মূল কিতাবভিত্তিক আরবী এবারত, অনুবাদ, সংজ্ঞা ও বিস্তারিত ছক।",
      pills: ["বালাগাত (১০)", "মানতিক (৯)", "দরূসুল বালাগাহ", "আল-মিরকাত", "শারহুত তাহযীব"],
      link: "/alim/balagat-and-mantiq",
      available: true,
      glow: true
    },
    {
      id: "hadith",
      titleBn: "হাদীস ও উসূলে হাদীস",
      titleAr: "الحديث وأصول الحديث",
      badge: "শীঘ্রই আসছে",
      status: "upcoming",
      description: "মিশকাতুল মাসাবীহ থেকে নির্বাচিত অধ্যায়সমূহের হাদিসের ব্যাখ্যা ও নুখবাতুল ফিকারের আলোকে উসূলে হাদিসের বিস্তারিত নোট।",
      pills: ["কিতাবুল ঈমান", "কিতাবুস্ সালাত", "মুস্তালাহুল হাদিস"],
      link: "#",
      available: false,
      glow: false
    },
    {
      id: "quran",
      titleBn: "কুরআন মাজীদ ও তাজভীদ",
      titleAr: "القرآن المجيد والتجويد",
      badge: "শীঘ্রই আসছে",
      status: "upcoming",
      description: "আলিম সিলেবাসভুক্ত সূরার তাফসির, শানে নুযূল, শব্দের তাহকীক ও তাজভীদের নিয়মাবলীর সুবিন্যস্ত গাইডলাইন।",
      pills: ["সূরা বাকারাহ", "সূরা আল ইমরান", "মাখরাজ ও সিফাত"],
      link: "#",
      available: false,
      glow: false
    }
  ];

  const faqList = [
    {
      q: "এলিট প্রিপারেশন কীভাবে আলিম পরীক্ষায় শতভাগ প্রস্তুতি নিশ্চিত করবে?",
      a: "আমাদের প্ল্যাটফর্মে সাধারণ সাজেশনের মতো কেবল প্রশ্ন তুলে ধরা হয়নি; বরং প্রতিটি প্রশ্নের মূল কিতাবভিত্তিক আরবী এবারত, বিশুদ্ধ বাংলা অনুবাদ, চার ইমামের দলীল, পার্থক্য ছক এবং প্রাসঙ্গিক মাসআলা একসাথে সুবিন্যস্ত করা হয়েছে।"
    },
    {
      q: "স্টাডি সিরিজ পড়ার জন্য কি কোনো ফি বা চার্জ দিতে হবে?",
      a: "না, আলিম ২০২৬ পরীক্ষার্থীদের সুবিধার্থে আমাদের প্ল্যাটফর্মের স্টাডি সিরিজগুলো উন্মুক্ত রয়েছে। শিক্ষার্থীদের সুবিধার্থে শুধুমাত্র মোবাইল নম্বর বা জিমেইল দিয়ে ভেরিফাই করে লগইন করলেই সম্পূর্ণ ফ্রি পড়া যাবে।"
    },
    {
      q: "বালাগাত ও মানতিক কোর্সটি কি পুরোপুরি কমপ্লিট?",
      a: "হ্যাঁ! বালাগাত পর্বের ১০টি এবং মানতিক পর্বের ৯টি—মোট ১৯টি সর্বোচ্চ গুরুত্বপূর্ণ প্রশ্ন মূল কিতাবের রেফারেন্সসহ সম্পূর্ণ লাইভ করা হয়েছে।"
    },
    {
      q: "প্রাইভেট সাপোর্ট হোয়াটসঅ্যাপ গ্রুপে কীভাবে যুক্ত হব?",
      a: "হোম পেজের নিচে ছেলেদের ও মেয়েদের জন্য পৃথক সুরক্ষিত হোয়াটসঅ্যাপ গ্রুপের সরাসরি লিংক দেওয়া রয়েছে। সেখানে ক্লিক করেই সহজে যুক্ত হওয়া যাবে।"
    }
  ];

  const handleStudySeriesClick = (e, series) => {
    if (!series.available) return;
    if (!isAuthenticated) {
      e.preventDefault();
      openAuthModal(series.link);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 1. TOP NAVBAR (নেভবার) */}
      <nav className="sticky top-0 z-40 bg-[#0d131f]/95 backdrop-blur-md border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <BrandLogo size={46} />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  এলিট প্রিপারেশন
                </span>
                <span className="text-[11px] font-bold text-amber-400 tracking-wider">
                  আলিম পরীক্ষা ২০২৬
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
              <a href="#features" className="text-slate-300 hover:text-amber-400 transition-colors">
                বৈশিষ্ট্যসমূহ
              </a>
              <a href="#series" className="text-slate-300 hover:text-amber-400 transition-colors">
                স্টাডি সিরিজ
              </a>
              <a href="#groups" className="text-slate-300 hover:text-amber-400 transition-colors">
                প্রাইভেট গ্রুপ
              </a>
              <a href="#faq" className="text-slate-300 hover:text-amber-400 transition-colors">
                সাধারণ জিজ্ঞাসা
              </a>
              <a href="#support" className="text-slate-300 hover:text-amber-400 transition-colors">
                সাপোর্ট
              </a>
            </div>

            {/* User Profile / Login & Admin CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 p-1.5 pl-3 rounded-2xl">
                  <Link to="/profile" className="flex flex-col text-left hover:opacity-80 transition-opacity">
                    <span className="text-xs font-bold text-white leading-tight flex items-center gap-1">
                      <span>{user?.name || 'শিক্ষার্থী'}</span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded">প্রোফাইল</span>
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">
                      {user?.phone || user?.email || (isAdmin ? 'এডমিন' : 'লগইনকৃত')}
                    </span>
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500 hover:text-black transition-all"
                    >
                      এডমিন প্যানেল
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    title="লগআউট"
                    className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <LogIn size={16} />
                  <span>লগইন করুন</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center gap-2">
              {!isAuthenticated && (
                <button
                  onClick={() => openAuthModal()}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-black"
                >
                  লগইন
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900/80 text-amber-400 border border-amber-500/30"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800 flex flex-col gap-2 backdrop-blur-xl bg-[#0b0f17]/95">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 font-medium"
              >
                আমাদের বৈশিষ্ট্য
              </a>
              <a
                href="#series"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 font-medium"
              >
                স্টাডি সিরিজ
              </a>
              <a
                href="#groups"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 font-medium"
              >
                প্রাইভেট হোয়াটসঅ্যাপ গ্রুপ
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 font-medium"
              >
                সাধারণ জিজ্ঞাসা (FAQ)
              </a>
              <a
                href="#support"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 font-medium"
              >
                প্রাইভেট সাপোর্ট
              </a>

              {isAuthenticated ? (
                <div className="p-3 bg-slate-900 rounded-xl space-y-2 mt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white font-bold">{user?.name}</span>
                    <button onClick={logout} className="text-rose-400 font-bold">লগআউট</button>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-2 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs"
                    >
                      এডমিন প্যানেল
                    </Link>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); openAuthModal(); }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold mt-2 shadow-lg"
                >
                  <LogIn size={18} />
                  <span>লগইন করুন</span>
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* 2. BANNER / HERO SECTION (ব্যানার) */}
      <section className="relative pt-10 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Gold Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>আলিম পরীক্ষা ২০২৬ — বিশেষ প্রস্তুতি প্ল্যাটফর্ম</span>
              </div>

              {/* Headlines */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  এলিট প্রিপারেশন
                </h1>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent leading-snug">
                  পরিকল্পিত প্রস্তুতি, সর্বোচ্চ সাফল্য
                </p>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                আলিম ২০২৬ পরীক্ষার্থীদের জন্য ফিকহ ১ম পত্র এবং বালাগাত ও মানতিক বিষয়ের সর্বোচ্চ কমন ও প্রামাণ্য দলীলভিত্তিক পূর্ণাঙ্গ স্মার্ট গাইডলাইন।
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                <a
                  href="#series"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-base bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
                >
                  <BookOpen size={20} />
                  <span>স্টাডি সিরিজ দেখুন</span>
                </a>

                <a
                  href="#groups"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base bg-slate-900/90 text-amber-400 border-2 border-amber-500/40 hover:bg-slate-800 hover:border-amber-400 transition-all"
                >
                  <Users size={20} />
                  <span>প্রাইভেট স্টাডি গ্রুপ</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black text-amber-400">৩১+</div>
                  <div className="text-xs text-slate-400">বিস্তারিত প্রশ্ন সমাধান</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black text-amber-400">২৪টি</div>
                  <div className="text-xs text-slate-400">তুলনামূলক ছক ও দলীল</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black text-amber-400">১০০%</div>
                  <div className="text-xs text-slate-400">কমন নিশ্চয়তা</div>
                </div>
              </div>

            </div>

            {/* Right 3D Book Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <BookCover />
            </div>

          </div>
        </div>
      </section>

      {/* 3. OUR FEATURES (আমাদের বৈশিষ্ট্যসমূহ) */}
      <section id="features" className="py-16 sm:py-24 bg-[#080c14] border-t border-amber-500/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>কেন আমরা অদ্বিতীয়</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white">
              যে কারণে <span className="text-amber-400">এলিট প্রস্তুতি</span> সর্বাধিক কার্যকরী
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              আলিম পরীক্ষা ২০২৬-এ শতভাগ সাফল্যের নিশ্চয়তায় প্রতিটি মডিউল সুপরিকল্পিতভাবে তৈরি।
            </p>
          </div>

          {/* 6 Features Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresList.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/5 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-all">
                      <IconComp size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <CheckCircle2 size={14} />
                    <span>এলিট স্ট্যান্ডার্ড নিশ্চয়তা</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. STUDY SERIES (স্টাডি সিরিজ) */}
      <section id="series" className="py-16 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Layers size={16} />
                <span>মডিউল ক্যাটালগ</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                এলিট <span className="text-amber-400">স্টাডি সিরিজ</span>
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              আলিম পরীক্ষা ২০২৬-এর সকল বিষয়ের ধারাবাহিক স্মার্ট সিরিজ। শুধুমাত্র লগইনকৃত শিক্ষার্থীদের জন্য উন্মুক্ত।
            </p>
          </div>

          {/* Grid of Study Series */}
          <div className="grid md:grid-cols-2 gap-8">
            {studySeries.map((series) => (
              <div
                key={series.id}
                className={`relative rounded-3xl p-6 sm:p-8 backdrop-blur-md bg-slate-900/70 border flex flex-col justify-between transition-all duration-300 group ${
                  series.glow
                    ? 'border-amber-500/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] ring-1 ring-amber-500/30'
                    : 'border-white/5 hover:border-amber-500/30 shadow-xl'
                }`}
              >
                <div>
                  {/* Top Status Header */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-2">
                      {series.status === 'active' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        series.status === 'active'
                          ? 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                          : 'bg-slate-800/80 text-slate-400 border-slate-700'
                      }`}>
                        {series.badge}
                      </span>
                    </div>

                    <span className="text-amber-400/80 font-serif text-sm font-medium">
                      {series.titleAr}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {series.titleBn}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                    {series.description}
                  </p>

                  {/* Horizontal Metadata Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {series.pills.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/80 text-amber-300/90 border border-slate-700/60"
                      >
                        • {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                {series.available ? (
                  <Link
                    to={series.link}
                    onClick={(e) => handleStudySeriesClick(e, series)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      series.status === 'active'
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/25'
                        : 'bg-slate-800 text-amber-400 border border-amber-500/30 hover:bg-slate-700'
                    }`}
                  >
                    {!isAuthenticated && <Lock size={16} />}
                    <span>{series.status === 'active' ? 'এখনই পড়া শুরু করুন' : 'মডিউল ভিউ করুন'}</span>
                    <ArrowRight size={18} />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 px-6 rounded-xl font-bold bg-slate-800/40 text-slate-500 border border-slate-800 cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span>শীঘ্রই উন্মুক্ত হবে</span>
                  </button>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. PRIVATE WHATSAPP GROUPS SECTION (আলিম ২০২৬ এর প্রাইভেট গ্রুপ লিংক) */}
      <section id="groups" className="py-16 sm:py-24 bg-[#080c14] border-t border-amber-500/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <MessageCircle size={16} />
              <span>এক্সক্লুসিভ স্টাডি কমিউনিটি</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white">
              আলিম ২০২৬ এর <span className="text-amber-400">প্রাইভেট গ্রুপ লিংক</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              পরীক্ষার্থীদের সুবিধার্থে ছেলে ও মেয়েদের জন্য সম্পূর্ণ পৃথক ও সুরক্ষিত হোয়াটসঅ্যাপ স্টাডি গ্রুপ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Boys WhatsApp Group Card */}
            <div className="p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border-2 border-amber-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-amber-400 transition-all">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5">
                    <Users size={14} /> ছেলেদের স্টাডি গ্রুপ
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                    সক্রিয় ব্যাচ
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                    👦 আলিম ২০২৬ — বয়েজ প্রাইভেট গ্রুপ
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    ফিকহ, বালাগাত-মানতিক সহ সকল বিষয়ের গুরুত্বপূর্ণ সাজেশন, হ্যান্ডনোট, প্রতিদিনের পড়া ও পরীক্ষা সংক্রান্ত সরাসরি আলোচনা।
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>নিয়মিত গুরুত্বপূর্ণ প্রশ্ন ও উত্তর শিট প্রদান</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>মেন্টর দ্বারা যেকোনো জটিল মাসআলার তাত্ক্ষণিক সমাধান</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>পরীক্ষার আগে স্পেশাল শর্ট সাজেশন ও দিকনির্দেশনা</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <a
                  href="https://chat.whatsapp.com/B8fQAmlWEeg96bNsnFHjiM"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-black text-base shadow-xl shadow-green-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5"
                >
                  <MessageCircle size={22} className="fill-black text-[#25D366]" />
                  <span>ছেলেদের গ্রুপে যোগ দিন</span>
                </a>
              </div>
            </div>

            {/* Girls WhatsApp Group Card */}
            <div className="p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-emerald-400 transition-all">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                    <ShieldCheck size={14} /> মেয়েদের প্রাইভেট গ্রুপ
                  </span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                    ১০০% প্রাইভেট ও নিরাপদ
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors">
                    🧕 আলিম ২০২৬ — গার্লস প্রাইভেট গ্রুপ
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    ছাত্রীদের জন্য সম্পূর্ণ স্বতন্ত্র ও নিরাপদ প্রাইভেট স্টাডি গ্রুপ। যেখানে পর্দা ও শালীনতা রক্ষা করে নিয়মিত পড়াশোনার সাপোর্ট দেওয়া হয়।
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>শুধুমাত্র আলিম ২০২৬ নারী শিক্ষার্থীদের জন্য সংরক্ষিত</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>বিশেষায়িত স্টাডি রুটিন ও এক্সক্লুসিভ নোটস</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>নিরাপদ পরিবেশে পড়ালেখা সংক্রান্ত প্রশ্নের উত্তর</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <a
                  href="https://chat.whatsapp.com/Ba9BCwyADzbKvrDiAfro3D"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-black text-base shadow-xl shadow-green-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5"
                >
                  <MessageCircle size={22} className="fill-black text-[#25D366]" />
                  <span>মেয়েদের গ্রুপে যোগ দিন</span>
                </a>
              </div>
            </div>

          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 font-medium">
              🔒 গ্রুপে যুক্ত হওয়ার পর প্রতিটি সদস্যকে ভেরিফাই করা হয়। কোনো প্রকার অপ্রাসঙ্গিক মেসেজ বা লিংক শেয়ার সম্পূর্ণ নিষিদ্ধ।
            </p>
          </div>

        </div>
      </section>

      {/* 6. INTERACTIVE FAQ ACCORDION (সাধারণ জিজ্ঞাসা) */}
      <section id="faq" className="py-16 sm:py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <HelpCircle size={14} />
              <span>সাধারণ জিজ্ঞাসা ও উত্তর</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              পরীক্ষার্থীদের <span className="text-amber-400">প্রয়োজনীয় তথ্যাবলি</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              এলিট প্রিপারেশন ও সাজেশন সংক্রান্ত সাধারণ প্রশ্নগুলোর স্পষ্ট উত্তর।
            </p>
          </div>

          {/* Accordion Container */}
          <div className="space-y-4">
            {faqList.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden backdrop-blur-md ${
                    isOpen
                      ? 'bg-slate-900/80 border-amber-500/50 shadow-lg shadow-amber-500/5'
                      : 'bg-slate-900/40 border-white/5 hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-base text-white"
                  >
                    <span>{faq.q}</span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-amber-500 text-black rotate-180' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. SUPPORT & CONTACT (সাপোর্ট) */}
      <section id="support" className="py-16 sm:py-24 bg-[#080c14] border-t border-amber-500/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <ShieldCheck size={16} />
                <span>এক্সক্লুসিভ প্রাইভেট সাপোর্ট সিস্টেম</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                পরীক্ষার শেষ দিন পর্যন্ত <br />
                <span className="text-amber-400">ধারাবাহিক প্রাইভেট সাপোর্ট</span>
              </h2>

              <p className="text-slate-300 leading-relaxed text-base">
                এলিট প্রিপারেশনের সাথে যুক্ত শিক্ষার্থীদের জন্য রয়েছে সার্বক্ষণিক প্রাইভেট সাপোর্ট। 
                পড়ালেখা সংক্রান্ত যেকোনো জটিলতা, আরবী এবারতের তারকীব, ফিকহী মাসআলার ব্যাখ্যা কিংবা সাজেশন রিভিশনে সরাসরি সাপোর্ট দেওয়া হয়।
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "পরীক্ষার শেষ দিন পর্যন্ত ধারাবাহিক গাইডলাইন ও রুটিন",
                  "যেকোনো প্রশ্নের তাৎক্ষণিক সমাধান ও নির্ভরযোগ্য নোট",
                  "পরীক্ষার পূর্ব মুহূর্তে এক্সক্লুসিভ Final Short Suggestion",
                  "প্রাইভেট স্টাডি গ্রুপে সরাসরি মেন্টরশিপ"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
                    <span className="text-slate-200 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Contact Card */}
            <div className="lg:col-span-6">
              <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-2xl relative overflow-hidden text-center space-y-6">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500" />
                
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                  <MessageCircle size={32} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    সরাসরি যোগাযোগ করুন
                  </h3>
                  <p className="text-sm text-slate-400">
                    আলিম ২০২৬-এর সর্বোচ্চ কমন সাজেশন ও সাপোর্টের জন্য সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন
                  </p>
                </div>

                {/* Direct Green WhatsApp Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/8801618788802"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-black text-base shadow-xl shadow-green-500/20 hover:scale-105 transition-all"
                  >
                    <MessageCircle size={20} className="fill-black text-[#25D366]" />
                    <span>01618-788802</span>
                  </a>
                </div>

                <p className="text-xs text-slate-500">
                  (কল বা হোয়াটসঅ্যাপ মেসেজ—যেকোনো মাধ্যমেই ২৪ ঘণ্টার মধ্যে রেসপন্স নিশ্চিত)
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. FOOTER (ফুটার) */}
      <footer id="contact" className="py-12 bg-[#080b12] border-t border-slate-900 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-12 gap-8 pb-10 border-b border-slate-900">
            {/* Brand Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <BrandLogo size={36} />
                <span className="text-xl font-black text-white">Elite Preparation</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                আলিম পরীক্ষা ২০২৬-এর সকল বিষয়ের পরিকল্পিত স্মার্ট প্রস্তুতি ও পূর্ণাঙ্গ গাইডলাইন প্ল্যাটফর্ম।
              </p>
              <p className="text-xs text-amber-400 font-semibold">
                পরিকল্পিত প্রস্তুতি • সর্বোচ্চ সাফল্য
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">স্টাডি সিরিজ</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/alim/fiqh-1st-paper" className="hover:text-amber-400 transition-colors">ফিকহ প্রথম পত্র</Link>
                </li>
                <li>
                  <Link to="/alim/balagat-and-mantiq" className="hover:text-amber-400 transition-colors">বালাগাত ও মানতিক</Link>
                </li>
                <li className="text-slate-600">কুরআন মাজীদ ও তাজভীদ (শীঘ্রই)</li>
                <li className="text-slate-600">হাদীস ও উসূলে হাদীস (শীঘ্রই)</li>
              </ul>
            </div>

            {/* WhatsApp Groups Links */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">প্রাইভেট স্টাডি গ্রুপ</h4>
              <div className="space-y-2 text-xs">
                <a
                  href="https://chat.whatsapp.com/B8fQAmlWEeg96bNsnFHjiM"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-amber-400 hover:underline"
                >
                  👦 ছেলেদের হোয়াটসঅ্যাপ গ্রুপ লিংক →
                </a>
                <a
                  href="https://chat.whatsapp.com/Ba9BCwyADzbKvrDiAfro3D"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-emerald-400 hover:underline"
                >
                  🧕 মেয়েদের হোয়াটসঅ্যাপ গ্রুপ লিংক →
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <p>© ২০২৬ Elite Preparation. সর্বস্বত্ব সংরক্ষিত।</p>
            <p>Designed with care for Alim 2026 Examinees</p>
          </div>

        </div>
      </footer>

      {/* Floating Quick WhatsApp Button */}
      <a
        href="https://wa.me/8801618788802"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-black font-bold shadow-2xl hover:scale-110 active:scale-95 transition-all"
        title="হোয়াটসঅ্যাপে যোগাযোগ করুন"
      >
        <MessageCircle size={20} className="fill-black text-[#25D366]" />
        <span className="hidden sm:inline text-xs font-black">WhatsApp</span>
      </a>

    </div>
  );
}