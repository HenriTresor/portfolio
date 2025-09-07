"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import Navbar from './Navbar';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

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
      {/* Desktop switchers - aligned with hamburger */}
      <div className={`hidden sm:flex fixed top-6 right-20 z-[9999] transition-opacity duration-300 ${isNavbarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
        <div className="flex items-center align-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
      {children}
    </NavbarContext.Provider>
  );
}
