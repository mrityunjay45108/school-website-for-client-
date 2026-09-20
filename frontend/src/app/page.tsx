import React from "react";
import { ArrowRight, BookOpen, GraduationCap, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 py-24 relative z-10 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-indigo-500/30 px-4 py-1.5 text-sm font-semibold text-indigo-200 border border-indigo-400/30 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
            Admission Open 2026-27
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Shiksha Prabhat Public School
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-10">
            Knowledge • Discipline • Success. Empowering students to build a brighter future with world-class education in Bahurar, Bihar.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-indigo-900 rounded-full font-bold shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              Apply Now
            </button>
            <button className="px-8 py-4 bg-indigo-700/50 border border-indigo-400/30 backdrop-blur-md rounded-full font-bold shadow-lg hover:bg-indigo-600/50 transition">
              View Courses
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
              <Users className="w-10 h-10 mx-auto text-blue-600 mb-4" />
              <div className="text-4xl font-bold mb-2">1500+</div>
              <div className="text-slate-500 dark:text-slate-400">Total Students</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
              <GraduationCap className="w-10 h-10 mx-auto text-purple-600 mb-4" />
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-slate-500 dark:text-slate-400">Success Rate</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
              <BookOpen className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-slate-500 dark:text-slate-400">Classes Available</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
              <Users className="w-10 h-10 mx-auto text-pink-600 mb-4" />
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-slate-500 dark:text-slate-400">Expert Teachers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Footer for Now */}
      <footer className="bg-slate-900 py-12 text-slate-400 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">Shiksha Prabhat Public School • Bahurar, Bihar</p>
          <div className="flex justify-center items-center gap-4 text-sm mt-8 p-4 rounded-xl bg-slate-800/50 max-w-md mx-auto border border-slate-700">
            <span>Design & Developed by <strong>Mrityunjay Kumar</strong></span>
            <span className="text-slate-600">|</span>
            <Link href="https://github.com/mrityunjay45108" className="hover:text-white transition">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
