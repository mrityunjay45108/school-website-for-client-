"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Course {
  id: string;
  name: string;
  category: string;
  fees: number;
  subjects: string[];
}

export default function SchoolClassesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/courses");
      setCourses(data);
    } catch (error) {
      toast.error("Failed to load courses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete(`/courses/${id}`);
      toast.success("Course deleted");
      fetchCourses();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#eab308]">School & Coaching Classes</h1>
          <p className="text-gray-400 mt-1">Manage academic courses and batches</p>
        </div>
        <button className="flex items-center gap-2 bg-[#eab308] hover:bg-[#ca9a04] text-[#111] px-5 py-2.5 rounded-sm font-bold transition-colors shadow-lg">
          <Plus size={18} /> New Class
        </button>
      </div>

      <div className="bg-[#181818] border border-[#333] rounded-sm p-4 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search classes..." 
            className="w-full bg-[#111] border border-[#333] text-white rounded-sm pl-10 pr-4 py-2 outline-none focus:border-[#eab308]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
           <div className="col-span-full p-8 text-center text-gray-500">Loading...</div>
        ) : courses.length === 0 ? (
           <div className="col-span-full p-8 text-center text-gray-500">No classes found.</div>
        ) : (
          courses.map(course => (
            <div key={course.id} className="bg-[#181818] border border-[#333] rounded-sm overflow-hidden hover:border-[#eab308]/50 transition-colors">
              <div className="p-5 border-b border-[#333]">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white">{course.name}</h3>
                  <button onClick={() => handleDelete(course.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
                <span className="inline-block mt-2 text-xs font-bold bg-[#eab308]/10 text-[#eab308] px-2 py-1 rounded-sm border border-[#eab308]/20">
                  {course.category}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Monthly Fee:</span>
                  <span className="text-white font-mono">₹{course.fees}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm block mb-1">Subjects:</span>
                  <div className="flex gap-1 flex-wrap">
                    {course.subjects?.map((s, i) => (
                      <span key={i} className="text-xs bg-[#111] text-gray-300 px-2 py-1 border border-[#333] rounded-sm">{s}</span>
                    )) || <span className="text-xs text-gray-500">No subjects assigned</span>}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
