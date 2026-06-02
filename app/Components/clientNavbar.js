// components/ClientNavbar.js
"use client";

import React from 'react';
import { Menu, Star, Layout, Compass, ShoppingBag, ArrowUpRight, HomeIcon, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export default function ClientNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/50 bg-gray-100 backdrop-blur-xl">
      {/* Laser Gradient Accent Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-slate-400 via-sky-900 to-slate-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Identity */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="p-2 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100 transition-transform group-hover:scale-105">
              <Star className="h-5 w-5 animate-pulse" />
            </div>
            <span className="font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-800 uppercase">
              NDJIMO<span className="text-indigo-600"> Press Clean</span>
            </span>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-8 font-extrabold text-sm tracking-wide text-slate-600">
            <Link href="/clientsPage" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <HomeIcon className="w-4 h-4" /> Home
            </Link>
            <Link href="/clientsPage/services" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <ShoppingCart className="w-4 h-4" /> Service
            </Link>
            <Link href="/clientsPage/reservations" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" /> Reservation
            </Link>
          </div>

          {/* Action Triggers */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className=" cursor-pointer font-extrabold text-slate-700 hover:bg-slate-100/80 rounded-xl px-4">
              Log Out
            </Button>
            <Button className="font-black tracking-tight shadow-md shadow-purple-100 transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-gradient-to-b from-blue-900 to-slate-900 hover:opacity-95 border-4 text-white rounded-xl border-none px-5">
              Settings <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Mobile Shadcn Dropdown */}
          <div className="md:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-slate-200 rounded-xl bg-white/80">
                  <Menu className="h-5 w-5 text-slate-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 p-2 rounded-xl border-slate-100 bg-white/95 backdrop-blur-md shadow-xl">
                <DropdownMenuItem className="font-bold py-2.5 rounded-lg cursor-pointer"><Compass className="w-4 h-4 mr-2" /> Discover</DropdownMenuItem>
                <DropdownMenuItem className="font-bold py-2.5 rounded-lg cursor-pointer"><Layout className="w-4 h-4 mr-2" /> Ecosystem</DropdownMenuItem>
                <DropdownMenuItem className="font-bold py-2.5 rounded-lg cursor-pointer"><ShoppingBag className="w-4 h-4 mr-2" /> Market</DropdownMenuItem>
                <hr className="my-1.5 border-slate-100" />
                <DropdownMenuItem className="font-black text-indigo-600 py-2.5 rounded-lg cursor-pointer">Launch Console</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </div>
    </nav>
  );
}