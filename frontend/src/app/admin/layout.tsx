"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";
import { AdminGuard } from "@/components/admin/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <AdminGuard>
      <div className="flex h-screen bg-[#111] overflow-hidden font-sans text-white">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Topbar 
            toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#181818] p-4 md:p-6 relative">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
