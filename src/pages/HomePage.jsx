import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  FileText
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
      boxShadow: '0 0 20px rgba(212, 160, 23, 0.45)'
    }}
  >
    <svg viewBox="0 0 100 100" className="w-[70%] h-[70%]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 50 15 C 69.33 15 85 30.67 85 50 C 85 64.5 76 77 63 82.5 C 60 83.8 56.5 81.5 56.5 78 C 56.5 75.5 58 73.5 60.5 72.3 C 71 67.5 77 58 77 50 C 77 35.1 64.9 23 50 23 C 35.1 23 23 35.1 23 50 C 23 64.9 35.1 77 50 77 C 52.8 77 55 79.2 55 82 C 55 84.8 52.8 87 50 87 C 29.56 87 13 70.44 13 50 C 13 29.56 29.56 15 50 15 Z"
        fill="#111111"
      />
      <path
        d="M 37 36 C 37 33.8 38.8 32 41 32 H 52 C 60.8 32 68 39.2 68 48 C 68 56.8 60.8 64 52 64 H 45 V 82 C 45 84.2 43.2 86 41 86 C 38.8 86 37 84.2 37 82 V 36 Z M 45 40 V 56 H 52 C 56.4 56 60 52.4 60 48 C 60 43.6 56.4 40 52 40 H 45 Z"
        fill="#111111"
      />
    </svg>
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

        {/* Ribbon & Badge */}
        <div>
          <div
            className="w-[120%] -ml-6 py-2 px-6 my-2 text-center shadow-md relative overflow-hidden"
            style={{ background: 'linear-gradient(90deg, #111111 0%, #1c1c1c 50%, #111111 100%)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500" />
            <p className="text-xs font-bold text-amber-400 flex items-center justify-center gap-2">
              <span>পরিকল্পিত প্রস্তুতি</span>
              <span className="text-white">•</span>
              <span>সর্বোচ্চ সাফল্য</span>
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500" />
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 text-[11px] text-gray-700 font-semibold border-t border-gray-200">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-black text-amber-400 flex items-center justify-center font-bold text-[9px]">eP</div>
              <span>প্রস্তুতকারক: এলিট টিম</span>
            </div>
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold">২০২৬ সংস্করণ</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  // Features List verbatim from User's Banner
  const featuresList = [
    {
      icon: BookOpen,
      title: "অভিজ্ঞতাভিত্তিক স্মার্ট সাজেশন",
      desc: "আলিম পরীক্ষা ২০২৬-এর জন্য অভিজ্ঞতার আলোকে প্রস্তুতকৃত নির্বাচিত ও পরিকল্পিত চিক সেশন।"
    },
    {
      icon: CheckCircle2,
      title: "পূর্ণাঙ্গ ও মানসম্মত উত্তরপত্র",
      desc: "প্রতিটি সাজেশনের সাথে থাকবে পূর্ণাঙ্গ ও মানসম্মত উত্তরপত্র, যা কার্যকর প্রস্তুতিতে সহায়ক।"
    },
    {
      icon: Target,
      title: "অধিক সম্ভাবনাময় প্রশ্ন নির্বাচন",
      desc: "গুরুত্বপূর্ণ, অধিক সম্ভাবনাময় ও বারবার আসা প্রশ্নসমূহ বাছাই করে স্মার্ট প্রস্তুতি নিশ্চিত করা হয়েছে।"
    },
    {
      icon: Clock,
      title: "Final Short Suggestion",
      desc: "পরীক্ষার পূর্ব মুহূর্তে সর্বোচ্চ রিভিশনের জন্য প্রদান করা হবে Final Short Suggestion।"
    },
    {
      icon: MessageCircle,
      title: "Private WhatsApp Support Group",
      desc: "পরীক্ষার শেষ দিন পর্যন্ত থাকবে Private WhatsApp Support Group-এ ধারাবাহিক গাইডলাইন, আপডেট ও প্রয়োজনীয় সহায়তা।"
    },
    {
      icon: Headphones,
      title: "দ্রুত ও নির্ভরযোগ্য প্রাইভেট সাপোর্ট",
      desc: "পড়াশোনাজনিত যেকোনো সমস্যা, প্রশ্ন বা দ্বিধার ক্ষেত্রে থাকবে দ্রুত ও নির্ভরযোগ্য প্রাইভেট সাপোর্ট।"
    }
  ];

  // Upgraded Study Series Data with Pills and Glow Effect
  const studySeries = [
    {
      id: "fiqh-1st",
      titleBn: "ফিকহ প্রথম পত্র",
      titleAr: "الفقه - الورقة الأولى",
      status: "active",
      badge: "উন্মুক্ত ও প্রস্তুত",
      description: "কিতাবুল হজ্জ, কিতাবুন নিকাহ, কিতাবুত তালাক, কিতাবুজ জিহাদ সহ মোট ৭টি মৌলিক অধ্যায়ের বিস্তারিত প্রশ্নোত্তর, ইমামদের মতামত ও দলীলসমূহ।",
      pills: ["১২+ বিশদ প্রশ্ন", "৭টি অধ্যায়", "২৪টি পার্থক্য ছক", "ইমামদের মতপার্থক্য", "কুইজ টেস্ট"],
      link: "/alim/fiqh-1st-paper",
      available: true,
      glow: true
    },
    {
      id: "balagat-mantiq",
      titleBn: "বালাগাত ও মানতিক",
      titleAr: "البلاغة والمنطق",
      status: "active",
      badge: "উন্মুক্ত ও প্রস্তুত",
      description: "আলিম পরীক্ষার বালাগাত (১০টি প্রশ্ন) ও মানতিক (৯টি প্রশ্ন) অংশের সকল মৌলিক প্রশ্ন, دروس البلاغة ও المرقاة-এর সংজ্ঞা এবং আরবী এবারতসহ পূর্ণাঙ্গ উত্তরপত্র।",
      pills: ["১৯টি বিশদ প্রশ্ন", "বালাগাত ও মানতিক পর্ব", "দরূসুল বালাগাহ ও মিরকাত", "কুইজ টেস্ট"],
      link: "/alim/balagat-and-mantiq",
      available: true,
      glow: true
    },
    {
      id: "quran-tajweed",
      titleBn: "কুরআন মাজীদ ও তাজভীদ",
      titleAr: "القرآن المجيد والتجويد",
      status: "upcoming",
      badge: "শীঘ্রই আসছে",
      description: "নির্বাচিত সূরাসমূহের শানে নুযূল, তাফসীর ও তাজভীদের নিয়মাবলি সংবলিত বিশেষ প্র্যাকটিস মডিউল।",
      pills: ["শানে নুযূল", "শব্দার্থ ও তাফসীর", "তাজভীদ রুলস", "পরীক্ষার কমন প্রশ্ন"],
      link: "#",
      available: false,
      glow: false
    },
    {
      id: "hadith-usul",
      titleBn: "হাদীস ও উসূলে হাদীস",
      titleAr: "الحديث وأصول الحديث",
      status: "upcoming",
      badge: "শীঘ্রই আসছে",
      description: "মিশকাতুল মাসাবীহ থেকে নির্বাচিত হাদীসসমূহের সনদ, মতন ও বিস্তারিত ফিকহী ব্যাখ্যা নোট।",
      pills: ["সনদ ও মতন", "রাবীদের পরিচয়", "ফিকহী বিশ্লেষণ", "রিভিশন শিট"],
      link: "#",
      available: false,
      glow: false
    }
  ];

  // Interactive FAQs for Alim Students
  const faqList = [
    {
      q: "এলিট প্রিপারেশনের সাজেশনের বাইরে কি অন্য কিছু পড়ার প্রয়োজন হবে?",
      a: "আমাদের সাজেশনটি অভিজ্ঞ শিক্ষকদের মাধ্যমে বিগত বছরের বোর্ড প্রশ্ন, গুরুত্বপূর্ণ অধ্যায় এবং অধিক সম্ভাবনাময় প্রশ্নসমূহ বিশ্লেষণ করে প্রস্তুত করা হয়েছে। প্রতিটি প্রশ্নের সাথেই পূর্ণাঙ্গ ও মানসম্মত উত্তর সংযুক্ত থাকায় এই নোটগুলো ভালোভাবে আয়ত্ত করলে অতিরিক্ত কোনো গাইডের প্রয়োজন হবে না।"
    },
    {
      q: "প্রাইভেট WhatsApp Support Group-এ কীভাবে যুক্ত হব?",
      a: "আমাদের দেওয়া যেকোনো নম্বরে (01618-788802) সরাসরি হোয়াটসঅ্যাপে মেসেজ দিয়ে আপনার নাম ও মাদরাসার নাম পাঠালেই আপনাকে ভেরিফাই করে প্রাইভেট সাপোর্ট গ্রুপে যুক্ত করে নেওয়া হবে।"
    },
    {
      q: "সাজেশনে কি আরবী এবারত ও দলীলসহ পূর্ণাঙ্গ উত্তর রয়েছে?",
      a: "হ্যাঁ! ফিকহ ও অন্যান্য বিষয়ের প্রতিটি প্রশ্নের উত্তরে কিতাব ও হাদিসের মূল আরবী এবারত, শাব্দিক ও পারিভাষিক অর্থ, এবং চার ইমামের বিস্তারিত দলীল ও মতপার্থক্য সুন্দর ছক ও পয়েন্ট আকারে উপস্থাপন করা হয়েছে।"
    },
    {
      q: "Final Short Suggestion কখন এবং কীভাবে প্রদান করা হবে?",
      a: "পরীক্ষার ঠিক পূর্ব মুহূর্তে সর্বোচ্চ দ্রুত ও কার্যকরী রিভিশনের জন্য আমাদের প্রাইভেট হোয়াটসঅ্যাপ গ্রুপে এক্সক্লুসিভ Final Short Suggestion শিট প্রদান করা হবে।"
    },
    {
      q: "বালাগাত ও মানতিক সহ অন্যান্য বিষয়ের নোটগুলো কবে থেকে পড়তে পারব?",
      a: "ফিকহ প্রথম পত্র এবং বালাগাত ও মানতিক—উভয় বিষয়ের সম্পূর্ণ ১৯+১২টি বিশদ প্রশ্নোত্তর এখন সরাসরি প্ল্যাটফর্মে সম্পূর্ণ উন্মুক্ত ও পাঠযোগ্য। অন্যান্য বিষয়সমূহও ক্রমান্বয়ে যুক্ত হচ্ছে।"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 selection:bg-amber-400 selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Background High-Tech Mesh Dots & Radial Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. NAVBAR (নেভবার) */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0f17]/85 border-b border-amber-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Name */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <BrandLogo size={46} />
              <div>
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                    Elite
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-amber-400">
                    Preparation
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs tracking-wider text-amber-400/80 font-semibold uppercase">
                  Your Success, Our Commitment
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
              <a href="#features" className="hover:text-amber-400 transition-colors">আমাদের বৈশিষ্ট্য</a>
              <a href="#series" className="hover:text-amber-400 transition-colors">স্টাডি সিরিজ</a>
              <a href="#faq" className="hover:text-amber-400 transition-colors">সাধারণ জিজ্ঞাসা</a>
              <a href="#support" className="hover:text-amber-400 transition-colors">প্রাইভেট সাপোর্ট</a>
            </div>

            {/* CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/alim/fiqh-1st-paper"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                <BookOpen size={16} />
                <span>ফিকহ ১ম পত্র</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
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
              <Link
                to="/alim/fiqh-1st-paper"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold mt-2 shadow-lg"
              >
                <BookOpen size={18} />
                <span>ফিকহ ১ম পত্র পড়ুন</span>
              </Link>
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

              {/* Black Ribbon Strip */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-black via-zinc-950 to-black border border-amber-500/40 shadow-xl">
                <div className="p-1.5 rounded-lg bg-amber-500 text-black font-bold">
                  <BookOpen size={18} />
                </div>
                <span className="text-base sm:text-lg font-bold text-white">
                  এলিট প্রস্তুতি, <span className="text-amber-400">সাফল্যের নিশ্চয়তা</span>
                </span>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                অভিজ্ঞ শিক্ষক ও ফিকহ গবেষকদের পরিচালনায় আলিম ২০২৬ পরীক্ষার্থীদের জন্য প্রণীত 
                নির্বাচিত স্মার্ট সাজেশন, নির্ভুল উত্তরপত্র ও সার্বক্ষণিক প্রাইভেট সাপোর্ট।
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/alim/fiqh-1st-paper"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
                >
                  <BookOpen size={20} />
                  <span>ফিকহ ১ম পত্র পড়া শুরু করুন</span>
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="#series"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:border-amber-500/50 hover:text-amber-400 transition-all backdrop-blur-md"
                >
                  <Layers size={18} />
                  <span>স্টাডি সিরিজ দেখুন</span>
                </a>
              </div>

              {/* Metrics Counter */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center">
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-md">
                  <div className="text-2xl font-black text-amber-400">১০০%</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">মানসম্মত উত্তরপত্র</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-md">
                  <div className="text-2xl font-black text-amber-400">৭+</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">ফিকহ অধ্যায়</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-md">
                  <div className="text-2xl font-black text-amber-400">২৪/৭</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">প্রাইভেট গাইডলাইন</div>
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
      <section id="features" className="py-16 sm:py-24 bg-[#080c14] border-y border-amber-500/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-black border border-amber-500/40 shadow-lg">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-black text-white uppercase tracking-wider">আমাদের বৈশিষ্ট্যসমূহ</span>
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white">
              যে কারণে <span className="text-amber-400">এলিট প্রস্তুতি</span> সর্বাধিক কার্যকরী
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              আলিম পরীক্ষা ২০২৬-এ শতভাগ সাফল্যের নিশ্চয়তায় প্রতিটি মডিউল সুপরিকল্পিতভাবে তৈরি।
            </p>
          </div>

          {/* 6 Features Cards — Glassmorphic Dark Onyx */}
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

          {/* Promise Quote Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-black via-zinc-950 to-black border-2 border-amber-500/40 shadow-2xl text-center relative overflow-hidden">
            <div className="flex items-center justify-center gap-2 text-amber-400 mb-2">
              <Award size={20} />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">এলিট প্রিপারেশন অঙ্গীকার</span>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl font-black text-white max-w-4xl mx-auto leading-snug">
              "আমাদের লক্ষ্য শুধুমাত্র সাজেশন নয়, বরং পরিকল্পিত প্রস্তুতির মাধ্যমে শিক্ষার্থীর{' '}
              <span className="text-amber-400">সর্বোচ্চ সাফল্য নিশ্চিত করা।</span>"
            </p>
          </div>

        </div>
      </section>

      {/* 4. STUDY SERIES (স্টাডি সিরিজ) — UPGRADED CARDS WITH GLOW & PILLS */}
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
              আলিম পরীক্ষা ২০২৬-এর সকল বিষয়ের ধারাবাহিক স্মার্ট সিরিজ। প্রতিটি বিষয়ের ওপর পূর্ণাঙ্গ আলোচনা ও উত্তরপত্র ক্রমান্বয়ে যুক্ত হবে।
            </p>
          </div>

          {/* Upgraded Grid */}
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
                    className={`w-full py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      series.status === 'active'
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/25'
                        : 'bg-slate-800 text-amber-400 border border-amber-500/30 hover:bg-slate-700'
                    }`}
                  >
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

      {/* 5. INTERACTIVE FAQ ACCORDION (সাধারণ জিজ্ঞাসা) */}
      <section id="faq" className="py-16 sm:py-24 bg-[#080c14] border-t border-amber-500/15 relative">
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

      {/* 6. SUPPORT & PRIVATE GUIDELINE (সাপোর্ট — REFINED ONYX-GOLD GLASS THEME) */}
      <section id="support" className="py-16 sm:py-24 relative">
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
                এলিট প্রিপারেশনের সাথে যুক্ত শিক্ষার্থীদের জন্য রয়েছে সার্বক্ষণিক প্রাইভেট হোয়াটসঅ্যাপ গ্রুপ। 
                যেখানে পড়ালেখা সংক্রান্ত যেকোনো জটিলতা, আরবী এবারতের তারকীব, ফিকহী মাসআলার ব্যাখ্যা কিংবা সাজেশন রিভিশনে সরাসরি সাপোর্ট দেওয়া হয়।
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

            {/* Right Contact Card — Cohesive Onyx Glass Theme with Green WhatsApp Action */}
            <div className="lg:col-span-6">
              <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-2xl relative overflow-hidden text-center space-y-6">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500" />
                
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                  <MessageCircle size={32} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    প্রাইভেট গ্রুপে যুক্ত হতে যোগাযোগ করুন
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

      {/* 7. FOOTER (ফুটার) */}
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

            {/* Contact Info */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">যোগাযোগ ও সাপোর্ট</h4>
              <p className="text-xs text-slate-400">
                হোয়াটসঅ্যাপ সাপোর্ট: <span className="text-amber-400 font-bold"> 01618-788802</span>
              </p>
              <p className="text-xs text-slate-500">
                প্রাইভেট সাপোর্ট গ্রুপে যুক্ত হতে মেসেজ দিন।
              </p>
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