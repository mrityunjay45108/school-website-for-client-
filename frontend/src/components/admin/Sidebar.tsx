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
  Download,
  Settings,
  UsersRound,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ClipboardList
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { title: "Admissions", icon: ClipboardList, path: "/admin/admissions" },
  { title: "Students", icon: GraduationCap, path: "/admin/students" },
  { title: "Teachers", icon: UserCheck, path: "/admin/teachers" },
  { title: "Courses", icon: BookOpen, path: "/admin/courses" },
  { title: "Medhavi Toppers", icon: Trophy, path: "/admin/toppers" },
  { title: "Results", icon: FileBarChart, path: "/admin/results" },
  { title: "Attendance", icon: Users, path: "/admin/attendance" },
  { title: "Events", icon: CalendarDays, path: "/admin/events" },
  { title: "Notices", icon: Bell, path: "/admin/notices" },
  { title: "Gallery", icon: ImageIcon, path: "/admin/gallery" },
  { title: "Testimonials", icon: MessageSquare, path: "/admin/testimonials" },
  { title: "Downloads", icon: Download, path: "/admin/downloads" },
  { title: "Website CMS", icon: Settings, path: "/admin/cms" },
  { title: "User Management", icon: UsersRound, path: "/admin/users" },
  { title: "Settings", icon: Settings, path: "/admin/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col relative z-20 shadow-xl shadow-blue-900/5 transition-all duration-300"
    >
      <div className="flex items-center justify-between p-6 h-20 border-b border-slate-100 dark:border-slate-800">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 truncate"
          >
            SPPS Admin
          </motion.div>
        )}
        {isCollapsed && (
          <div className="w-full flex justify-center text-blue-600 font-bold text-xl">
            S
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-6 bg-blue-600 text-white p-1 rounded-full shadow-lg hover:scale-110 transition"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link href={item.path} key={item.path}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-400 font-medium"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-1/4 h-1/2 w-1 bg-blue-600 rounded-r-full"
                  />
                )}
                <item.icon
                  size={20}
                  className={isActive ? "text-blue-600 dark:text-blue-400" : "group-hover:text-blue-500"}
                />
                {!isCollapsed && <span className="truncate">{item.title}</span>}
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button className="flex w-full items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
