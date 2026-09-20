"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { Plus, Search, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

interface Topper {
  id: string;
  name: string;
  class: string;
  score: string;
  rank: string;
  year: number;
}

export default function ToppersPage() {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    score: "",
    rank: "",
    year: 2026
  });

  const fetchToppers = async () => {
    try {
      const { data } = await api.get("/topper");
      setToppers(data);
    } catch (error) {
      toast.error("Failed to load toppers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchToppers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/topper/${id}`);
      toast.success("Topper deleted");
      fetchToppers();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/topper", formData);
      toast.success("Topper added successfully!");
      setIsModalOpen(false);
      setFormData({ name: "", class: "", score: "", rank: "", year: 2026 });
      fetchToppers();
    } catch (error) {
      toast.error("Failed to add topper");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#eab308]">Medhavi Toppers</h1>
          <p className="text-gray-400 mt-1">Manage school and coaching toppers</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#eab308] hover:bg-[#ca9a04] text-[#111] px-5 py-2.5 rounded-sm font-bold transition-colors shadow-lg">
          <Plus size={18} /> Add Topper
        </button>
      </div>

      <div className="bg-[#181818] border border-[#333] rounded-sm p-4 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search toppers..." 
            className="w-full bg-[#111] border border-[#333] text-white rounded-sm pl-10 pr-4 py-2 outline-none focus:border-[#eab308]"
          />
        </div>
      </div>

      <div className="bg-[#181818] border border-[#333] rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111] border-b border-[#333] text-gray-400 text-sm">
              <th className="p-4 font-bold">Name</th>
              <th className="p-4 font-bold">Class</th>
              <th className="p-4 font-bold">Score</th>
              <th className="p-4 font-bold">Rank</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading...</td></tr>
            ) : toppers.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No toppers found.</td></tr>
            ) : (
              toppers.map(t => (
                <tr key={t.id} className="border-b border-[#333] hover:bg-[#111] transition-colors">
                  <td className="p-4 font-bold text-white">{t.name}</td>
                  <td className="p-4 text-gray-300">{t.class}</td>
                  <td className="p-4 text-[#eab308] font-bold">{t.score}</td>
                  <td className="p-4 text-gray-300">{t.rank}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(t.id)} className="text-gray-500 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Topper Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#181818] border border-[#333] rounded-sm w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif font-bold text-[#eab308]">Add New Topper</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Student Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#111] border border-[#333] rounded-sm p-2 text-white focus:border-[#eab308] outline-none" />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Class (e.g. Class 10th BSEB)</label>
                <input required type="text" value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className="w-full bg-[#111] border border-[#333] rounded-sm p-2 text-white focus:border-[#eab308] outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Score (e.g. 96.4%)</label>
                  <input required type="text" value={formData.score} onChange={e => setFormData({...formData, score: e.target.value})} className="w-full bg-[#111] border border-[#333] rounded-sm p-2 text-white focus:border-[#eab308] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Rank/Title</label>
                  <input required type="text" value={formData.rank} onChange={e => setFormData({...formData, rank: e.target.value})} className="w-full bg-[#111] border border-[#333] rounded-sm p-2 text-white focus:border-[#eab308] outline-none" />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#eab308] text-[#111] font-bold py-3 rounded-sm hover:bg-[#ca9a04] transition-colors mt-4">
                Save Topper
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
