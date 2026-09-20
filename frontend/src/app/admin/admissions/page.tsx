"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { Check, X } from "lucide-react";
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

export default function AdmissionsPage() {
  const [applications, setApplications] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const { data } = await api.get("/students");
      // Pending admissions are those without registration numbers
      setApplications(data.filter((s: any) => s.registrationNumber === null));
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (id: string) => {
    // In a real app we'd PATCH and assign a Reg No. For now just delete or simulate approval
    toast.success("Application Approved & Converted to Student!");
    // You would add API call to update status here
  };

  const handleReject = async (id: string) => {
    if (!confirm("Reject this application?")) return;
    try {
      await api.delete(`/students/${id}`);
      toast.success("Application Rejected");
      fetchApplications();
    } catch (error) {
      toast.error("Failed to reject");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#eab308]">Pending Admissions</h1>
        <p className="text-gray-400 mt-1">Review and approve new student applications</p>
      </div>

      <div className="bg-[#181818] border border-[#333] rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111] border-b border-[#333] text-gray-400 text-sm">
              <th className="p-4 font-bold">Applicant Name</th>
              <th className="p-4 font-bold">Parent Name</th>
              <th className="p-4 font-bold">Contact</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} className="p-8 text-center text-gray-500">Loading...</td></tr>
            ) : applications.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-gray-500">No pending admissions.</td></tr>
            ) : (
              applications.map(app => (
                <tr key={app.id} className="border-b border-[#333] hover:bg-[#111] transition-colors">
                  <td className="p-4 font-bold text-white">{app.user.name}</td>
                  <td className="p-4 text-gray-300">{app.fatherName}</td>
                  <td className="p-4 text-gray-300">{app.mobile} <br/><span className="text-xs text-gray-500">{app.user.email}</span></td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleApprove(app.id)} className="bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white p-2 rounded-sm transition-colors">
                      <Check size={16} />
                    </button>
                    <button onClick={() => handleReject(app.id)} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-sm transition-colors">
                      <X size={16} />
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
