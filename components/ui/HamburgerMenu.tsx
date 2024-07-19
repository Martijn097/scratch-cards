"use client"

import { HamburgerIcon } from "@/components/ui/Icons";
import React, { useState, useEffect } from 'react';

export default function HamburgerMenu() {
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
    </div>
  );
}