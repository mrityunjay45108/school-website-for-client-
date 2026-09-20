"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, BookOpen, GraduationCap, Users, PhoneCall, 
  MapPin, PlayCircle, Trophy, CheckCircle2, Search, FileText,
  Clock, Calendar, Award
} from "lucide-react";
import Link from "next/link";

// ----------------------------------------------------------------------
// 1. PREMIUM NAVBAR (Allen/PW Style)
// ----------------------------------------------------------------------
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">SP</div>
          <div>
            <h1 className={`font-black text-xl tracking-tight leading-none ${scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white drop-shadow-md'}`}>Shiksha Prabhat</h1>
            <p className={`text-[11px] uppercase tracking-wider font-bold ${scrolled ? 'text-orange-500' : 'text-orange-500 drop-shadow-sm'}`}>Institute</p>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          {["Home", "Courses", "Results", "Faculty", "Study Material", "Test Series", "Contact"].map((item) => (
            <Link key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className={`text-sm font-bold hover:text-blue-600 transition-colors ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-slate-800 dark:text-white drop-shadow-md'}`}>
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-slate-700 dark:text-white font-bold text-sm hover:text-blue-600">Login</button>
          <Link href="/admission">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5">
              Enroll Now
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* ----------------- COACHING HERO SECTION ----------------- */}
      <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Abstract Grid & Shapes */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }} transition={{ duration: 30, repeat: Infinity }} className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[100px] z-10" />
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute top-[40%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-orange-500/10 blur-[100px] z-10" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left pt-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-1.5 text-sm font-bold text-blue-700 dark:text-blue-400 mb-6 border border-blue-200 dark:border-blue-800">
                <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span> Admissions Open 2026
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1] text-slate-900 dark:text-white">
                Crack <span className="text-blue-600">JEE</span>, <span className="text-orange-500">NEET</span> & <br className="hidden lg:block"/> Competitive Exams
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 font-medium max-w-2xl mx-auto lg:mx-0">
                India's premier coaching institute for IIT-JEE, NEET, Foundation, UPSC, and CUET. Join Shiksha Prabhat and turn your dreams into AIR ranks.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-lg group">
                  Explore Courses <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 rounded-xl font-bold shadow-sm hover:border-blue-600 transition-all text-lg flex items-center justify-center gap-2">
                  <PlayCircle size={20} className="text-orange-500" /> Free Demo Class
                </button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-6 mt-10">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 z-${5-i}`}>
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Student${i}`} className="w-full h-full rounded-full" alt="student"/>
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-slate-600 dark:text-slate-400">
                  <span className="text-slate-900 dark:text-white text-lg font-black">50,000+</span><br/>Students Selected
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Image/Stats */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative z-10">
              {/* Main Image Placeholder */}
              <div className="w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-gradient-to-br from-blue-100 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20 rounded-[40px] border-8 border-white dark:border-slate-900 shadow-2xl overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" alt="Students learning" className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-overlay opacity-90"/>
              </div>
              
              {/* Floating Stat Card 1 */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -left-10 top-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center text-orange-600"><Trophy size={24}/></div>
                <div>
                  <div className="font-black text-xl">AIR 1</div>
                  <div className="text-xs text-slate-500 font-bold">JEE Advanced 2025</div>
                </div>
              </motion.div>
              
              {/* Floating Stat Card 2 */}
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute -right-6 bottom-32 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-600"><CheckCircle2 size={24}/></div>
                <div>
                  <div className="font-black text-xl">98%</div>
                  <div className="text-xs text-slate-500 font-bold">Success Rate</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------- COURSES (PW/Allen Style) ----------------- */}
      <section className="py-24 bg-white dark:bg-slate-900 relative" id="courses">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Our Top Courses</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">Expert-led batches designed to give you the ultimate competitive edge.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { title: "IIT-JEE (Main + Adv)", tag: "Target 2026", color: "blue", desc: "Complete physics, chemistry & math syllabus covered by top educators with regular mock tests.", fee: "₹45,000" },
              { title: "NEET (UG)", tag: "Droppers Batch", color: "green", desc: "Specialized batch for medical aspirants. In-depth biology, chemistry, and physics modules.", fee: "₹42,000" },
              { title: "Foundation (Class 9-10)", tag: "Pre-Nurture", color: "orange", desc: "Build a strong base for NTSE, Olympiads, and future JEE/NEET preparation early on.", fee: "₹25,000" },
              { title: "UPSC / BPSC", tag: "Civil Services", color: "purple", desc: "Comprehensive GS coverage, current affairs, and answer writing practice by ex-bureaucrats.", fee: "₹65,000" },
              { title: "SSC / Banking", tag: "Govt Jobs", color: "red", desc: "Quantitative aptitude, reasoning, English, and GA taught with short-tricks and speed tests.", fee: "₹15,000" },
              { title: "CUET (UG)", tag: "University Entry", color: "sky", desc: "Domain subjects + General test prep to secure admission in top central universities.", fee: "₹12,000" }
            ].map((course, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-1 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all group">
                <div className="bg-white dark:bg-slate-900 rounded-[28px] p-6 h-full flex flex-col relative overflow-hidden">
                  <div className={`absolute top-0 right-0 bg-${course.color}-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-[28px]`}>{course.tag}</div>
                  
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 mt-4">{course.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm flex-1">{course.desc}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase">Starting Fee</div>
                      <div className="text-lg font-black text-slate-900 dark:text-white">{course.fee}</div>
                    </div>
                    <button className={`bg-${course.color}-100 dark:bg-${course.color}-900/30 text-${course.color}-600 dark:text-${course.color}-400 font-bold px-4 py-2 rounded-lg hover:bg-${course.color}-600 hover:text-white transition-colors`}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- TOP FACULTY ----------------- */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden" id="faculty">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Learn From The Best</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">Our faculty consists of Ex-IITians, doctors, and subject matter experts.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { name: "Alok Kumar", subject: "Physics", exp: "15+ Yrs Exp", expBadge: "Ex-Allen" },
              { name: "Dr. Sneha Roy", subject: "Biology", exp: "12+ Yrs Exp", expBadge: "MBBS, AIIMS" },
              { name: "Ravi Shankar", subject: "Mathematics", exp: "10+ Yrs Exp", expBadge: "IIT Delhi" },
              { name: "Pooja Mishra", subject: "Chemistry", exp: "14+ Yrs Exp", expBadge: "Ex-Aakash" }
            ].map((fac, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-6 text-center shadow-sm border border-slate-200 dark:border-slate-800 hover:-translate-y-2 transition-transform group">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-blue-100 dark:border-blue-900 mb-6 overflow-hidden bg-slate-100">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${fac.name}`} alt={fac.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{fac.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-4">{fac.subject}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-full">{fac.exp}</span>
                  <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold px-3 py-1 rounded-full">{fac.expBadge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- DEVELOPER FOOTER ----------------- */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="container mx-auto px-6 md:px-12">
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-bold text-slate-500">© 2026 Shiksha Prabhat Institute. All rights reserved.</p>
            
            {/* Professional Developer Credit Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-800/80 transition-colors shadow-lg shadow-black/50">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                <img src="/mrityunjay.png" alt="Developer Mrityunjay Kumar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-blue-400 font-black mb-1">Design & Developed By</p>
                <h4 className="text-white font-black text-sm">Mrityunjay Kumar</h4>
                <div className="flex gap-3 mt-1 text-slate-400">
                  <Link href="https://www.linkedin.com/in/mrityunjay-kumar-8480842a5" className="hover:text-blue-400 transition text-xs font-bold">LinkedIn</Link>
                  <span>•</span>
                  <Link href="https://github.com/mrityunjay45108" className="hover:text-blue-400 transition text-xs font-bold">GitHub</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
