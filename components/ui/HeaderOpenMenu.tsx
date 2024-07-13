"use client"

import { HamburgerIcon, CloseIcon } from "@/components/ui/Icons";
import React, { useState, useEffect } from 'react';

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
          <span className={`text-white text-6xl transition-all opacity-0 duration-500 ${isOpen ? 'fade-in-delay-2' : 'opacity-0'}`}>Home</span>
          <span className={`text-white text-6xl transition-all opacity-0 duration-500 ${isOpen ? 'fade-in-delay-3' : 'opacity-0'}`}>Krasloten</span>
          <span className={`text-white text-6xl transition-all opacity-0 duration-500 ${isOpen ? 'fade-in-delay-4' : 'opacity-0'}`}>Over</span>
          <span className={`text-white text-6xl transition-all opacity-0 duration-500 ${isOpen ? 'fade-in-delay-5' : 'opacity-0'}`}>Uitloggen</span>
        </div>
      </div>
    </div>
  );
}