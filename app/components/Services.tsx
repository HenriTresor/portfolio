"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function Services() {
    const { t } = useTranslation();
    const services = t('services.items', { returnObjects: true }) as Array<{
        title: string;
        description: string;
        features: string[];
    }>;

    const serviceIcons = ["🌐", "📱", "✨", "🎯"];
    const staticServices = [
        {
            title: "Full-Stack Web Development",
            description: "Complete web applications using React, Next.js, Node.js, and modern databases. Scalable architecture from frontend to backend.",
            icon: "🌐",
            features: ["React & Next.js", "Node.js & APIs", "Database Design", "Cloud Deployment"]
        },
        {
            title: "Mobile App Development",
            description: "Native and cross-platform mobile applications for iOS and Android using React Native, Flutter, and native technologies.",
            icon: "📱",
            features: ["React Native", "Flutter", "iOS Development", "Android Development"]
        },
        {
            title: "UI/UX Design & Motion",
            description: "Beautiful, intuitive interfaces with smooth animations and micro-interactions. Design systems that scale across platforms.",
            icon: "✨",
            features: ["Design Systems", "Framer Motion", "Prototyping", "User Research"]
        },
        {
            title: "Technical Consulting",
            description: "Strategic technical guidance, architecture planning, and technology stack recommendations for your digital projects.",
            icon: "🎯",
            features: ["Architecture Planning", "Tech Stack Selection", "Code Review", "Performance Audit"]
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % (services.length || 4));
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + (services.length || 4)) % (services.length || 4));
    };

    // Use static services as fallback if translations fail
    const currentService = services[currentIndex] || staticServices[currentIndex];

    return (
        <motion.div
            className="space-y-12 py-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Header */}
            <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h2 className="text-5xl sm:text-7xl font-semibold">{t('services.title')}</h2>
                <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto">
                    {t('services.subtitle')}
                </p>
            </motion.div>

            {/* Simple Carousel */}
            <motion.div
                className="relative max-w-4xl mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {/* Navigation */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={goToPrev}
                        className="p-3 rounded-full glass hover:bg-white/10 transition-all"
                        data-cursor="hover"
                    >
                        ←
                    </button>

                    <div className="flex gap-2">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-[var(--accent)] w-6' : 'bg-white/30'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={goToNext}
                        className="p-3 rounded-full glass hover:bg-white/10 transition-all"
                        data-cursor="hover"
                    >
                        →
                    </button>
                </div>

                {/* Current Service Card */}
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="glass rounded-3xl p-8 text-center min-h-[400px] flex flex-col justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-6xl mb-6"
                    >
                        {serviceIcons[currentIndex]}
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl sm:text-3xl font-semibold mb-4 text-[var(--accent)]"
                    >
                        {currentService?.title}
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-base sm:text-lg opacity-90 mb-6 leading-relaxed max-w-2xl mx-auto"
                    >
                        {currentService?.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {(currentService?.features || []).map((feature, index) => (
                            <motion.span
                                key={feature}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                                className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm"
                            >
                                {feature}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Quote */}
            <motion.div
                className="text-center mt-16 px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <blockquote className="text-2xl sm:text-3xl font-light italic mb-4 opacity-90">
                    {t('services.quote')}
                </blockquote>
                <cite className="text-base opacity-70">{t('services.quoteAuthor')}</cite>
            </motion.div>

            {/* CTA */}
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <p className="text-lg opacity-80 mb-6">{t('services.cta.ready')}</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a
                        href="/contact"
                        className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition font-medium"
                        data-scramble
                    >
                        {t('services.cta.startProject')}
                    </a>
                    <a
                        href="/cv"
                        className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition opacity-80 hover:opacity-100"
                        data-scramble
                    >
                        {t('services.cta.viewCredentials')}
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
}