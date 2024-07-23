"use client"

import { HamburgerIcon, CloseIcon } from "@/components/ui/Icons";
import React, { useState, useEffect } from 'react';
import AuthButton2 from "@/components/AuthButton2";
import Link from 'next/link';

export default function HeaderOpenMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={toggleNavbar}
        className="flex p-3 border border-neutral-200 rounded-lg cursor-pointer"
      >
        <HamburgerIcon className="h-8 w-8 cursor-pointer" />
      </div>
      <div className={`absolute bg-purple w-full min-h-screen pb-20 mx-auto flex-col items-center justify-center top-0 left-0 md:hidden ${isOpen ? 'flex' : 'hidden'}`}>
        <div className="flex flex-col gap-6">
          <CloseIcon 
            onClick={toggleNavbar}
            className={`h-16 w-16 cursor-pointer text-white fill-white transition-all opacity-0 duration-500 ${isOpen ? 'fade-in-delay-1' : 'opacity-0'}`} />
          <Link
            href="/"
            onClick={toggleNavbar}
            className={`text-white text-6xl transition-all opacity-0 duration-500 ${isOpen ? 'fade-in-delay-2' : 'opacity-0'}`}
            >
            <span>Home</span>
          </Link>
          <Link 
            href="/overview"
            onClick={toggleNavbar}
            className={`text-white text-6xl transition-all opacity-0 duration-500 ${isOpen ? 'fade-in-delay-3' : 'opacity-0'}`}
            >
            <span>Krasloten</span>
          </Link>
          <Link 
            href="/about"
            onClick={toggleNavbar}
            className={`text-white text-6xl transition-all opacity-0 duration-500 ${isOpen ? 'fade-in-delay-4' : 'opacity-0'}`}
            >
            <span>Over</span>
          </Link>
          <Link 
            href=""
            onClick={toggleNavbar}
            className={`text-white text-6xl transition-all opacity-0 duration-500 ${isOpen ? 'fade-in-delay-5' : 'opacity-0'}`}
          >
            <span>Uitloggen</span>
          </Link>
          {/* <AuthButton2 /> */}
        </div>
      </div>
    </div>
  );
}