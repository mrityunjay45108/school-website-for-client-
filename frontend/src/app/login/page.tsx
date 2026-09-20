"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { api } from "@/lib/axios";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("admin_token", response.data.access_token);
      
      toast.success("Login Successful!");
      router.push("/admin");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#eab308]/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#eab308]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20">
        <ArrowRight className="rotate-180" size={20} /> Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#181818] border border-[#333] p-10 rounded-sm shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-[#eab308] flex items-center justify-center text-[#181818] rounded-sm mb-6 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
            <BookOpen size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Director Login</h1>
          <p className="text-gray-400 text-sm">Sign in to access the Shiksha Prabhat CMS</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-300 uppercase tracking-widest mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#111111] border border-[#333] text-white rounded-sm pl-12 pr-4 py-3 outline-none focus:border-[#eab308] transition-colors"
                placeholder="director@shikshaprabhat.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#111111] border border-[#333] text-white rounded-sm pl-12 pr-4 py-3 outline-none focus:border-[#eab308] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" className="accent-[#eab308]" /> Remember me
            </label>
            <a href="#" className="text-[#eab308] hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#eab308] hover:bg-[#ca9a04] text-[#181818] font-bold py-4 rounded-sm transition-colors mt-4 flex items-center justify-center gap-2 group"
          >
            Access Dashboard <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
