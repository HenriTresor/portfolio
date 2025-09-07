"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
    texts: string[];
    className?: string;
    speedMs?: number;
    pauseMs?: number;
    deleteSpeedMs?: number;
};

export default function CyclingTypewriter({
    texts,
    className,
    speedMs = 80,
    pauseMs = 2000,
    deleteSpeedMs = 30
}: Props) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let mounted = true;

        const typeText = () => {
            const fullText = texts[currentTextIndex];

            if (isDeleting) {
                // Deleting characters
                const deleteInterval = setInterval(() => {
                    if (!mounted) return;

                    setCurrentText(prev => {
                        if (prev.length === 0) {
                            clearInterval(deleteInterval);
                            setIsDeleting(false);
                            setCurrentTextIndex(prev => (prev + 1) % texts.length);
                            return "";
                        }
                        return prev.slice(0, -1);
                    });
                }, deleteSpeedMs);

                return () => clearInterval(deleteInterval);
            } else {
                // Typing characters
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (!mounted) return;

                    i++;
                    setCurrentText(fullText.slice(0, i));

                    if (i >= fullText.length) {
                        clearInterval(typeInterval);
                        // Pause before starting to delete
                        setTimeout(() => {
                            if (mounted) setIsDeleting(true);
                        }, pauseMs);
                    }
                }, speedMs);

                return () => clearInterval(typeInterval);
            }
        };

        const cleanup = typeText();
        return () => {
            mounted = false;
            cleanup?.();
        };
    }, [currentTextIndex, isDeleting, texts, speedMs, pauseMs, deleteSpeedMs]);

    return (
        <motion.h1
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-[var(--accent)]">
                {currentText}
            </span>
            <motion.span
                className="inline-block w-[0.5ch] ml-1 align-baseline text-[var(--accent)]"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            >
                |
            </motion.span>
        </motion.h1>
    );
}
