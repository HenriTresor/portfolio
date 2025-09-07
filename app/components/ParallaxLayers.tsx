"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxLayers() {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -120]);

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <motion.div style={{ y: y1 }} className="absolute -top-20 -left-20 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle_at_center,rgba(154,199,255,0.6),transparent_60%)]" />
            <motion.div style={{ y: y2 }} className="absolute top-40 right-[-10rem] h-[36rem] w-[36rem] rounded-full blur-3xl opacity-15 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_60%)]" />
            <motion.div style={{ y: y3 }} className="absolute bottom-[-12rem] left-1/3 h-[46rem] w-[46rem] rounded-full blur-3xl opacity-10 bg-[conic-gradient(from_90deg,rgba(154,199,255,0.25),transparent_70%)]" />
        </div>
    );
}


