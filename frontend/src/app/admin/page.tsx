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
  { title: "Total Students", value: "1,452", icon: Users, color: "text-[#eab308]", bg: "bg-[#eab308]/10", trend: "+12%" },
  { title: "Total Teachers", value: "84", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+2%" },
  { title: "Pending Admissions", value: "24", icon: UserPlus, color: "text-orange-500", bg: "bg-orange-500/10", trend: "-5%" },
  { title: "Revenue (Monthly)", value: "₹4.5L", icon: IndianRupee, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+8%" },
];

const admissionData = [
  { name: "Jan", admissions: 40 }, { name: "Feb", admissions: 30 },
  { name: "Mar", admissions: 120 }, { name: "Apr", admissions: 180 },
  { name: "May", admissions: 90 }, { name: "Jun", admissions: 40 },
];

const genderData = [
  { name: "Boys", value: 800, color: "#eab308" },
  { name: "Girls", value: 652, color: "#3b82f6" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-10 text-white font-sans">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-md bg-[#111111] border border-[#333] p-8 shadow-xl"
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-serif font-bold text-[#eab308] mb-2">Welcome Director 👋</h1>
          <p className="text-gray-400 mb-6 max-w-xl text-sm">
            Here's what's happening at Shiksha Prabhat Public School & Coaching today. You have 24 pending admissions to review.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] hover:border-[#eab308] text-[#eab308] px-4 py-2 rounded-sm text-sm font-medium transition-colors">
              <UserPlus size={16} /> Add Student
            </button>
            <button className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] hover:border-[#eab308] text-[#eab308] px-4 py-2 rounded-sm text-sm font-medium transition-colors">
              <BookOpen size={16} /> New Class
            </button>
            <button className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] hover:border-[#eab308] text-[#eab308] px-4 py-2 rounded-sm text-sm font-medium transition-colors">
              <Trophy size={16} /> Add Topper
            </button>
            <button className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] hover:border-[#eab308] text-[#eab308] px-4 py-2 rounded-sm text-sm font-medium transition-colors">
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
            className="bg-[#111111] rounded-sm p-6 shadow-sm border border-[#333] hover:border-[#eab308]/50 transition-colors relative"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-1 text-white">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-md ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm">
              <span className={`flex items-center ${stat.trend.startsWith("+") ? "text-emerald-500" : "text-rose-500"} font-semibold bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded-md`}>
                {stat.trend.startsWith("+") ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                {stat.trend}
              </span>
              <span className="text-gray-500 text-xs">vs last month</span>
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
          className="lg:col-span-2 bg-[#111111] rounded-sm p-6 shadow-sm border border-[#333]"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-serif font-bold text-[#eab308]">Admissions Overview</h3>
            <select className="bg-[#1a1a1a] border border-[#333] text-gray-300 rounded-sm text-sm py-2 px-3 outline-none focus:border-[#eab308]">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={admissionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="admissions" 
                  stroke="#eab308" 
                  strokeWidth={4}
                  dot={{ r: 4, strokeWidth: 2, fill: '#111', stroke: '#eab308' }}
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#eab308' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#111111] rounded-sm p-6 shadow-sm border border-[#333] flex flex-col"
        >
          <h3 className="text-lg font-serif font-bold text-[#eab308] mb-6">Students Demographics</h3>
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
                  <RechartsTooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-white">1,452</span>
                <span className="text-xs text-gray-400">Total</span>
              </div>
            </div>
            
            <div className="flex justify-center gap-6 mt-4 w-full">
              {genderData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium text-gray-300">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
