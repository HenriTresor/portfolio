"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 300, damping: 25, mass: 0.6 });
  const ys = useSpring(y, { stiffness: 300, damping: 25, mass: 0.6 });
  const [hovering, setHovering] = useState(false);
  const unsub = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isTouch) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    const onOver = () => setHovering(true);
    const onOut = () => setHovering(false);
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
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
      style={{ translateX: xs, translateY: ys }}
    >
      <div
        className={`h-6 w-6 rounded-full border border-white/80 ${
          hovering ? "scale-150 bg-white/20" : "bg-transparent"
        } transition-transform duration-150`}
      />
    </motion.div>
  );
}


