"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function CustomCursor() {
  const { resolvedTheme } = useTheme();
  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
  const x = useMotionValue(100);
  const y = useMotionValue(100);
  const xs = useSpring(x, { stiffness: 350, damping: 25, mass: 0.5 });
  const ys = useSpring(y, { stiffness: 350, damping: 25, mass: 0.5 });
  const [hovering, setHovering] = useState(false);
  const unsub = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = () => setHovering(true);
    const onOut = () => setHovering(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor=hover]").forEach((el) => {
      el.addEventListener("mouseenter", onOver);
      el.addEventListener("mouseleave", onOut);
    });

    unsub.current = () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, [data-cursor=hover]").forEach((el) => {
        el.removeEventListener("mouseenter", onOver);
        el.removeEventListener("mouseleave", onOut);
      });
    };

    return () => unsub.current?.();
  }, [x, y, isTouch]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{
        translateX: xs,
        translateY: ys,
        x: '-50%',
        y: '-50%'
      }}
    >

      {/* Main cursor ring */}
      <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${hovering
        ? 'border-[var(--accent)] bg-[var(--accent)]/15 scale-75'
        : resolvedTheme === 'light'
          ? 'border-black bg-black/20 scale-100'
          : 'border-white bg-white/15 scale-100'
        }`} />

      {/* Center dot */}
      <div className={`absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${hovering
        ? 'bg-[var(--accent)] scale-50'
        : resolvedTheme === 'light'
          ? 'bg-black scale-100'
          : 'bg-white scale-100'
        }`} />
    </motion.div>
  );
}