"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function IntroScreen() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"hold" | "open" | "done">("hold");

  useLayoutEffect(() => {
    if (document.documentElement.dataset.portfolioIntroComplete === "true") {
      setPhase("done");
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.portfolioIntroComplete === "true") return;
    root.classList.add("intro-active");
    let openingTimer: number | undefined;
    let finishedTimer: number | undefined;
    let started = false;

    const finish = () => {
      setPhase("done");
      root.classList.remove("intro-active");
      root.dataset.portfolioIntroComplete = "true";
      window.dispatchEvent(new Event("portfolio:intro-complete"));
    };

    const start = () => {
      if (started) return;
      started = true;
      if (reduceMotion) {
        finish();
        return;
      }
      openingTimer = window.setTimeout(() => setPhase("open"), 600);
      finishedTimer = window.setTimeout(finish, 1600);
    };

    if (root.dataset.portfolioPageReady === "true" || (pathname !== "/" && pathname !== "/contact")) start();
    window.addEventListener("portfolio:page-ready", start);

    return () => {
      window.removeEventListener("portfolio:page-ready", start);
      window.clearTimeout(openingTimer);
      window.clearTimeout(finishedTimer);
      root.classList.remove("intro-active");
    };
  }, [reduceMotion, pathname]);

  if (phase === "done" || reduceMotion) return null;

  const opening = phase === "open";
  return (
    <div className={"intro-screen" + (opening ? " is-opening" : "")} aria-hidden="true" data-lenis-prevent>
      <motion.div className="intro-panel intro-panel-left" animate={{ x: opening ? "-101%" : "0%" }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} />
      <motion.div className="intro-panel intro-panel-right" animate={{ x: opening ? "101%" : "0%" }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} />
      <motion.span className="intro-title" animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: .25 }}>Murakaza neza<span>.</span></motion.span>
    </div>
  );
}