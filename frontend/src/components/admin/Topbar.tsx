"use client";

import React from "react";
import { Search, Bell, Mail, Calendar, Menu } from "lucide-react";

interface TopbarProps {
  toggleMobileMenu?: () => void;
}

export function Topbar({ toggleMobileMenu }: TopbarProps) {
  return (
    <header className="h-20 bg-[#111111]/90 backdrop-blur-md border-b border-[#333] sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 shadow-sm">
      <div className="flex-1 flex items-center gap-4">
        {toggleMobileMenu && (
          <button 
            className="md:hidden p-2 text-white hover:bg-[#333] rounded-sm transition-colors"
            onClick={toggleMobileMenu}
          >
            <Menu size={24} />
          </button>
        )}
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search students, teachers, classes..."
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-sm pl-10 pr-4 py-2.5 text-sm focus:border-[#eab308] outline-none transition-all text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-sm hover:bg-white/5 text-gray-400 hover:text-white transition-colors relative">
          <Calendar size={20} />
        </button>
        <button className="p-2.5 rounded-sm hover:bg-white/5 text-gray-400 hover:text-white transition-colors relative">
          <Mail size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border border-[#111]"></span>
        </button>
        <button className="p-2.5 rounded-sm hover:bg-white/5 text-gray-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#eab308] rounded-full border border-[#111] animate-pulse"></span>
        </button>
        
        <div className="h-8 w-px bg-[#333] mx-2"></div>
        
        <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-sm hover:bg-white/5 transition pl-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-white">Director</span>
            <span className="text-xs text-[#eab308]">Super Admin</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#eab308] p-[2px]">
            <img
              src="/mrityunjay.png"
              alt="Director"
              className="w-full h-full rounded-full bg-[#222] object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
