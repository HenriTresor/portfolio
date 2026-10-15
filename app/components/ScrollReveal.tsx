"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

export default function ScrollReveal({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "article" }) {
  const reduceMotion = useReducedMotion();
  const Component = as === "article" ? motion.article : motion.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
