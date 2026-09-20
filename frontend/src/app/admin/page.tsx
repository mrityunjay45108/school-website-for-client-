"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, UserPlus, BookOpen, Bell, Trophy, FileText, 
  TrendingUp, TrendingDown, IndianRupee, GraduationCap
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const stats = [
  { title: "Total Students", value: "1,452", icon: Users, color: "from-blue-500 to-cyan-500", trend: "+12%" },
  { title: "Total Teachers", value: "84", icon: GraduationCap, color: "from-purple-500 to-pink-500", trend: "+2%" },
  { title: "Pending Admissions", value: "24", icon: UserPlus, color: "from-orange-500 to-amber-500", trend: "-5%" },
  { title: "Revenue (Monthly)", value: "₹4.5L", icon: IndianRupee, color: "from-emerald-500 to-teal-500", trend: "+8%" },
];

const admissionData = [
  { name: "Jan", admissions: 40 }, { name: "Feb", admissions: 30 },
  { name: "Mar", admissions: 120 }, { name: "Apr", admissions: 180 },
  { name: "May", admissions: 90 }, { name: "Jun", admissions: 40 },
];

const genderData = [
  { name: "Boys", value: 800, color: "#3b82f6" },
  { name: "Girls", value: 652, color: "#ec4899" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-8 text-white shadow-xl"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome Admin 👋</h1>
          <p className="text-blue-200 mb-6 max-w-xl text-sm">
            Here's what's happening at Shiksha Prabhat Public School today. You have 24 pending admissions to review.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium transition">
              <UserPlus size={16} /> Add Student
            </button>
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium transition">
              <BookOpen size={16} /> New Course
            </button>
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium transition">
              <Trophy size={16} /> Add Topper
            </button>
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium transition">
              <Bell size={16} /> Publish Notice
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all relative overflow-hidden group"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500`}></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-1 text-slate-800 dark:text-white">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm">
              <span className={`flex items-center ${stat.trend.startsWith("+") ? "text-emerald-500" : "text-rose-500"} font-semibold bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg`}>
                {stat.trend.startsWith("+") ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                {stat.trend}
              </span>
              <span className="text-slate-400 text-xs">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Admissions Overview</h3>
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm py-2 outline-none">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={admissionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="admissions" 
                  stroke="#4f46e5" 
                  strokeWidth={4}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#4f46e5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col"
        >
          <h3 className="text-lg font-bold mb-6">Students Demographics</h3>
          <div className="flex-1 flex flex-col justify-center items-center relative">
            <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold">1,452</span>
                <span className="text-xs text-slate-400">Total</span>
              </div>
            </div>
            
            <div className="flex justify-center gap-6 mt-4 w-full">
              {genderData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
