"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit, FileText, X } from "lucide-react";
import toast from "react-hot-toast";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: string;
  pinned: boolean;
  publishDate: string;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", type: "General" });

  const fetchNotices = async () => {
    try {
      const { data } = await api.get("/notices");
      setNotices(data);
    } catch (error) {
      toast.error("Failed to fetch notices");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/notices", formData);
      toast.success("Notice published successfully!");
      setIsModalOpen(false);
      setFormData({ title: "", content: "", type: "General" });
      fetchNotices();
    } catch (error) {
      toast.error("Failed to publish notice");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;
    try {
      await api.delete(`/notices/${id}`);
      toast.success("Notice deleted");
      fetchNotices();
    } catch (error) {
      toast.error("Failed to delete notice");
    }
  };

  return (
    <div className="space-y-6 pb-10 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#eab308]">Notice Board</h1>
          <p className="text-gray-400 mt-1">Manage school and coaching announcements</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#eab308] hover:bg-[#ca9a04] text-[#111] px-5 py-2.5 rounded-sm font-bold transition-colors shadow-lg"
        >
          <Plus size={18} /> Publish Notice
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-gray-500">Loading notices...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <motion.div 
              key={notice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111111] border border-[#333] hover:border-[#eab308]/50 p-6 rounded-sm shadow-sm relative group transition-colors flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
                  notice.type === "Holiday" ? "bg-red-500/10 text-red-500" :
                  notice.type === "Exam" ? "bg-blue-500/10 text-blue-500" :
                  "bg-[#eab308]/10 text-[#eab308]"
                }`}>
                  {notice.type}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleDelete(notice.id)} className="text-gray-500 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{notice.title}</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">{notice.content}</p>
              
              <div className="text-xs text-gray-500 border-t border-[#333] pt-4 flex items-center gap-2">
                <FileText size={14} /> Published on {new Date(notice.publishDate).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
          {notices.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500 border border-dashed border-[#333]">
              No notices published yet. Click "Publish Notice" to add one.
            </div>
          )}
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#181818] border border-[#333] w-full max-w-lg rounded-sm overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center p-6 border-b border-[#333] bg-[#111]">
                <h2 className="text-xl font-serif font-bold text-[#eab308]">Create New Notice</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-300 uppercase tracking-widest mb-2">Notice Title</label>
                  <input 
                    type="text" required
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-[#111] border border-[#333] text-white rounded-sm px-4 py-2.5 outline-none focus:border-[#eab308]"
                    placeholder="e.g. Summer Vacation Dates"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 uppercase tracking-widest mb-2">Category Type</label>
                  <select 
                    value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-[#111] border border-[#333] text-white rounded-sm px-4 py-2.5 outline-none focus:border-[#eab308]"
                  >
                    <option value="General">General</option>
                    <option value="Admission">Admission</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Exam">Exam Notice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 uppercase tracking-widest mb-2">Details / Content</label>
                  <textarea 
                    required rows={4}
                    value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}
                    className="w-full bg-[#111] border border-[#333] text-white rounded-sm px-4 py-2.5 outline-none focus:border-[#eab308] resize-none"
                    placeholder="Type the full notice content here..."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#333]">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-400 hover:text-white font-medium">
                    Cancel
                  </button>
                  <button type="submit" className="bg-[#eab308] hover:bg-[#ca9a04] text-[#111] px-6 py-2.5 rounded-sm font-bold transition-colors">
                    Publish Now
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
