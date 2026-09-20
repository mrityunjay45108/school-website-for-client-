"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Student {
  id: string;
  registrationNumber: string | null;
  fatherName: string;
  mobile: string;
  user: {
    name: string;
    email: string;
  };
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const { data } = await api.get("/students");
      // Filter out pending admissions (they don't have reg numbers usually, or we can just show all)
      setStudents(data.filter((s: any) => s.registrationNumber !== null));
    } catch (error) {
      toast.error("Failed to load students");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/students/${id}`);
      toast.success("Student deleted");
      fetchStudents();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    registrationNumber: ""
  });

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/students", formData);
      toast.success("Student added successfully");
      setShowAddModal(false);
      setFormData({ name: "", fatherName: "", mobile: "", registrationNumber: "" });
      fetchStudents();
    } catch (error) {
      toast.error("Failed to add student");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#eab308]">Students Directory</h1>
          <p className="text-gray-400 mt-1">Manage enrolled students</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#eab308] hover:bg-[#ca9a04] text-[#111] px-5 py-2.5 rounded-sm font-bold transition-colors shadow-lg"
        >
          <Plus size={18} /> Add Student
        </button>
      </div>

      <div className="bg-[#181818] border border-[#333] rounded-sm p-4 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="w-full bg-[#111] border border-[#333] text-white rounded-sm pl-10 pr-4 py-2 outline-none focus:border-[#eab308]"
          />
        </div>
      </div>

      <div className="bg-[#181818] border border-[#333] rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111] border-b border-[#333] text-gray-400 text-sm">
              <th className="p-4 font-bold">Reg. No</th>
              <th className="p-4 font-bold">Name</th>
              <th className="p-4 font-bold">Parent Name</th>
              <th className="p-4 font-bold">Mobile</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading...</td></tr>
            ) : students.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No students found.</td></tr>
            ) : (
              students.map(s => (
                <tr key={s.id} className="border-b border-[#333] hover:bg-[#111] transition-colors">
                  <td className="p-4 text-[#eab308] font-mono">{s.registrationNumber || 'N/A'}</td>
                  <td className="p-4 font-bold text-white">{s.user.name}</td>
                  <td className="p-4 text-gray-300">{s.fatherName}</td>
                  <td className="p-4 text-gray-300">{s.mobile}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(s.id)} className="text-gray-500 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#181818] border border-[#333] rounded-sm p-6 w-full max-w-md">
            <h2 className="text-2xl font-serif font-bold text-[#eab308] mb-6">Add New Student</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Student Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#111] border border-[#333] text-white rounded-sm px-3 py-2 outline-none focus:border-[#eab308]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Father's Name</label>
                <input required type="text" value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="w-full bg-[#111] border border-[#333] text-white rounded-sm px-3 py-2 outline-none focus:border-[#eab308]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Mobile Number</label>
                <input required type="text" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full bg-[#111] border border-[#333] text-white rounded-sm px-3 py-2 outline-none focus:border-[#eab308]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Registration Number (Optional)</label>
                <input type="text" value={formData.registrationNumber} onChange={e => setFormData({...formData, registrationNumber: e.target.value})} className="w-full bg-[#111] border border-[#333] text-white rounded-sm px-3 py-2 outline-none focus:border-[#eab308]" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-[#eab308] hover:bg-[#ca9a04] text-[#111] px-6 py-2 rounded-sm font-bold transition-colors">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
