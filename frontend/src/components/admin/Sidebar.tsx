"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  Trophy,
  FileBarChart,
  CalendarDays,
  Bell,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  PenTool,
  Clock,
  X
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { title: "Admissions", icon: ClipboardList, path: "/admin/admissions" },
  { title: "Students", icon: GraduationCap, path: "/admin/students" },
  { title: "Teachers", icon: UserCheck, path: "/admin/teachers" },
  { title: "School Classes", icon: BookOpen, path: "/admin/school-classes" },
  { title: "Coaching Classes", icon: Users, path: "/admin/coaching-classes" },
  { title: "Weekly Tests", icon: Clock, path: "/admin/weekly-tests" },
  { title: "Homework", icon: PenTool, path: "/admin/homework" },
  { title: "Results", icon: FileBarChart, path: "/admin/results" },
  { title: "Medhavi Toppers", icon: Trophy, path: "/admin/toppers" },
  { title: "Gallery", icon: ImageIcon, path: "/admin/gallery" },
  { title: "Notices", icon: Bell, path: "/admin/notices" },
  { title: "Website CMS", icon: Settings, path: "/admin/cms" },
  { title: "Settings", icon: Settings, path: "/admin/settings" },
];

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (val: boolean) => void;
}

export function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
        />
      )}

      <motion.aside
        animate={{ width: isCollapsed ? 80 : 280 }}
        className={`fixed md:relative h-screen bg-[#111111] border-r border-[#333] flex flex-col z-50 shadow-xl transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-6 h-20 border-b border-[#333]">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif font-bold text-xl text-[#eab308] truncate"
            >
              SPPS Admin
            </motion.div>
          )}
          {isCollapsed && (
            <div className="w-full flex justify-center text-[#eab308] font-bold text-xl font-serif">
              S
            </div>
          )}
          
          {/* Mobile Close Button */}
          {setIsMobileMenuOpen && (
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:block absolute -right-4 top-6 bg-[#eab308] text-[#111] p-1 rounded-full shadow-lg hover:scale-110 transition"
          >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link href={item.path} key={item.path}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-3 py-3 rounded-sm transition-all duration-200 group relative ${
                  isActive
                    ? "bg-[#eab308]/10 text-[#eab308] font-medium"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-1/4 h-1/2 w-1 bg-[#eab308]"
                  />
                )}
                <item.icon
                  size={20}
                  className={isActive ? "text-[#eab308]" : "group-hover:text-gray-300"}
                />
                {!isCollapsed && <span className="truncate">{item.title}</span>}
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-[#333]">
        <button className="flex w-full items-center gap-3 px-3 py-3 rounded-sm text-red-500 hover:bg-red-500/10 transition-colors">
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
    </>
  );
}
