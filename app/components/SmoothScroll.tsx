"use client";

import { cancelFrame, frame } from "framer-motion";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = ({ timestamp }: { timestamp: number }) => {
      lenisRef.current?.lenis?.raf(timestamp);
    };
    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, anchors: true, stopInertiaOnNavigate: true }}>
      {children}
    </ReactLenis>
  );
}
