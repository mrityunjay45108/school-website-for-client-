"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, BookOpen, GraduationCap, Users, PhoneCall, 
  MessageCircle, MapPin, Search, ChevronRight, PlayCircle,
  Award, MonitorPlay, FlaskConical, Library, Bus, ShieldCheck, Trophy,
  Briefcase, Laptop, Mic, FileText, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ----------------------------------------------------------------------
// 1. ANNOUNCEMENT BAR
// ----------------------------------------------------------------------
const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-2 overflow-hidden flex items-center relative z-50 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between text-xs md:text-sm">
        <div className="flex gap-4 overflow-hidden whitespace-nowrap w-full">
          <motion.div 
            animate={{ x: [0, -1500] }} 
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex gap-10 min-w-full font-medium tracking-wide"
          >
            <span className="flex items-center gap-2 text-yellow-300"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Admissions Open 2026-27 (School & Coaching)</span>
            <span>⭐ Medhavi Scholarship Test on 15th Oct</span>
            <span className="text-blue-200">📢 New Batch for Intermediate (Arts/Science/Commerce) Starts Soon</span>
            <span className="flex items-center gap-2 text-yellow-300"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Admissions Open 2026-27 (School & Coaching)</span>
            <span>⭐ Medhavi Scholarship Test on 15th Oct</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. PREMIUM NAVBAR
// ----------------------------------------------------------------------
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-blue-500/30">S</div>
          <div>
            <h1 className={`font-extrabold text-xl tracking-tight leading-tight ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>Shiksha Prabhat</h1>
            <p className={`text-[10px] uppercase tracking-widest font-bold ${scrolled ? 'text-blue-600 dark:text-blue-400' : 'text-blue-200'}`}>Education Hub</p>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          {["School", "Coaching", "Courses", "Toppers", "Study Material", "Gallery", "Contact"].map((item) => (
            <Link key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className={`text-sm font-semibold hover:text-blue-500 transition-colors ${scrolled ? 'text-slate-600 dark:text-slate-300' : 'text-slate-100'}`}>
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admission">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 border border-blue-400/20">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// ----------------------------------------------------------------------
// 3. MAIN COMPONENT (PAGE)
// ----------------------------------------------------------------------
export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white">
      <AnnouncementBar />
      <Navbar />

      {/* ----------------- DUAL HERO SECTION ----------------- */}
      <section className="relative min-h-[100vh] pt-32 pb-20 flex items-center overflow-hidden">
        {/* Animated Aurora Background */}
        <div className="absolute inset-0 bg-[#0B1120] z-0">
          <motion.div style={{ y }} className="w-full h-full absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
              alt="Campus" 
              className="w-full h-full object-cover object-center filter blur-md scale-110 mix-blend-overlay"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/80 via-[#0B1120]/60 to-[#0B1120] z-10" />
          
          {/* Animated Gradient Orbs */}
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute -top-[10%] left-[0%] w-[40vw] h-[40vw] rounded-full bg-blue-600/30 blur-[120px] z-10" />
          <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute top-[30%] right-[0%] w-[50vw] h-[50vw] rounded-full bg-purple-600/20 blur-[150px] z-10" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <div className="text-center mb-16 max-w-4xl mx-auto pt-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center rounded-full bg-white/5 px-6 py-2 text-sm font-semibold text-blue-200 border border-white/10 backdrop-blur-md mb-6 shadow-2xl">
                School • Coaching • Graduation • Competitive Success
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-50 to-blue-200 drop-shadow-sm leading-[1.1]">
                One Campus, One Destination <br className="hidden md:block"/> for Quality Education
              </h1>
              <p className="text-lg md:text-xl text-blue-100/80 mb-10 font-medium tracking-wide max-w-3xl mx-auto leading-relaxed">
                From Nursery to Graduation Honours & Competitive Exam Preparation. Join Shiksha Prabhat Public School & Coaching Institute to build your brighter future.
              </p>
            </motion.div>
          </div>
          
          {/* Dual Split Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* School Card */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 p-1 flex flex-col shadow-[0_0_40px_rgba(37,99,235,0.15)] hover:shadow-[0_0_60px_rgba(37,99,235,0.25)] transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="bg-slate-900/40 rounded-[22px] p-8 md:p-10 flex-1 relative z-10 border border-white/5">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-400/20 backdrop-blur-md shadow-inner">
                  <GraduationCap className="text-blue-300" size={32} />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-2">School Education</h2>
                <p className="text-blue-200/70 mb-6 font-medium">BSEB Affiliated (Nursery to Class 10)</p>
                
                <ul className="space-y-4 mb-10">
                  {["Smart Interactive Classes", "Modern Library & Playgrounds", "Safe Campus & Uniform", "Experienced School Faculty"].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-200">
                      <CheckCircle2 className="text-blue-400 shrink-0" size={20} /> <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full py-4 bg-white text-blue-900 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group/btn mt-auto">
                  School Admission <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Coaching Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 p-1 flex flex-col shadow-[0_0_40px_rgba(147,51,234,0.15)] hover:shadow-[0_0_60px_rgba(147,51,234,0.25)] transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="bg-slate-900/40 rounded-[22px] p-8 md:p-10 flex-1 relative z-10 border border-white/5">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-400/20 backdrop-blur-md shadow-inner">
                  <BookOpen className="text-purple-300" size={32} />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-2">Coaching Institute</h2>
                <p className="text-purple-200/70 mb-6 font-medium">Higher Studies & Competitive Exams</p>
                
                <ul className="space-y-4 mb-10">
                  {["Intermediate (Arts/Science/Commerce)", "Graduation Honours (B.A/B.Sc/B.Com)", "Competitive Exams (BPSC/SSC/Banking)", "Spoken English & Computer Classes"].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-200">
                      <CheckCircle2 className="text-purple-400 shrink-0" size={20} /> <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group/btn mt-auto border border-purple-400/30">
                  Join Coaching <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------- 6 PREMIUM CATEGORIES (EDUCATION PROGRAMS) ----------------- */}
      <section className="py-24 bg-white dark:bg-slate-950 relative border-t border-slate-100 dark:border-slate-800" id="courses">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-3">Education Programs</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Everything Under One Roof</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { title: "School Education", icon: Users, color: "blue", desc: "Nursery to Class 10 (BSEB). Smart interactive learning foundation." },
              { title: "Intermediate", icon: BookOpen, color: "purple", desc: "Arts, Science, and Commerce streams with expert subject faculty." },
              { title: "Graduation Honours", icon: GraduationCap, color: "pink", desc: "B.A, B.Sc, B.Com Honours coaching with detailed university notes." },
              { title: "Competitive Prep", icon: ShieldCheck, color: "orange", desc: "BPSC, SSC, Railway, Banking, NDA, CTET, STET, CUET preparation." },
              { title: "Computer Education", icon: Laptop, color: "emerald", desc: "Basic Computer, MS Office, Tally, Web Development, Programming." },
              { title: "Spoken English", icon: Mic, color: "sky", desc: "Beginner to Advanced Spoken English & Personality Development." }
            ].map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg bg-${cat.color}-500 bg-gradient-to-br from-${cat.color}-500 to-${cat.color}-600`}>
                  <cat.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{cat.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{cat.desc}</p>
                <Link href="#" className={`inline-flex items-center font-bold text-${cat.color}-600 dark:text-${cat.color}-400 group-hover:gap-3 gap-2 transition-all`}>
                  Explore Courses <ArrowRight size={18} />
                </Link>
                <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-${cat.color}-500/5 dark:bg-${cat.color}-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- WHY STUDY WITH US (Split Features) ----------------- */}
      <section className="py-24 bg-slate-50 dark:bg-[#0B1120] relative">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Why Study With Us?</h3>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* School Features */}
            <div className="flex-1 bg-white dark:bg-slate-900 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <h4 className="text-3xl font-bold mb-8 relative z-10 flex items-center gap-3"><span className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600"><GraduationCap size={24}/></span> School Features</h4>
              <ul className="space-y-6 relative z-10">
                {[
                  { title: "BSEB Curriculum", desc: "Strictly following Bihar board guidelines" },
                  { title: "Experienced Teachers", desc: "Highly qualified educators" },
                  { title: "Smart Classes", desc: "Interactive digital learning tools" },
                  { title: "Library & Labs", desc: "Modern science lab and rich library" }
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg text-blue-600"><CheckCircle2 size={20}/></div>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white text-lg">{f.title}</h5>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coaching Features */}
            <div className="flex-1 bg-gradient-to-br from-indigo-900 to-purple-900 p-10 rounded-[2rem] border border-indigo-500/30 shadow-xl relative overflow-hidden group text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <h4 className="text-3xl font-bold mb-8 relative z-10 flex items-center gap-3"><span className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10"><BookOpen size={24}/></span> Coaching Features</h4>
              <ul className="space-y-6 relative z-10">
                {[
                  { title: "Daily Practice Tests", desc: "Regular evaluation to track progress" },
                  { title: "Notes & PDF Materials", desc: "Premium study material by experts" },
                  { title: "Doubt Classes", desc: "Special 1-on-1 doubt clearing sessions" },
                  { title: "Small Batch Size", desc: "Personalized attention to every student" }
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-purple-500/30 border border-purple-400/30 p-2 rounded-lg text-purple-200"><CheckCircle2 size={20}/></div>
                    <div>
                      <h5 className="font-bold text-white text-lg">{f.title}</h5>
                      <p className="text-indigo-200 text-sm mt-1">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- STUDY MATERIAL & TEST SERIES BANNER ----------------- */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Study Material */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-white">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/30"><FileText size={28}/></div>
              <h3 className="text-2xl font-bold mb-3">Download Study Material</h3>
              <p className="text-blue-100 mb-6">Get access to premium PDF notes, assignments, previous year question papers, and recorded video classes.</p>
              <button className="bg-white text-blue-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all w-full flex justify-center items-center gap-2">
                Access Library <ArrowRight size={18}/>
              </button>
            </div>
            
            {/* Test Series */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/20"><MonitorPlay size={28}/></div>
              <h3 className="text-2xl font-bold mb-3">Online Test Series</h3>
              <p className="text-slate-300 mb-6">Participate in class tests, weekly mock exams, and competitive quizzes. Check your real-time leaderboard ranking.</p>
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:-translate-y-1 transition-all w-full flex justify-center items-center gap-2 border border-blue-400/30">
                Start Mock Test <ArrowRight size={18}/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- MEDHAVI TOPPERS & SUCCESS WALL ----------------- */}
      <section className="py-24 bg-gradient-to-b from-amber-50 to-[#F8FAFC] dark:from-slate-900 dark:to-[#0B1120] relative overflow-hidden" id="toppers">
        {/* Decorative Gold Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 mb-6 shadow-lg shadow-amber-500/30">
              <Trophy className="text-white" size={32} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Medhavi Success Wall</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Celebrating the exceptional achievements of our School & Coaching Institute stars.</p>
          </div>
          
          {/* Dual Toppers Categories */}
          <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
            {/* School Toppers */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3 border-b-2 border-slate-200 dark:border-slate-800 pb-4"><GraduationCap className="text-blue-500"/> School Board Toppers</h3>
              <div className="space-y-6">
                {[
                  { name: "Priya Sharma", class: "Class 10th BSEB", marks: "96.4%", badge: "District Rank 2" },
                  { name: "Rahul Kumar", class: "Class 10th BSEB", marks: "94.2%", badge: "School Topper" }
                ].map((topper, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 flex items-center gap-6 group hover:-translate-y-1 transition-transform">
                    <div className="w-20 h-20 rounded-full border-4 border-yellow-400 overflow-hidden shrink-0">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topper.name}`} className="w-full h-full bg-slate-100" alt="Student" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">{topper.name}</h4>
                      <p className="text-sm text-slate-500 mb-2">{topper.class}</p>
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400 rounded-lg text-xs font-bold">{topper.badge}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-500 to-amber-600">{topper.marks}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coaching Toppers */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3 border-b-2 border-slate-200 dark:border-slate-800 pb-4"><Briefcase className="text-purple-500"/> Coaching Success Stories</h3>
              <div className="space-y-6">
                {[
                  { name: "Amit Singh", class: "BPSC Pre Qualified", marks: "Selected", badge: "Govt Job" },
                  { name: "Neha Verma", class: "Class 12th Science", marks: "91.8%", badge: "State Rank 15" }
                ].map((topper, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 flex items-center gap-6 group hover:-translate-y-1 transition-transform">
                    <div className="w-20 h-20 rounded-full border-4 border-purple-400 overflow-hidden shrink-0">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topper.name}`} className="w-full h-full bg-slate-100" alt="Student" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">{topper.name}</h4>
                      <p className="text-sm text-slate-500 mb-2">{topper.class}</p>
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 rounded-lg text-xs font-bold">{topper.badge}</span>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br ${topper.marks === 'Selected' ? 'from-emerald-500 to-green-600' : 'from-purple-500 to-indigo-600'}`}>{topper.marks}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- ADMISSION BANNER ----------------- */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-blue-900/90 mix-blend-multiply z-10" />
           <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070" className="w-full h-full object-cover filter blur-sm" alt="Campus"/>
        </div>
        <div className="container mx-auto px-6 relative z-20 text-center max-w-4xl text-white">
          <div className="mb-6 inline-flex rounded-full bg-red-600 px-6 py-2 text-sm font-bold uppercase tracking-widest animate-pulse border border-red-400">
            Admissions Open 2026–27
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Secure Your Child's Future Today</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-blue-200 mb-2">School Admission</h3>
              <p>Nursery to Class 10 (BSEB). Complete holistic development with smart classes.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-purple-200 mb-2">Coaching Admission</h3>
              <p>Intermediate • Graduation Honours • Competitive Exams • Spoken English.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold shadow-2xl hover:-translate-y-1 transition text-lg flex justify-center items-center gap-2">
               Apply For School
             </button>
             <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full font-bold shadow-2xl border border-purple-400/30 hover:-translate-y-1 transition text-lg flex justify-center items-center gap-2">
               Join Coaching
             </button>
          </div>
        </div>
      </section>

      {/* ----------------- DEVELOPER FOOTER ----------------- */}
      <footer className="bg-[#0B1120] text-slate-300 py-16 border-t border-slate-800">
        <div className="container mx-auto px-6 md:px-12">
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-slate-500">© 2026 Shiksha Prabhat Public School & Coaching. All rights reserved.</p>
            
            {/* Professional Developer Credit Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-800/80 transition-colors max-w-sm w-full md:w-auto shadow-lg shadow-black/50">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mrityunjay" alt="Developer" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1">Design & Developed By</p>
                <h4 className="text-white font-bold text-sm">Mrityunjay Kumar</h4>
                <div className="flex gap-3 mt-1 text-slate-400">
                  <Link href="https://www.linkedin.com/in/mrityunjay-kumar-8480842a5" className="hover:text-blue-400 transition text-xs">LinkedIn</Link>
                  <span>•</span>
                  <Link href="https://github.com/mrityunjay45108" className="hover:text-blue-400 transition text-xs">GitHub</Link>
                  <span>•</span>
                  <Link href="mailto:kumarmrityunjay5210@gmail.com" className="hover:text-blue-400 transition text-xs">Email</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
