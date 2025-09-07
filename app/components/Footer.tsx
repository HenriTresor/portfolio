"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <motion.footer
            className="relative pt-24 pb-12 mt-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute top-20 right-20 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
                    {/* Brand Section */}
                    <motion.div
                        className="lg:col-span-1 space-y-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="space-y-4">
                            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[var(--accent)] to-[var(--foreground)] bg-clip-text text-transparent">
                                Henri Tresor
                            </h3>
                            <p className="text-base opacity-80 leading-relaxed max-w-md text-theme">
                                {t('footer.description')}
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[
                                { name: "GitHub", href: "https://github.com/henritresor", icon: <Github className="w-5 h-5" /> },
                                { name: "LinkedIn", href: "https://linkedin.com/in/henritresor", icon: <Linkedin className="w-5 h-5" /> },
                                { name: "Email", href: "mailto:shimwamanahenritresor@gmail.com", icon: <Mail className="w-5 h-5" /> }
                            ].map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? '_blank' : undefined}
                                    rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                                    className="w-12 h-12 glass rounded-full flex items-center justify-center hover-light transition-all text-theme"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Navigation & Contact */}
                    <motion.div
                        className="lg:col-span-2 grid sm:grid-cols-2 gap-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {/* Quick Links */}
                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold accent-theme">{t('footer.quickLinks')}</h4>
                            <ul className="space-y-3">
                                {[
                                    { key: "about", href: "/#about" },
                                    { key: "services", href: "/#services" },
                                    { key: "projects", href: "/#projects" },
                                    { key: "skills", href: "/#skills" },
                                    { key: "faq", href: "/#faq" },
                                    { key: "contact", href: "/contact" }
                                ].map((link, index) => (
                                    <motion.li
                                        key={link.key}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                    >
                                        <a
                                            href={link.href}
                                            className="text-base opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all text-theme"
                                            data-scramble
                                        >
                                            {t(`nav.${link.key}.title`)}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold accent-theme">{t('footer.getInTouch')}</h4>
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.8 }}
                                >
                                    <p className="text-sm opacity-70 mb-2 text-theme">{t('footer.location')}</p>
                                    <p className="text-base opacity-90 text-theme">{t('footer.locationValue')}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.9 }}
                                >
                                    <p className="text-sm opacity-70 mb-2 text-theme">{t('footer.availability')}</p>
                                    <p className="text-base opacity-90 text-theme">{t('footer.availabilityValue')}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 1.0 }}
                                >
                                    <a
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 hover:bg-[var(--accent)]/20 transition-all text-sm font-medium accent-theme"
                                        data-scramble
                                    >
                                        {t('footer.startProject')}
                                        <span>→</span>
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                >
                    <p className="text-sm opacity-60 text-theme">
                        © {new Date().getFullYear()} Henri Tresor. {t('footer.copyright')}
                    </p>
                    <div className="flex gap-6 text-sm opacity-70">
                        <a href="/cv" className="hover:opacity-100 transition-opacity flex items-center gap-2 text-theme" data-scramble>
                            <Download className="w-4 h-4" />
                            {t('footer.downloadCV')}
                        </a>
                        <a href="https://github.com/henritresor" target="_blank" rel="noreferrer" className="hover:opacity-100 transition-opacity flex items-center gap-2 text-theme" data-scramble>
                            <ExternalLink className="w-4 h-4" />
                            GitHub
                        </a>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
}


