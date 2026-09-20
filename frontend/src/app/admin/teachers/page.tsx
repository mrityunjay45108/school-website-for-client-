"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Teacher {
  id: string;
  qualification: string;
  experience: string;
  subjects: string[];
  user: {
    name: string;
    email: string;
  };
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeachers = async () => {
    try {
      const { data } = await api.get("/teachers");
      setTeachers(data);
    } catch (error) {
      toast.error("Failed to load teachers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await api.delete(`/teachers/${id}`);
      toast.success("Teacher deleted");
      fetchTeachers();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#eab308]">Teachers Directory</h1>
          <p className="text-gray-400 mt-1">Manage staff and assigned subjects</p>
        </div>
        <button className="flex items-center gap-2 bg-[#eab308] hover:bg-[#ca9a04] text-[#111] px-5 py-2.5 rounded-sm font-bold transition-colors shadow-lg">
          <Plus size={18} /> Add Teacher
        </button>
      </div>

      <div className="bg-[#181818] border border-[#333] rounded-sm p-4 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search teachers..." 
            className="w-full bg-[#111] border border-[#333] text-white rounded-sm pl-10 pr-4 py-2 outline-none focus:border-[#eab308]"
          />
        </div>
      </div>

      <div className="bg-[#181818] border border-[#333] rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111] border-b border-[#333] text-gray-400 text-sm">
              <th className="p-4 font-bold">Name</th>
              <th className="p-4 font-bold">Email</th>
              <th className="p-4 font-bold">Qualification</th>
              <th className="p-4 font-bold">Subjects</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading...</td></tr>
            ) : teachers.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No teachers found.</td></tr>
            ) : (
              teachers.map(t => (
                <tr key={t.id} className="border-b border-[#333] hover:bg-[#111] transition-colors">
                  <td className="p-4 font-bold text-white">{t.user.name}</td>
                  <td className="p-4 text-gray-300">{t.user.email}</td>
                  <td className="p-4 text-gray-300">{t.qualification} ({t.experience})</td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {t.subjects?.map((s, i) => (
                        <span key={i} className="bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded-sm border border-blue-500/20">{s}</span>
                      ))}
                    </div>
                  </td>
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
    </div>
  );
}
