"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Zap, Rocket, Settings, MessageCircle, FileDown, Github, HelpCircle, Menu } from "lucide-react";
import { useTranslation } from 'react-i18next';
import Link from "next/link";
import { useNavbar } from './ClientLayout';

export default function Navbar() {
    const { t } = useTranslation();
    const { isNavbarOpen, setIsNavbarOpen } = useNavbar();
    const [open, setOpen] = useState(false);

    // Sync local state with context
    useEffect(() => {
        setIsNavbarOpen(open);
    }, [open, setIsNavbarOpen]);

    // Lock scroll when menu is open
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        if (open) {
            const prevHtml = html.style.overflow;
            const prevBody = body.style.overflow;
            html.style.overflow = "hidden";
            body.style.overflow = "hidden";
            return () => {
                html.style.overflow = prevHtml;
                body.style.overflow = prevBody;
            };
        }
    }, [open]);

    return (
        <>
            <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
                <div className="px-5 py-4 sm:py-5 flex items-center justify-between bg-transparent backdrop-blur-none border-none">
                    <Link href="/#hero" className="pointer-events-auto select-none">
                        <span className="text-2xl font-semibold tracking-tight text-theme">HT</span>
                    </Link>
                    <motion.button
                        aria-label="Open menu"
                        className="pointer-events-auto glass rounded-full p-3 hover-light transition-all group"
                        onClick={() => setOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Menu className="w-5 h-5 text-theme" />
                    </motion.button>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.23, 1, 0.320, 1],
                            opacity: { duration: 0.3 }
                        }}
                        className="fixed inset-0 z-50 bg-[var(--background)] overflow-y-auto"
                    >
                        {/* Animated Background */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <motion.div
                                className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl"
                                initial={{ opacity: 0, scale: 0.3, x: -200, y: -200 }}
                                animate={{
                                    opacity: [0, 0.4, 0.6, 0.4],
                                    scale: [0.3, 0.8, 1.2, 0.8],
                                    x: [-200, -100, 50, -100],
                                    y: [-200, -100, 50, -100]
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.3,
                                    x: -200,
                                    y: -200,
                                    transition: { duration: 0.4 }
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                            />
                            <motion.div
                                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--accent)]/5 rounded-full blur-3xl"
                                initial={{ opacity: 0, scale: 0.3, x: 200, y: 200 }}
                                animate={{
                                    opacity: [0, 0.2, 0.5, 0.2],
                                    scale: [0.3, 0.6, 1, 0.6],
                                    x: [200, 100, -50, 100],
                                    y: [200, 100, -50, 100]
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.3,
                                    x: 200,
                                    y: 200,
                                    transition: { duration: 0.4 }
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                            />
                        </div>

                        {/* Header */}
                        <motion.div
                            className="sticky top-0 bg-[var(--background)] backdrop-blur-md border-b border-white/10 dark:border-white/10 light:border-black/10 px-8 py-6 flex items-center justify-between z-10"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.320, 1] }}
                        >
                            <Link
                                href="/#hero"
                                className="select-none"
                                onClick={() => setOpen(false)}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[var(--accent)] to-[var(--foreground)] bg-clip-text text-transparent">
                                        Henri Tresor
                                    </span>
                                </motion.div>
                            </Link>
                            <motion.button
                                aria-label="Close menu"
                                className="glass rounded-full p-3 hover-light transition-all group text-theme"
                                onClick={() => setOpen(false)}
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>
                        </motion.div>

                        {/* Main Content */}
                        <motion.div
                            className="px-8 py-12"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.320, 1] }}
                        >
                            <div className="max-w-4xl mx-auto">
                                {/* Large Navigation Links */}
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 40 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="mb-16"
                                >
                                    <motion.ul
                                        initial="hidden"
                                        animate="show"
                                        exit="hidden"
                                        variants={{
                                            hidden: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    staggerDirection: -1,
                                                    when: "afterChildren"
                                                }
                                            },
                                            show: {
                                                transition: {
                                                    staggerChildren: 0.15,
                                                    delayChildren: 0.2
                                                }
                                            }
                                        }}
                                        className="space-y-6"
                                    >
                                        {[
                                            { key: "home", href: "/", icon: <Home className="w-8 h-8" /> },
                                            { key: "about", href: "/#about", icon: <User className="w-8 h-8" /> },
                                            { key: "services", href: "/#services", icon: <Zap className="w-8 h-8" /> },
                                            { key: "projects", href: "/#projects", icon: <Rocket className="w-8 h-8" /> },
                                            { key: "skills", href: "/#skills", icon: <Settings className="w-8 h-8" /> },
                                            { key: "faq", href: "/#faq", icon: <HelpCircle className="w-8 h-8" /> },
                                            { key: "contact", href: "/contact", icon: <MessageCircle className="w-8 h-8" /> }
                                        ].map((link) => (
                                            <motion.li
                                                key={link.key}
                                                variants={{
                                                    hidden: { x: -50, opacity: 0, scale: 0.9 },
                                                    show: { x: 0, opacity: 1, scale: 1 }
                                                }}
                                                transition={{ duration: 0.5, ease: [0.23, 1, 0.320, 1] }}
                                            >
                                                <motion.a
                                                    href={link.href}
                                                    onClick={() => setOpen(false)}
                                                    className="group block p-6 rounded-3xl hover-light transition-all duration-300"
                                                    whileHover={{
                                                        x: 12,
                                                        scale: 1.02,
                                                        backgroundColor: "rgba(154, 199, 255, 0.08)"
                                                    }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="flex items-center gap-6">
                                                        <motion.div
                                                            className="flex items-center justify-center"
                                                            whileHover={{
                                                                scale: 1.3,
                                                                rotate: [0, -15, 15, 0],
                                                                y: [0, -5, 0]
                                                            }}
                                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                                        >
                                                            {link.icon}
                                                        </motion.div>
                                                        <div className="flex-1">
                                                            <h3 className="text-2xl sm:text-3xl font-bold group-hover:text-[var(--accent)] transition-colors duration-300 text-theme">
                                                                {t(`nav.${link.key}.title`)}
                                                            </h3>
                                                            <p className="text-base opacity-70 mt-1 group-hover:opacity-90 transition-opacity text-theme">
                                                                {t(`nav.${link.key}.desc`)}
                                                            </p>
                                                        </div>
                                                        <motion.svg
                                                            className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-all"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            whileHover={{ x: 10, scale: 1.3 }}
                                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </motion.svg>
                                                    </div>
                                                </motion.a>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.div>

                                {/* Bottom Section */}
                                <motion.div
                                    className="grid md:grid-cols-2 gap-8"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 40 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    {/* External Links */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.5, delay: 1.0 }}
                                        className="space-y-4"
                                    >
                                        <h3 className="text-xl font-bold accent-theme mb-6">{t('footer.quickLinks')}</h3>
                                        <div className="space-y-3">
                                            <motion.a
                                                href="/cv"
                                                className="group flex items-center gap-4 p-4 glass rounded-2xl hover-light transition-all text-theme"
                                                whileHover={{ scale: 1.03, x: 8 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <div className="flex items-center justify-center w-8 h-8 group-hover:scale-110 transition-transform">
                                                    <FileDown className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold">{t('footer.downloadCV')}</div>
                                                    <div className="text-sm opacity-70">View my credentials</div>
                                                </div>
                                            </motion.a>

                                            <motion.a
                                                href="https://github.com/henritresor"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group flex items-center gap-4 p-4 glass rounded-2xl hover-light transition-all text-theme"
                                                whileHover={{ scale: 1.03, x: 8 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <div className="flex items-center justify-center w-8 h-8 group-hover:scale-110 transition-transform">
                                                    <Github className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold">GitHub Profile</div>
                                                    <div className="text-sm opacity-70">50+ repositories</div>
                                                </div>
                                            </motion.a>
                                        </div>
                                    </motion.div>

                                    {/* Contact Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 30 }}
                                        transition={{ duration: 0.5, delay: 1.2 }}
                                        className="glass rounded-3xl p-8 space-y-6 relative overflow-hidden"
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1, delay: 1.3 }}
                                        />
                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold text-[var(--accent)] mb-2">{t('footer.getInTouch')}</h3>
                                            <p className="text-sm opacity-90 leading-relaxed mb-6">
                                                {t('footer.description')}
                                            </p>
                                            <motion.a
                                                href="/contact"
                                                onClick={() => setOpen(false)}
                                                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 hover:bg-[var(--accent)]/30 transition-all font-semibold"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <span>{t('footer.startProject')}</span>
                                                <motion.span
                                                    whileHover={{ x: 4 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                >
                                                    →
                                                </motion.span>
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Footer */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: 1.6 }}
                                    className="text-center pt-12 pb-8 mt-16 border-t border-white/10"
                                >
                                    <p className="text-sm opacity-60">© 2024 Henri Tresor. {t('footer.copyright')}</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}