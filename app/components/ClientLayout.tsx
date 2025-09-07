"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import Navbar from './Navbar';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarContextType {
  isNavbarOpen: boolean;
  setIsNavbarOpen: (open: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within NavbarProvider');
  }
  return context;
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <NavbarContext.Provider value={{ isNavbarOpen, setIsNavbarOpen }}>
      <Navbar />
      {/* Language Switcher - Hidden when navbar is open */}
      <div className={`fixed top-4 right-4 sm:right-20 z-[9999] transition-opacity duration-300 ${
        isNavbarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <LanguageSwitcher />
      </div>
      {children}
    </NavbarContext.Provider>
  );
}
