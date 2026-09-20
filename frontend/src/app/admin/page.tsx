"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/axios";
import { Users, GraduationCap, FileBarChart, HandCoins, UserPlus, FileText, Trophy, Bell } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Link from "next/link";
import toast from "react-hot-toast";

// Static charts for now
const admissionsData = [
  { name: 'Jan', admissions: 45 },
  { name: 'Feb', admissions: 80 },
  { name: 'Mar', admissions: 120 },
  { name: 'Apr', admissions: 180 },
  { name: 'May', admissions: 90 },
  { name: 'Jun', admissions: 60 },
];

const demographicsData = [
  { name: 'Nursery to Class 5', value: 400 },
  { name: 'Class 6 to 10', value: 652 },
  { name: 'Coaching (State Board)', value: 400 },
];
const COLORS = ['#eab308', '#3b82f6', '#ef4444'];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    pendingAdmissions: 0,
    revenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/dashboard-stats");
        setStats(data);
      } catch (error) {
        toast.error("Failed to load dashboard metrics");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 pb-10">
      
      {/* Welcome Section */}
      <div className="bg-[#181818] border border-[#333] p-8 rounded-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#eab308]/5 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-serif font-bold text-[#eab308] flex items-center gap-3">
            Welcome Director <span className="animate-wave origin-bottom-right inline-block">👋</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl text-sm leading-relaxed">
            Here's what's happening at Shiksha Prabhat Public School & Coaching today. You have {stats.pendingAdmissions} pending admissions to review.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/admin/students">
              <button className="flex items-center gap-2 bg-[#111] border border-[#333] hover:border-[#eab308] text-white px-4 py-2 text-sm rounded-sm transition-colors">
                <UserPlus size={16} className="text-[#eab308]" /> Add Student
              </button>
            </Link>
            <Link href="/admin/school-classes">
              <button className="flex items-center gap-2 bg-[#111] border border-[#333] hover:border-[#eab308] text-white px-4 py-2 text-sm rounded-sm transition-colors">
                <FileText size={16} className="text-[#eab308]" /> New Class
              </button>
            </Link>
            <Link href="/admin/toppers">
              <button className="flex items-center gap-2 bg-[#111] border border-[#333] hover:border-[#eab308] text-white px-4 py-2 text-sm rounded-sm transition-colors">
                <Trophy size={16} className="text-[#eab308]" /> Add Topper
              </button>
            </Link>
            <Link href="/admin/notices">
              <button className="flex items-center gap-2 bg-[#111] border border-[#333] hover:border-[#eab308] text-white px-4 py-2 text-sm rounded-sm transition-colors">
                <Bell size={16} className="text-[#eab308]" /> Publish Notice
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Students", value: isLoading ? "..." : stats.totalStudents.toLocaleString(), icon: Users, color: "text-[#eab308]", bg: "bg-[#eab308]/10", trend: "+12%", trendUp: true },
          { title: "Total Teachers", value: isLoading ? "..." : stats.totalTeachers.toLocaleString(), icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+2%", trendUp: true },
          { title: "Pending Admissions", value: isLoading ? "..." : stats.pendingAdmissions.toLocaleString(), icon: UserPlus, color: "text-orange-500", bg: "bg-orange-500/10", trend: "-5%", trendUp: false },
          { title: "Revenue (Monthly)", value: isLoading ? "..." : `₹${(stats.revenue/100000).toFixed(1)}L`, icon: HandCoins, color: "text-green-500", bg: "bg-green-500/10", trend: "+8%", trendUp: true },
        ].map((metric, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#181818] border border-[#333] p-6 rounded-sm hover:border-[#444] transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm font-medium">{metric.title}</p>
                <h3 className="text-3xl font-bold text-white mt-2">{metric.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${metric.bg} ${metric.color}`}>
                <metric.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${metric.trendUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                {metric.trendUp ? "↗" : "↘"} {metric.trend}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#181818] border border-[#333] p-6 rounded-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-serif font-bold text-[#eab308]">Admissions Overview</h3>
            <select className="bg-[#111] border border-[#333] text-sm text-gray-300 px-3 py-1.5 rounded-sm outline-none">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={admissionsData}>
                <XAxis dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '4px' }}
                  itemStyle={{ color: '#eab308' }}
                />
                <Line type="monotone" dataKey="admissions" stroke="#eab308" strokeWidth={3} dot={{ fill: '#eab308', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#181818] border border-[#333] p-6 rounded-sm flex flex-col">
          <h3 className="text-lg font-serif font-bold text-[#eab308] mb-2">Students Demographics</h3>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '4px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white">1,452</span>
              <span className="text-xs text-gray-400">Total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
