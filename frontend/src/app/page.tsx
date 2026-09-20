"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Scale, BookOpen, GraduationCap, Users, PhoneCall, 
  MapPin, Clock, ArrowRight, CheckCircle, Mail, Bell
} from "lucide-react";
import Link from "next/link";

// ----------------------------------------------------------------------
// 1. ELEGANT NAVBAR (Matching Screenshot)
// ----------------------------------------------------------------------
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#181818] border-b border-[#333] py-4 shadow-lg" : "bg-[#181818]/90 py-6 border-b border-white/5"}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#eab308] flex items-center justify-center text-[#181818] shadow-sm rounded-sm">
            <BookOpen size={24} className="text-[#181818]" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-2xl tracking-wide text-[#eab308]">
              Shiksha Prabhat
            </h1>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          {["Home", "Programs", "Notices", "Toppers", "Gallery", "Contact"].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white hover:text-[#eab308] transition-colors relative group">
              {item}
              <span className={`absolute -bottom-2 left-0 w-full h-[2px] bg-[#eab308] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${item === 'Home' ? 'scale-x-100' : ''}`}></span>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:flex text-gray-300 hover:text-white text-sm font-medium transition-colors">
            Admin Login
          </Link>
          <Link href="/admission">
            <button className="bg-[#eab308] hover:bg-[#ca9a04] text-[#181818] px-6 py-2.5 text-sm font-bold transition-colors rounded-sm">
              School Admission
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// ----------------------------------------------------------------------
// MAIN COMPONENT (PAGE) - Dark Elegant Theme
// ----------------------------------------------------------------------
export default function LandingPage() {
  const [toppersList, setToppersList] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    // Fetch Toppers
    fetch("http://localhost:3001/topper")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setToppersList(data.slice(0, 3)); // Show top 3
      })
      .catch(err => console.log(err));

    // Fetch Notices
    fetch("http://localhost:3001/notices")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setNotices(data.slice(0, 3)); // Show top 3 notices
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#181818] text-white font-sans overflow-x-hidden selection:bg-[#eab308] selection:text-[#181818]">
      <Navbar />

      {/* ----------------- ELEGANT HERO SECTION ----------------- */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#181818]/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" 
            alt="Classroom" 
            className="w-full h-full object-cover object-center filter grayscale-[30%] opacity-40"
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20 text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#eab308] mb-8 leading-[1.1] tracking-tight">
              Quality Education <br /> from Nursery to Class 10
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              A trusted place where students learn, grow, and achieve success through dedicated school education and integrated coaching support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-8 py-4 bg-[#eab308] text-[#181818] font-bold hover:bg-[#ca9a04] transition-colors flex items-center justify-center gap-2 rounded-sm group">
                School Admission <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
              <button className="px-8 py-4 bg-transparent border border-white/20 text-[#eab308] hover:bg-white/5 transition-colors font-bold flex items-center justify-center rounded-sm">
                Join Coaching Classes
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- PROGRAMS WE OFFER (Matching "Our practice areas") ----------------- */}
      <section className="py-24 bg-[#181818] relative border-t border-[#2a2a2a]" id="programs">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#eab308] mb-6 tracking-tight">Our programs</h2>
            <div className="w-16 h-1 bg-[#eab308] mb-8"></div>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              Comprehensive educational services across school curriculum and coaching, delivered with unmatched expertise and dedication for Nursery to Class 10 students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
            {/* School Education */}
            <div className="group">
              <div className="mb-6">
                <BookOpen className="text-[#eab308]" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif font-bold text-[#eab308] mb-4 group-hover:text-yellow-400 transition-colors">
                School Education
              </h3>
              <div className="w-full h-px bg-[#333] mb-6 group-hover:bg-[#eab308] transition-colors"></div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Dedicated BSEB curriculum from Nursery to Class 10. We focus on holistic development, conceptual clarity, and building a strong foundation for your child's future.
              </p>
              <ul className="text-gray-300 space-y-2 mb-8 columns-2">
                <li>• Nursery</li>
                <li>• LKG & UKG</li>
                <li>• Class 1 to 5</li>
                <li>• Class 6 to 8</li>
                <li>• Class 9 & 10</li>
              </ul>
              <Link href="#" className="text-[#eab308] flex items-center gap-2 hover:gap-3 transition-all font-medium">
                Learn more <ArrowRight size={16} />
              </Link>
            </div>

            {/* Coaching Classes */}
            <div className="group">
              <div className="mb-6">
                <Users className="text-[#eab308]" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif font-bold text-[#eab308] mb-4 group-hover:text-yellow-400 transition-colors">
                Coaching Classes
              </h3>
              <div className="w-full h-px bg-[#333] mb-6 group-hover:bg-[#eab308] transition-colors"></div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Targeted after-school coaching for Class 1 to Class 10 subjects. We ensure individual attention, weekly tests, and regular homework for academic excellence.
              </p>
              <ul className="text-gray-300 space-y-2 mb-8 columns-2">
                <li>• Class 1-5 Coaching</li>
                <li>• Class 6-8 Coaching</li>
                <li>• Class 9-10 Coaching</li>
                <li>• Weekly Tests</li>
                <li>• Regular Homework</li>
              </ul>
              <Link href="#" className="text-[#eab308] flex items-center gap-2 hover:gap-3 transition-all font-medium">
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- ABOUT THE SCHOOL & AIM ----------------- */}
      <section className="py-24 bg-[#111111]" id="about">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            
            {/* Image Placeholder */}
            <div className="w-full md:w-5/12 relative">
              <div className="aspect-[3/4] w-full border-2 border-[#333] p-2 bg-[#181818] relative z-10">
                <img 
                  src="/director.png" 
                  alt="Director Sambhodh Kumar" 
                  className="w-full h-full object-cover object-top filter grayscale-[10%]"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#eab308] z-0 hidden md:block"></div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-7/12">
              <h2 className="text-sm font-bold tracking-widest text-[#eab308] uppercase mb-4">About Our Institution</h2>
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
                Shiksha Prabhat Public School & Coaching Classes
              </h3>
              <div className="w-16 h-1 bg-[#eab308] mb-8"></div>
              
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed mb-10">
                <p>
                  <strong className="text-white">Our Aim:</strong> Our primary mission is to provide an empowering educational environment where students not only excel in academics but also grow into responsible, ethical, and confident individuals. We aim to bridge the gap between traditional schooling and modern competitive excellence.
                </p>
                <p>
                  With our dedicated faculty, small batch sizes, and a strict focus on holistic development from Nursery to Class 10th (BSEB), we ensure that every child receives the individual attention they deserve. Together, we can build a strong foundation for your child's bright future.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#333] pt-8">
                <div>
                  <h4 className="text-2xl font-serif font-bold text-white mb-1">Sambhodh Kumar</h4>
                  <p className="text-[#eab308] text-sm uppercase tracking-widest">Director</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Link 
                    href="https://www.facebook.com/share/1EsLyDY7sd/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#333] hover:border-[#eab308] px-6 py-2.5 text-sm text-gray-300 hover:text-[#eab308] transition-colors rounded-sm group"
                  >
                    Facebook Profile <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ----------------- NOTICE BOARD ----------------- */}
      <section className="py-24 bg-[#181818]" id="notices">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#eab308] mb-4">Notice Board</h2>
              <div className="w-16 h-1 bg-[#eab308]"></div>
            </div>
            <Link href="/admin/notices" className="text-gray-400 hover:text-[#eab308] transition-colors flex items-center gap-2 mt-4 md:mt-0">
              View all notices <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-4">
            {notices.length > 0 ? notices.map((notice, i) => (
              <div key={i} className="bg-[#111111] border border-[#333] p-6 hover:border-[#eab308]/50 transition-colors flex gap-6 items-start">
                <div className="bg-[#181818] border border-[#333] p-4 flex flex-col items-center justify-center min-w-[80px]">
                  <span className="text-2xl font-bold text-[#eab308] leading-none">
                    {notice.createdAt ? new Date(notice.createdAt).getDate() : '--'}
                  </span>
                  <span className="text-xs text-gray-500 uppercase font-bold mt-1">
                    {notice.createdAt ? new Date(notice.createdAt).toLocaleString('default', { month: 'short' }) : 'New'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">{notice.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-3">{notice.content}</p>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#eab308]">
                    <Bell size={14} /> {notice.audience}
                  </div>
                </div>
              </div>
            )) : (
              <div className="bg-[#111111] border border-[#333] p-8 text-center text-gray-500">
                No recent notices available.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ----------------- MEDHAVI TOPPERS HALL OF FAME ----------------- */}
      <section className="py-24 bg-[#111111] border-y border-[#2a2a2a]" id="toppers">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#eab308] mb-6 tracking-tight">Medhavi Toppers</h2>
          <div className="w-16 h-1 bg-[#eab308] mx-auto mb-8"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
            Celebrating the academic brilliance of our students who secured top ranks in school and board examinations.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {toppersList.length > 0 ? toppersList.map((topper, i) => (
              <div key={i} className="bg-[#1a1a1a] p-8 border border-[#333] hover:border-[#eab308]/50 transition-colors flex flex-col items-center pt-10">
                <h3 className="text-2xl font-serif font-bold text-white mb-1">{topper.name}</h3>
                <p className="text-gray-400 mb-6">{topper.class}</p>
                <div className="text-3xl font-bold text-[#eab308] mb-2">{topper.score || topper.marks}</div>
                <div className="text-sm tracking-widest uppercase text-gray-500">{topper.rank || topper.label}</div>
              </div>
            )) : (
              <p className="text-gray-500 col-span-3">No toppers found yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* ----------------- WHY CHOOSE US & WEEKLY ROUTINE ----------------- */}
      <section className="py-24 bg-[#181818]">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#eab308] mb-6">Why choose us</h2>
              <div className="w-16 h-1 bg-[#eab308] mb-8"></div>
              <ul className="space-y-6">
                {[
                  "Experienced & Dedicated Teachers.",
                  "Small Batch Coaching for better focus.",
                  "Individual Attention to every child.",
                  "Regular Homework & Weekly Tests.",
                  "Transparent Parent Feedback System.",
                  "Friendly & Safe Learning Environment."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle className="text-[#eab308] shrink-0 mt-1" size={20} />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#111111] p-10 border border-[#333]">
              <h2 className="text-3xl font-serif font-bold text-[#eab308] mb-6">Weekly Test Schedule</h2>
              <div className="w-16 h-1 bg-[#eab308] mb-8"></div>
              <p className="text-gray-400 mb-8">
                We believe in continuous evaluation. Our weekly tests ensure that students are well-prepared for their final examinations.
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between border-b border-[#333] pb-4">
                  <span className="text-gray-300 font-bold">Class 1 to 5</span>
                  <span className="text-[#eab308]">Every Saturday</span>
                </div>
                <div className="flex justify-between border-b border-[#333] pb-4">
                  <span className="text-gray-300 font-bold">Class 6 to 8</span>
                  <span className="text-[#eab308]">Every Saturday</span>
                </div>
                <div className="flex justify-between border-b border-[#333] pb-4">
                  <span className="text-gray-300 font-bold">Class 9 & 10</span>
                  <span className="text-[#eab308]">Every Sunday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- CONTACT US SECTION ----------------- */}
      <section className="py-24 bg-[#111111] border-t border-[#2a2a2a]" id="contact">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#eab308] mb-6">Get in touch</h2>
              <div className="w-16 h-1 bg-[#eab308] mb-8"></div>
              <p className="text-gray-400 text-lg mb-10">
                Secure your child's future today. Contact us for admission inquiries, coaching details, or any other questions you may have.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 border border-[#333] bg-[#181818]">
                  <div className="bg-[#eab308]/10 p-3 rounded-full shrink-0">
                    <PhoneCall className="text-[#eab308]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1">Director's Contact</p>
                    <p className="text-white text-xl font-bold">Sambhodh Kumar</p>
                    <p className="text-[#eab308] text-lg mt-1">+91 62017 04992</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-[#333] bg-[#181818]">
                  <div className="bg-[#eab308]/10 p-3 rounded-full shrink-0">
                    <MapPin className="text-[#eab308]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1">School Address</p>
                    <p className="text-white font-medium">Shiksha Prabhat Public School</p>
                    <p className="text-gray-400 mt-1">Bahurar, Bihar, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#181818] p-8 border border-[#333]">
              <h3 className="text-2xl font-serif font-bold text-white mb-6">Send us a message</h3>
              <form 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as typeof e.target & {
                    name: { value: string };
                    phone: { value: string };
                    message: { value: string };
                    reset: () => void;
                  };
                  fetch("http://localhost:3001/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: target.name.value,
                      phone: target.phone.value,
                      message: target.message.value
                    })
                  }).then(res => {
                    if(res.ok) {
                      alert("Message sent successfully!");
                      target.reset();
                    }
                  });
                }}
              >
                <div>
                  <input type="text" name="name" required placeholder="Your Name" className="w-full bg-[#111] border border-[#333] p-4 text-white outline-none focus:border-[#eab308] rounded-sm" />
                </div>
                <div>
                  <input type="tel" name="phone" required placeholder="Your Phone Number" className="w-full bg-[#111] border border-[#333] p-4 text-white outline-none focus:border-[#eab308] rounded-sm" />
                </div>
                <div>
                  <textarea name="message" required rows={4} placeholder="How can we help?" className="w-full bg-[#111] border border-[#333] p-4 text-white outline-none focus:border-[#eab308] rounded-sm"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#eab308] text-[#111] font-bold py-4 rounded-sm hover:bg-[#ca9a04] transition-colors">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- FOOTER (Matching Screenshot) ----------------- */}
      <footer className="bg-[#181818] pt-20 pb-10 border-t border-[#2a2a2a]">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#eab308] flex items-center justify-center text-[#181818] rounded-sm">
                  <BookOpen size={18} />
                </div>
                <h2 className="font-serif font-bold text-xl text-[#eab308]">Shiksha Prabhat</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Shiksha Prabhat Public School & Coaching Classes. Providing exceptional education and coaching representation with integrity and dedication since 2015.
              </p>
            </div>
            
            <div>
              <h3 className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-6">Quick Links</h3>
              <ul className="space-y-4 text-sm text-gray-300">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="#programs" className="hover:text-white transition-colors">Programs</Link></li>
                <li><Link href="#about" className="hover:text-white transition-colors">About us</Link></li>
                <li><Link href="#notices" className="hover:text-white transition-colors">Notices</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-6">Contact Info</h3>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex gap-3">
                  <MapPin className="text-[#eab308] shrink-0" size={18} />
                  <span>Bahurar, Bihar<br />India</span>
                </li>
                <li className="flex gap-3 items-center">
                  <PhoneCall className="text-[#eab308] shrink-0" size={18} />
                  <span>+91 62017 04992 (Director)</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail className="text-[#eab308] shrink-0" size={18} />
                  <span>info@shikshaprabhat.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-6">Office Hours</h3>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex gap-3">
                  <Clock className="text-[#eab308] shrink-0" size={18} />
                  <div>
                    <p>Monday - Saturday: 8:00 AM - 6:00 PM</p>
                    <p className="mt-2">Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#333] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2026 Shiksha Prabhat Public School & Coaching. All rights reserved.</p>
            
            {/* Developer Credit */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Design & Developed by <strong className="text-gray-300">Mrityunjay Kumar</strong></span>
              <Link href="https://www.linkedin.com/in/mrityunjay-kumar-8480842a5" className="hover:text-[#eab308] transition-colors">LinkedIn</Link>
              <Link href="https://github.com/mrityunjay45108" className="hover:text-[#eab308] transition-colors">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
