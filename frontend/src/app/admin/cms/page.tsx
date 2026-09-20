"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { MessageSquare, Trash2, Mail, Phone, Calendar } from "lucide-react";
import toast from "react-hot-toast";

interface ContactMsg {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function CMSPage() {
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const { data } = await api.get("/contact");
      setMessages(data);
    } catch (error) {
      toast.error("Failed to load inquiries");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await api.delete(`/contact/${id}`);
      setMessages(messages.filter(m => m.id !== id));
      toast.success("Message deleted");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#eab308]">Website Inquiries</h1>
        <p className="text-gray-400 mt-1">Manage contact messages submitted from the public website</p>
      </div>

      <div className="bg-[#181818] border border-[#333] rounded-sm p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-[#333] pb-4">
          <div className="p-2 bg-blue-500/10 text-blue-500 rounded-sm">
            <MessageSquare size={24} />
          </div>
          <h2 className="text-xl font-bold text-white">Recent Messages</h2>
        </div>
        
        {isLoading ? (
          <p className="text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No inquiries received yet.
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-[#111] border border-[#333] p-5 rounded-sm flex flex-col md:flex-row gap-6 justify-between items-start hover:border-[#eab308]/50 transition-colors">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-sm border border-[#333]">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-[#eab308]" /> {msg.phone}
                    </div>
                    {msg.email && (
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-[#eab308]" /> {msg.email}
                      </div>
                    )}
                  </div>

                  <div className="bg-[#1a1a1a] p-4 border-l-2 border-[#eab308] text-gray-300 text-sm mt-4">
                    {msg.message}
                  </div>
                </div>
                
                <div>
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-sm transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
