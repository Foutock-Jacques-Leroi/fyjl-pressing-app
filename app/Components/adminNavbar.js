// components/AdminSidebar.js
"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  Layers, 
  LogOut, 
  Cpu,
  Menu,
  ChevronRight
} from 'lucide-react';

// Self-contained utility fallback to guarantee cross-environment performance
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminSidebar() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Users, label: 'User Hub' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Layers, label: 'Modules' },
    { icon: Settings, label: 'System Configuration' },
  ];

  return (
    <div className={cn(
      "bg-gradient-to-b from-slate-50 to-slate-100/60 border-slate-200/80 z-50 select-none backdrop-blur-md",
      
      // TELEPHONE / TABLET VIEW: Top horizontal layout wrapper
      "fixed left-0 right-0 h-16 flex flex-row items-center justify-between px-4 border-b md:top-0",
      
      // DESKTOP VIEW: Left-side vertical panel layout wrapper
      "md:sticky md:flex md:flex-col md:w-64 md:h-screen md:px-4 md:py-6 md:border-r md:border-b-0"
    )}>
      
      {/* 1. BRAND IDENTITY LAYER (Always on the left for phones, top for desktop) */}
      <div className="flex items-center gap-3 px-2">
        <div className="p-2 bg-slate-950 rounded-xl text-cyan-400 shadow-md shrink-0">
          <Cpu className="h-5 w-5 animate-spin-[spin_3s_linear_infinite]" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-sm uppercase tracking-wider text-slate-900">
            Nexus System
          </span>
          <span className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-500 uppercase tracking-widest -mt-0.5">
            Admin Suite v4
          </span>
        </div>
      </div>

      {/* 2. TELEPHONE DROPDOWN ACTION MENU TRIGGER (Visible only on mobile/tablet) */}
      <div className="relative md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center rounded-xl border border-slate-200 bg-white shadow-xs text-slate-700 h-10 w-10 hover:bg-slate-50 active:scale-95 transition-all"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Telephone Dropdown Overlay Window */}
        {mobileMenuOpen && (
          <>
            {/* Click backdrop detector to close menu instantly */}
            <div className="fixed inset-0 z-10" onClick={() => setMobileMenuOpen(false)} />
            
            <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-2xl p-2 shadow-xl z-20 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-black tracking-wider text-slate-400 uppercase">Navigation</div>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.label;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveTab(item.label);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center px-3 py-2.5 my-0.5 text-xs font-extrabold rounded-xl transition-all text-left",
                      isActive 
                        ? "text-indigo-700 bg-gradient-to-r from-indigo-50 to-pink-50/20 border border-indigo-100/30" 
                        : "text-slate-600 hover:bg-slate-100/80"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 mr-2.5 shrink-0", isActive ? "text-indigo-600" : "text-slate-400")} />
                    {item.label}
                  </button>
                );
              })}
              <div className="h-[1px] bg-slate-100 my-1.5" />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center px-3 py-2.5 text-xs font-extrabold text-rose-600 hover:bg-rose-50 rounded-xl transition-all text-left"
              >
                <LogOut className="w-4 h-4 mr-2.5 text-slate-400" />
                Terminate Session
              </button>
            </div>
          </>
        )}
      </div>

      {/* 3. DESKTOP CORE NAVIGATION MATRIX (Completely hidden on telephone/tablet layouts) */}
      <div className="hidden md:flex flex-col justify-between flex-1 w-full mt-8">
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;
            
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 text-sm font-extrabold rounded-xl transition-all duration-200 group relative text-left",
                  isActive 
                    ? "text-indigo-700 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50/20 shadow-xs border border-indigo-100/40" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                )}
              >
                <div className="flex items-center min-w-0">
                  <Icon className={cn(
                    "w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-105 shrink-0",
                    isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  <span className="truncate">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-indigo-600 shrink-0" />}
              </button>
            );
          })}
        </nav>

        {/* Desktop Profile Status Card */}
        <div className="pt-4 border-t border-slate-200/60 w-full">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/80 border border-slate-200/40 shadow-xs mb-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-400 to-fuchsia-500 flex items-center justify-center font-black text-xs text-white shadow-inner shrink-0">
              SYS
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-800 leading-none">Root Operator</span>
              <span className="text-[10px] font-bold text-slate-400 mt-1">Global Permissions</span>
            </div>
          </div>
          
          <button className="w-full font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50/60 rounded-xl py-3 px-4 flex items-center transition-colors text-sm justify-start">
            <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors shrink-0 mr-2.5" />
            <span>Terminate Session</span>
          </button>
        </div>
      </div>

    </div>
  );
}