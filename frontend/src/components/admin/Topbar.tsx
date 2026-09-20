"use client";

import React from "react";
import { Search, Bell, Mail, Calendar, Sun, Moon } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-20 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 flex items-center justify-between px-8 shadow-sm">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search students, teachers, classes..."
            className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-full pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors relative">
          <Calendar size={20} />
        </button>
        <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors relative">
          <Mail size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border border-white"></span>
        </button>
        <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border border-white animate-pulse"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
        
        <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition pl-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Admin</span>
            <span className="text-xs text-slate-500">Super User</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px]">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
              alt="Admin"
              className="w-full h-full rounded-full bg-white object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
