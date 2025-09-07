"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Code, Globe, Server, Database } from "lucide-react";

export default function TechStackOptimized() {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState(0);

    const categories = [
        {
            name: "Frontend",
            icon: "🎨",
            techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native"]
        },
        {
            name: "Backend",
            icon: "⚙️",
            techs: ["Node.js", "Python", "Django", "PostgreSQL", "MongoDB"]
        },
        {
            name: "Mobile",
            icon: "📱",
            techs: ["React Native", "Flutter", "Expo", "iOS", "Android"]
        },
        {
            name: "Tools",
            icon: "🛠️",
            techs: ["Git/GitHub", "Docker", "Vercel", "Google Cloud", "AI APIs"]
        }
    ];

    return (
        <div className="space-y-8 py-5">
            {/* Header */}
            <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
            >
                <div className="inline-block">
                    <span className="text-sm font-medium text-[var(--accent)] bg-[var(--accent)]/10 px-4 py-2 rounded-full">
                        {t('skills.badge')}
                    </span>
                </div>
                <h2 className="text-5xl sm:text-7xl font-semibold">{t('skills.title')}</h2>
                <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto">
                    {t('skills.subtitle')}
                </p>
            </motion.div>

            {/* Category Navigation */}
            <div className="flex justify-center items-center gap-4">
                <button
                    onClick={() => setActiveCategory((prev) => (prev - 1 + categories.length) % categories.length)}
                    className="p-3 glass rounded-full hover:bg-white/10 transition-all"
                >
                    ←
                </button>

                <div className="flex gap-2">
                    {categories.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === activeCategory ? 'bg-[var(--accent)] w-6' : 'bg-white/30'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => setActiveCategory((prev) => (prev + 1) % categories.length)}
                    className="p-3 glass rounded-full hover:bg-white/10 transition-all"
                >
                    →
                </button>
            </div>

            {/* Current Category */}
            <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl mx-auto"
            >
                <div className="glass rounded-3xl p-8 text-center">
                    <div className="space-y-6">
                        <div className="text-5xl">{categories[activeCategory].icon}</div>

                        <h3 className="text-2xl font-bold text-[var(--accent)]">
                            {categories[activeCategory].name}
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {categories[activeCategory].techs.map((tech, index) => (
                                <motion.div
                                    key={tech}
                                    className="glass rounded-xl p-4 hover:bg-white/10 transition-all"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                >
                                    <div className="text-sm font-medium">{tech}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <div className="text-center glass rounded-xl p-4">
                    <div className="text-2xl font-bold text-[var(--accent)]">25+</div>
                    <div className="text-xs opacity-70">{t('skills.stats.technologies')}</div>
                </div>
                <div className="text-center glass rounded-xl p-4">
                    <div className="text-2xl font-bold text-[var(--accent)]">4</div>
                    <div className="text-xs opacity-70">{t('skills.stats.categories')}</div>
                </div>
                <div className="text-center glass rounded-xl p-4">
                    <div className="text-2xl font-bold text-[var(--accent)]">3+</div>
                    <div className="text-xs opacity-70">{t('skills.stats.years')}</div>
                </div>
                <div className="text-center glass rounded-xl p-4">
                    <div className="text-2xl font-bold text-[var(--accent)]">∞</div>
                    <div className="text-xs opacity-70">Learning</div>
                </div>
            </motion.div>

            {/* Quote */}
            <motion.div
                className="text-center px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <blockquote className="text-lg sm:text-xl font-light italic mb-2 opacity-90">
                    {t('skills.quote')}
                </blockquote>
                <cite className="text-sm opacity-70">{t('skills.quoteAuthor')}</cite>
            </motion.div>
        </div>
    );
}
