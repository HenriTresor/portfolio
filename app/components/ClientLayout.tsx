"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Navbar from "./Navbar";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import SoundControl from "./SoundControl";

interface NavbarContextType {
  isNavbarOpen: boolean;
  setIsNavbarOpen: (open: boolean) => void;
  isNavbarVisible: boolean;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("useNavbar must be used within NavbarProvider");
  return context;
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const travel = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const nextY = window.scrollY;
      const delta = nextY - lastScrollY.current;
      lastScrollY.current = nextY;

      if (isNavbarOpen || nextY < 80) {
        travel.current = 0;
        setIsNavbarVisible(true);
        return;
      }
      if (Math.abs(delta) < 0.5) return;

      travel.current = delta > 0
        ? Math.max(0, travel.current) + delta
        : Math.min(0, travel.current) + delta;

      if (travel.current > 24) setIsNavbarVisible(false);
      if (travel.current < -14) setIsNavbarVisible(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isNavbarOpen]);

  const controlsHidden = isNavbarOpen || !isNavbarVisible;

  return (
    <NavbarContext.Provider value={{ isNavbarOpen, setIsNavbarOpen, isNavbarVisible }}>
      <Navbar />
      <SoundControl />
      <div
        className={"hidden sm:flex fixed top-6 right-20 z-[9999] transition-transform duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] will-change-transform " +
          (controlsHidden ? "-translate-y-[160%] pointer-events-none" : "translate-y-0")}
        aria-hidden={controlsHidden}
        inert={controlsHidden}
      >
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
      {children}
    </NavbarContext.Provider>
  );
}