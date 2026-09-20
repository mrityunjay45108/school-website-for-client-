"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, BookOpen, GraduationCap, Users, PhoneCall, 
  MessageCircle, MapPin, Search, ChevronRight, PlayCircle,
  Award, MonitorPlay, FlaskConical, Library, Bus, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ----------------------------------------------------------------------
// 1. ANNOUNCEMENT BAR
// ----------------------------------------------------------------------
const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-2 overflow-hidden flex items-center relative z-50">
      <div className="container mx-auto px-4 flex items-center justify-between text-xs md:text-sm">
        <div className="flex gap-4 overflow-hidden whitespace-nowrap w-full">
          <motion.div 
            animate={{ x: [0, -1000] }} 
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex gap-10 min-w-full"
          >
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Admissions Open for Session 2026-27</span>
            <span>⭐ Medhavi Scholarship Test on 15th Oct</span>
            <span>📢 Upcoming Holidays for Dussehra</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Admissions Open for Session 2026-27</span>
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
    <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">S</div>
          <div>
            <h1 className={`font-extrabold text-lg tracking-tight ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>Shiksha Prabhat</h1>
            <p className={`text-[10px] uppercase tracking-widest font-semibold ${scrolled ? 'text-blue-600 dark:text-blue-400' : 'text-blue-200'}`}>Public School</p>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          {["Home", "About", "Academics", "Toppers", "Gallery", "Contact"].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-medium hover:text-blue-500 transition-colors ${scrolled ? 'text-slate-600 dark:text-slate-300' : 'text-slate-100'}`}>
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admission">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
              Admission Open
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-white font-sans overflow-x-hidden">
      <AnnouncementBar />
      <Navbar />

      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Cinematic Blur Background using image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-950/70 dark:bg-slate-950/80 mix-blend-multiply z-10" />
          <motion.div style={{ y }} className="w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
              alt="School Campus" 
              className="w-full h-[120%] object-cover object-center filter blur-[2px] scale-105"
            />
          </motion.div>
        </div>
        
        {/* Animated Gradient Blobs */}
        <div className="absolute inset-0 z-10 overflow-hidden opacity-40 mix-blend-screen pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/30 blur-[100px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} 
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-600/20 blur-[120px]"
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20 pt-10 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-blue-100 border border-white/20 backdrop-blur-md">
                BSEB Affiliated • Nursery to Graduation Honours
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 drop-shadow-sm leading-tight">
                Shiksha Prabhat <br className="hidden md:block"/> Public School
              </h1>
              <p className="text-xl md:text-2xl text-blue-100/90 mb-10 font-medium tracking-wide">
                Knowledge • Discipline • Success
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-blue-900 rounded-full font-bold shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-lg group">
                  Apply for Admission <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-blue-900/40 border border-blue-400/30 backdrop-blur-xl rounded-full font-bold text-white shadow-lg hover:bg-blue-800/60 transition-all text-lg flex items-center justify-center gap-2">
                  <PlayCircle size={20} /> Virtual Campus Tour
                </button>
              </div>
              <div className="flex justify-center gap-6 mt-8">
                <button className="text-white/80 hover:text-white flex items-center gap-2 text-sm font-medium backdrop-blur-md bg-black/20 px-4 py-2 rounded-full border border-white/10 transition">
                  <PhoneCall size={16} /> Call Now
                </button>
                <button className="text-white/80 hover:text-white flex items-center gap-2 text-sm font-medium backdrop-blur-md bg-black/20 px-4 py-2 rounded-full border border-white/10 transition">
                  <MessageCircle size={16} /> WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Glassmorphism Info Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-5xl mx-auto"
          >
            {[
              { icon: MonitorPlay, title: "Smart Classes", desc: "Digital interactive learning" },
              { icon: GraduationCap, title: "Expert Faculty", desc: "Highly qualified teachers" },
              { icon: Trophy, title: "Proven Results", desc: "Consistently top ranks" },
              { icon: ShieldCheck, title: "Safe Campus", desc: "24/7 CCTV surveillance" },
            ].map((feature, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex flex-col items-center text-center text-white hover:bg-white/20 transition-colors group">
                <div className="p-3 bg-blue-500/30 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} className="text-blue-200" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-xs text-blue-200/80 mt-1">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ----------------- BENTO GRID: WHY CHOOSE US ----------------- */}
      <section className="py-24 bg-[#F8FAFC] dark:bg-[#0F172A] relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Why Choose SPPS</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">A Foundation for Excellence</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-6">
                    <BookOpen className="text-blue-600" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Comprehensive Curriculum</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md">
                    From Nursery to Graduation Honours. We offer BSEB curriculum seamlessly integrated with competitive exam preparations.
                  </p>
                </div>
                <button className="mt-8 self-start flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                  Explore Academics <ArrowRight size={18} />
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-md">
                <FlaskConical size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Advanced Labs</h3>
              <p className="text-blue-100">State-of-the-art Science and Computer laboratories to foster practical learning and innovation.</p>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center mb-6">
                <Users className="text-orange-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Faculty</h3>
              <p className="text-slate-600 dark:text-slate-400">Dedicated and highly experienced educators committed to student success.</p>
            </div>
            
            <div className="md:col-span-2 bg-slate-900 dark:bg-black rounded-3xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row gap-8 items-center border border-slate-800">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
                  <MonitorPlay className="text-emerald-400" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Smart Digital Classrooms</h3>
                <p className="text-slate-400">Interactive boards, digital content, and modern pedagogy for an immersive learning experience.</p>
              </div>
              <div className="flex-1 w-full h-48 bg-slate-800 rounded-2xl border border-slate-700 relative overflow-hidden group">
                 {/* Placeholder for video or image */}
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/50 transition">
                     <PlayCircle className="text-white" size={32} />
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- TOPPERS HALL OF FAME ----------------- */}
      <section className="py-24 bg-gradient-to-b from-amber-50 to-[#F8FAFC] dark:from-slate-900 dark:to-[#0F172A] relative overflow-hidden">
        {/* Decorative Gold Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 blur-[100px] rounded-full"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 mb-6 shadow-lg shadow-amber-500/30">
              <Trophy className="text-white" size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Medhavi Hall of Fame</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Celebrating the exceptional achievements and hard work of our star performers.</p>
          </div>
          
          {/* Podium Layout */}
          <div className="flex flex-col md:flex-row justify-center items-end gap-6 md:gap-8 max-w-5xl mx-auto h-auto md:h-[500px] mt-20">
            {/* 2nd Rank */}
            <div className="order-2 md:order-1 flex-1 flex flex-col items-center group">
              <div className="relative mb-4">
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-slate-300 border-4 border-white dark:border-slate-900 flex items-center justify-center font-bold text-slate-700 shadow-lg z-10">2</div>
                <div className="w-32 h-32 rounded-full border-4 border-slate-300 overflow-hidden shadow-xl p-1 bg-white">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" className="w-full h-full object-cover rounded-full bg-slate-100" alt="Student" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-t-3xl border border-b-0 border-slate-200 dark:border-slate-700 w-full text-center shadow-2xl relative overflow-hidden h-48 md:h-56 transform transition-transform group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-200/50 to-transparent dark:from-slate-700/50"></div>
                <h3 className="font-bold text-xl relative z-10">Priya Sharma</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm relative z-10">Class 10th BSEB</p>
                <div className="mt-4 inline-block bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl relative z-10">
                  <span className="text-2xl font-black text-slate-800 dark:text-white">96.4%</span>
                </div>
              </div>
            </div>
            
            {/* 1st Rank */}
            <div className="order-1 md:order-2 flex-1 flex flex-col items-center group z-10">
              <div className="relative mb-4 transform -translate-y-4">
                <div className="absolute -top-6 -right-6 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 border-4 border-white dark:border-slate-900 flex items-center justify-center font-black text-white text-xl shadow-lg z-10 animate-bounce">1</div>
                <div className="w-40 h-40 rounded-full border-4 border-yellow-400 overflow-hidden shadow-2xl shadow-yellow-500/40 p-1 bg-white">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" className="w-full h-full object-cover rounded-full bg-slate-100" alt="Student" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-t-3xl border border-b-0 border-yellow-200 dark:border-yellow-900 w-full text-center shadow-[0_-10px_40px_rgba(251,191,36,0.15)] relative overflow-hidden h-56 md:h-72 transform transition-transform group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-100/50 to-transparent dark:from-yellow-900/20"></div>
                <h3 className="font-bold text-2xl relative z-10">Rahul Kumar</h3>
                <p className="text-amber-600 dark:text-amber-500 font-semibold relative z-10">Class 12th Science</p>
                <div className="mt-6 inline-block bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-2 rounded-xl shadow-lg relative z-10">
                  <span className="text-3xl font-black text-white">98.2%</span>
                </div>
                <p className="text-xs text-slate-500 mt-4 relative z-10 font-medium">District Topper 2025</p>
              </div>
            </div>
            
            {/* 3rd Rank */}
            <div className="order-3 md:order-3 flex-1 flex flex-col items-center group">
              <div className="relative mb-4">
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-orange-400 border-4 border-white dark:border-slate-900 flex items-center justify-center font-bold text-white shadow-lg z-10">3</div>
                <div className="w-32 h-32 rounded-full border-4 border-orange-400 overflow-hidden shadow-xl p-1 bg-white">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" className="w-full h-full object-cover rounded-full bg-slate-100" alt="Student" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-t-3xl border border-b-0 border-orange-200 dark:border-orange-900/50 w-full text-center shadow-2xl relative overflow-hidden h-44 md:h-48 transform transition-transform group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-100/50 to-transparent dark:from-orange-900/20"></div>
                <h3 className="font-bold text-xl relative z-10">Amit Singh</h3>
                <p className="text-orange-600 dark:text-orange-400 font-semibold text-sm relative z-10">Class 10th BSEB</p>
                <div className="mt-4 inline-block bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl relative z-10">
                  <span className="text-2xl font-black text-slate-800 dark:text-white">95.8%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="px-8 py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 font-semibold hover:border-amber-500 hover:text-amber-600 transition-colors">
              View All Achievers
            </button>
          </div>
        </div>
      </section>

      {/* ----------------- RESULT SEARCH PORTAL ----------------- */}
      <section className="py-20 relative bg-blue-600">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Check Your Results</h2>
              <p className="text-blue-100 mb-6">Enter your Roll Number or Registration Number to download your digital marksheet and performance analytics.</p>
              <div className="flex items-center gap-2 text-sm bg-white/20 px-4 py-2 rounded-full w-max">
                <ShieldCheck size={16} /> Secure & Verified
              </div>
            </div>
            
            <div className="flex-1 w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl">
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Registration Number</label>
                  <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="e.g. REG2026001" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Roll Number</label>
                  <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Enter roll number" />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 mt-2 flex items-center justify-center gap-2">
                  <Search size={18} /> View Result
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- DEVELOPER FOOTER ----------------- */}
      <footer className="bg-[#0F172A] text-slate-300 py-16 border-t border-slate-800">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">S</div>
                <h2 className="text-xl font-bold text-white tracking-tight">Shiksha Prabhat Public School</h2>
              </div>
              <p className="text-slate-400 max-w-md mb-6">
                A premium educational institution dedicated to fostering academic excellence, moral values, and holistic development in Bahurar, Bihar.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"><PhoneCall size={18} /></div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"><MapPin size={18} /></div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"><MessageCircle size={18} /></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['About Us', 'Admissions', 'Courses', 'Gallery', 'Contact'].map(link => (
                  <li key={link}><Link href="#" className="hover:text-blue-400 transition flex items-center gap-2"><ChevronRight size={14}/> {link}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-6">Contact Us</h3>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin className="text-blue-500 shrink-0 mt-1" size={16} />
                  <span>Bahurar, Bihar, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneCall className="text-blue-500 shrink-0" size={16} />
                  <span>+91 62017 04992</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="text-blue-500 shrink-0" size={16} />
                  <span>kumarmrityunjay5210@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-slate-500">© 2026 Shiksha Prabhat Public School. All rights reserved.</p>
            
            {/* Professional Developer Credit Card */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-800 transition-colors max-w-sm w-full md:w-auto">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700 shrink-0">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mrityunjay" alt="Developer" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Design & Developed By</p>
                <h4 className="text-white font-bold text-sm">Mrityunjay Kumar</h4>
                <div className="flex gap-3 mt-1 text-slate-400">
                  <Link href="https://www.linkedin.com/in/mrityunjay-kumar-8480842a5" className="hover:text-blue-400 transition text-xs">LinkedIn</Link>
                  <span>•</span>
                  <Link href="https://github.com/mrityunjay45108" className="hover:text-blue-400 transition text-xs">GitHub</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
