"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { KeyRound, ShieldPlus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Admin {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function SettingsPage() {
  const [passwordForm, setPasswordForm] = useState({ newPassword: "", confirmPassword: "" });
  const [adminForm, setAdminForm] = useState({ name: "", email: "", password: "" });
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdmins = async () => {
    try {
      const { data } = await api.get("/auth/admins");
      setAdmins(data);
    } catch (error) {
      toast.error("Failed to load admins");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (passwordForm.newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    try {
      await api.post("/auth/change-password", { newPassword: passwordForm.newPassword });
      toast.success("Password updated successfully");
      setPasswordForm({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminForm.password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    try {
      await api.post("/auth/create-admin", adminForm);
      toast.success("New admin created successfully");
      setAdminForm({ name: "", email: "", password: "" });
      fetchAdmins();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create admin");
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#eab308]">System Settings</h1>
        <p className="text-gray-400 mt-1">Manage security and administrator accounts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Change Password Section */}
        <div className="bg-[#181818] border border-[#333] rounded-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#eab308]/10 text-[#eab308] rounded-sm">
              <KeyRound size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Change My Password</h2>
          </div>
          
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">New Password</label>
              <input 
                type="password" 
                required
                value={passwordForm.newPassword}
                onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                className="w-full bg-[#111] border border-[#333] rounded-sm p-3 text-white outline-none focus:border-[#eab308]" 
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
              <input 
                type="password" 
                required
                value={passwordForm.confirmPassword}
                onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                className="w-full bg-[#111] border border-[#333] rounded-sm p-3 text-white outline-none focus:border-[#eab308]" 
                placeholder="Re-enter new password"
              />
            </div>
            <button type="submit" className="w-full bg-[#eab308] hover:bg-[#ca9a04] text-[#111] font-bold py-3 rounded-sm transition-colors mt-2">
              Update Password
            </button>
          </form>
        </div>

        {/* Add New Admin Section */}
        <div className="bg-[#181818] border border-[#333] rounded-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-sm">
              <ShieldPlus size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Assign New Admin</h2>
          </div>
          
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={adminForm.name}
                onChange={e => setAdminForm({...adminForm, name: e.target.value})}
                className="w-full bg-[#111] border border-[#333] rounded-sm p-3 text-white outline-none focus:border-[#eab308]" 
                placeholder="e.g. Rahul Sir"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                value={adminForm.email}
                onChange={e => setAdminForm({...adminForm, email: e.target.value})}
                className="w-full bg-[#111] border border-[#333] rounded-sm p-3 text-white outline-none focus:border-[#eab308]" 
                placeholder="admin@school.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Temporary Password</label>
              <input 
                type="password" 
                required
                value={adminForm.password}
                onChange={e => setAdminForm({...adminForm, password: e.target.value})}
                className="w-full bg-[#111] border border-[#333] rounded-sm p-3 text-white outline-none focus:border-[#eab308]" 
                placeholder="At least 8 characters"
              />
            </div>
            <button type="submit" className="w-full bg-[#111] border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-3 rounded-sm transition-colors mt-2">
              Create Admin Account
            </button>
          </form>
        </div>

      </div>

      {/* List of Admins */}
      <div className="bg-[#181818] border border-[#333] rounded-sm p-6">
        <h2 className="text-xl font-bold text-white mb-6">Active Administrators</h2>
        
        {isLoading ? (
          <p className="text-gray-500">Loading admins...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#333] text-gray-400 text-sm">
                  <th className="pb-3 font-bold">Name</th>
                  <th className="pb-3 font-bold">Email</th>
                  <th className="pb-3 font-bold">Role</th>
                  <th className="pb-3 font-bold">Created On</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id} className="border-b border-[#333] hover:bg-[#111] transition-colors">
                    <td className="py-4 text-white font-bold">{admin.name}</td>
                    <td className="py-4 text-gray-300">{admin.email}</td>
                    <td className="py-4"><span className="bg-purple-500/10 text-purple-400 text-xs px-2 py-1 rounded-sm border border-purple-500/20">SUPER_ADMIN</span></td>
                    <td className="py-4 text-gray-500 text-sm">{new Date(admin.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
