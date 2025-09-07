"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from 'react-i18next';

export default function AboutMe() {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement | null>(null);
    const [hasStarted, setHasStarted] = useState(false);

    function SimpleTypingAnimation({ text, className, shouldStart }: { text: string; className?: string; shouldStart: boolean }) {
        const [displayText, setDisplayText] = useState("");
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            if (!shouldStart) return;

            if (currentIndex < text.length) {
                const timer = setTimeout(() => {
                    setDisplayText(prev => prev + text[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                }, 50); // 50ms per character for smooth typing

                return () => clearTimeout(timer);
            }
        }, [shouldStart, currentIndex, text]);

        // Reset when shouldStart becomes false
        useEffect(() => {
            if (!shouldStart) {
                setDisplayText("");
                setCurrentIndex(0);
            }
        }, [shouldStart]);

        return (
            <span className={className} aria-label={text}>
                {displayText}
                {currentIndex < text.length && (
                    <motion.span
                        className="inline-block w-[0.5ch] ml-1 align-baseline text-[var(--accent)]"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    >
                        |
                    </motion.span>
                )}
            </span>
        );
    }

    return (
        <section ref={ref} className="w-full px-6 py-16 sm:py-24">
            <div className="relative max-w-7xl mx-auto">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--accent)]/5 rounded-full blur-3xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                    <motion.div
                        className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--accent)]/3 rounded-full blur-3xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                    />
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Profile/Visual */}
                    <motion.div
                        className="lg:col-span-5 space-y-8 flex flex-col items-center lg:items-start"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {/* Profile Card */}
                        <div className="glass rounded-3xl p-8 text-center space-y-6">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="w-24 h-24 mx-auto bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 rounded-full flex items-center justify-center text-4xl"
                            >
                                👨‍💻
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <h3 className="text-2xl font-semibold accent-theme mb-2">Henri Tresor</h3>
                                <p className="text-base opacity-80 text-theme">Full-Stack & Mobile Developer</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="flex justify-center gap-4"
                            >
                                <div className="text-center">
                                    <div className="text-2xl font-bold accent-theme">3+</div>
                                    <div className="text-xs opacity-70 text-theme">Years Experience</div>
                                </div>
                                <div className="w-px bg-white/20 dark:bg-white/20 light:bg-black/20"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold accent-theme">50+</div>
                                    <div className="text-xs opacity-70 text-theme">Projects Completed</div>
                                </div>
                                <div className="w-px bg-white/20 dark:bg-white/20 light:bg-black/20"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold accent-theme">100%</div>
                                    <div className="text-xs opacity-70 text-theme">Client Satisfaction</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Skills Preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="space-y-4"
                        >
                            <h4 className="text-lg font-semibold opacity-90 text-theme">Core Technologies</h4>
                            <div className="flex flex-wrap gap-3">
                                {["React", "React Native", "Next.js", "TypeScript", "Node.js", "Flutter"].map((tech, index) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                                        className="px-3 py-1 rounded-full bg-white/10 dark:bg-white/10 light:bg-black/10 border border-white/20 dark:border-white/20 light:border-black/20 text-sm text-theme"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Typing Text */}
                    <motion.div
                        className="lg:col-span-7 space-y-8 text-center lg:text-left"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    >
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="inline-block"
                            >
                                <span className="text-sm font-medium accent-theme bg-[var(--accent)]/10 px-4 py-2 rounded-full">
                                    {t('about.badge')}
                                </span>
                            </motion.div>

                            <motion.h2
                                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-snug font-semibold tracking-tight text-theme"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                onViewportEnter={() => setHasStarted(true)}
                            >
                                <SimpleTypingAnimation
                                    text={t('about.text')}
                                    shouldStart={hasStarted}
                                />
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                className="grid sm:grid-cols-2 gap-6 mt-8"
                            >
                                <div className="glass rounded-2xl p-6 space-y-3">
                                    <div className="text-2xl">📱</div>
                                    <h4 className="font-semibold text-theme">{t('about.crossPlatform.title')}</h4>
                                    <p className="text-sm opacity-80 leading-relaxed text-theme">
                                        {t('about.crossPlatform.description')}
                                    </p>
                                </div>
                                <div className="glass rounded-2xl p-6 space-y-3">
                                    <div className="text-2xl">🚀</div>
                                    <h4 className="font-semibold text-theme">{t('about.fullStack.title')}</h4>
                                    <p className="text-sm opacity-80 leading-relaxed text-theme">
                                        {t('about.fullStack.description')}
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4"
                        >
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 hover:bg-[var(--accent)]/20 transition-all font-medium accent-theme"
                                data-scramble
                            >
                                <span>{t('about.cta.workTogether')}</span>
                                <span className="text-sm">→</span>
                            </a>
                            <a
                                href="/cv"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-theme transition-all text-theme"
                                data-scramble
                            >
                                <span>{t('about.cta.viewResume')}</span>
                                <span className="text-sm">↗</span>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}


