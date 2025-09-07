"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
    id: string;
    children: ReactNode;
    bg?: "transparent" | "panel";
};

export default function Section({ id, children, bg = "transparent" }: Props) {
    return (
        <section
            id={id}
            className={`min-h-[100svh] flex items-center justify-center px-6 sm:px-10 py-8 sm:py-12 ${bg === "panel" ? "backdrop-blur-sm bg-white/5 rounded-2xl my-4 sm:my-6" : ""
                }`}
        >
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-5xl"
            >
                {children}
            </motion.div>
        </section>
    );
}


