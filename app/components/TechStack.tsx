"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import {
    Palette,
    Smartphone,
    Server,
    Database,
    Settings,
    Code,
    Globe,
    Zap,
    Coffee
} from "lucide-react";
// Lazy load icons to reduce initial bundle size
import { 
    SiReact, 
    SiNextdotjs, 
    SiTypescript, 
    SiTailwindcss, 
    SiBootstrap,
    SiFlutter,
    SiNodedotjs,
    SiDjango,
    SiPostgresql,
    SiMongodb,
    SiGithub,
    SiDocker,
    SiVercel,
    SiPython
} from "react-icons/si";

export default function TechStack() {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState("frontend");

    const techCategories = {
        frontend: {
            title: "Frontend",
            icon: <Palette className="w-5 h-5" />,
            color: "from-blue-500/20 to-purple-500/20",
            borderColor: "border-blue-500/30",
            technologies: [
                { name: "React", level: 95, icon: <SiReact className="w-6 h-6 text-[#61DAFB]" /> },
                { name: "Next.js", level: 90, icon: <SiNextdotjs className="w-6 h-6" /> },
                { name: "React Native", level: 90, icon: <SiReact className="w-6 h-6 text-[#61DAFB]" /> },
                { name: "TypeScript", level: 85, icon: <SiTypescript className="w-6 h-6 text-[#3178C6]" /> },
                { name: "Tailwind CSS", level: 90, icon: <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" /> },
                { name: "Bootstrap", level: 85, icon: <SiBootstrap className="w-6 h-6 text-[#7952B3]" /> }
            ]
        },
        mobile: {
            title: "Mobile & Other",
            icon: <Smartphone className="w-5 h-5" />,
            color: "from-green-500/20 to-teal-500/20",
            borderColor: "border-green-500/30",
            technologies: [
                { name: "Flutter", level: 75, icon: <SiFlutter className="w-6 h-6 text-[#02569B]" /> },
                { name: "Expo", level: 85, icon: <Globe className="w-6 h-6 text-[var(--accent)]" /> },
                { name: "iOS Dev", level: 70, icon: <Smartphone className="w-6 h-6 text-[var(--accent)]" /> },
                { name: "Android Dev", level: 75, icon: <Smartphone className="w-6 h-6 text-[#3DDC84]" /> },
                { name: "Unity", level: 70, icon: <Settings className="w-6 h-6" /> },
                { name: "Python", level: 85, icon: <SiPython className="w-6 h-6 text-[#3776AB]" /> }
            ]
        },
        backend: {
            title: "Backend",
            icon: <Server className="w-5 h-5" />,
            color: "from-orange-500/20 to-red-500/20",
            borderColor: "border-orange-500/30",
            technologies: [
                { name: "Node.js", level: 90, icon: <SiNodedotjs className="w-6 h-6 text-[#339933]" /> },
                { name: "Django", level: 80, icon: <SiDjango className="w-6 h-6 text-[#092E20]" /> },
                { name: "Spring Boot", level: 75, icon: <Coffee className="w-6 h-6 text-[#6DB33F]" /> },
                { name: "Flask", level: 80, icon: <Coffee className="w-6 h-6" /> },
                { name: "FastAPI", level: 85, icon: <Zap className="w-6 h-6 text-[#009688]" /> },
                { name: "REST APIs", level: 90, icon: <Code className="w-6 h-6 text-[var(--accent)]" /> }
            ]
        },
        database: {
            title: "Database",
            icon: <Database className="w-5 h-5" />,
            color: "from-teal-500/20 to-cyan-500/20",
            borderColor: "border-teal-500/30",
            technologies: [
                { name: "PostgreSQL", level: 85, icon: <SiPostgresql className="w-6 h-6 text-[#336791]" /> },
                { name: "MySQL", level: 80, icon: <Database className="w-6 h-6 text-[#4479A1]" /> },
                { name: "MongoDB", level: 85, icon: <SiMongodb className="w-6 h-6 text-[#47A248]" /> }
            ]
        },
        tools: {
            title: "DevOps & Tools",
            icon: <Settings className="w-5 h-5" />,
            color: "from-purple-500/20 to-pink-500/20",
            borderColor: "border-purple-500/30",
            technologies: [
                { name: "Git/GitHub", level: 95, icon: <SiGithub className="w-6 h-6" /> },
                { name: "Docker", level: 80, icon: <SiDocker className="w-6 h-6 text-[#2496ED]" /> },
                { name: "CI/CD", level: 75, icon: <Zap className="w-6 h-6 text-[var(--accent)]" /> },
                { name: "Google Cloud", level: 70, icon: <Globe className="w-6 h-6 text-[#4285F4]" /> },
                { name: "Vercel", level: 90, icon: <SiVercel className="w-6 h-6" /> },
                { name: "Machine Learning", level: 75, icon: <Coffee className="w-6 h-6 text-[var(--accent)]" /> }
            ]
        }
    };

    return (
        <motion.div
            className="space-y-12 py-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* Header */}
            <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
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

            {/* Category Tabs */}
            <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {/* Mobile: Scrollable Tabs */}
                <div className="block sm:hidden">
                    <div className="glass rounded-2xl p-2 overflow-hidden">
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                            {Object.entries(techCategories).map(([key, category]) => (
                                <motion.button
                                    key={key}
                                    onClick={() => setActiveCategory(key)}
                                    className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${activeCategory === key
                                        ? `bg-gradient-to-r ${category.color} border ${category.borderColor}`
                                        : 'hover:bg-white/10'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    data-cursor="hover"
                                >
                                    <span className="flex items-center justify-center">{category.icon}</span>
                                    <span className="font-medium text-sm">{t(`skills.categories.${key}`)}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop: Tabs */}
                <div className="hidden sm:flex justify-center">
                    <div className="glass rounded-2xl p-2 flex gap-2">
                        {Object.entries(techCategories).map(([key, category]) => (
                            <motion.button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${activeCategory === key
                                    ? `bg-gradient-to-r ${category.color} border ${category.borderColor}`
                                    : 'hover:bg-white/10'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                data-cursor="hover"
                            >
                                <span className="flex items-center justify-center">{category.icon}</span>
                                <span className="font-medium">{t(`skills.categories.${key}`)}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Technologies Grid */}
            <motion.div
                key={activeCategory}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {techCategories[activeCategory as keyof typeof techCategories].technologies.map((tech, index) => (
                    <motion.div
                        key={tech.name}
                        className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        data-cursor="hover"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8">{tech.icon}</div>
                                <h3 className="font-semibold text-lg">{tech.name}</h3>
                            </div>
                            <span className="text-sm text-[var(--accent)] font-medium">{tech.level}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/60 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${tech.level}%` }}
                                transition={{ duration: 0.5, delay: index * 0.05 + 0.1, ease: "easeOut" }}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Fun Stats */}
            <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3 }}
            >
                <div className="text-center glass rounded-2xl p-6">
                    <motion.div
                        className="text-3xl font-bold text-[var(--accent)] mb-2"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        25+
                    </motion.div>
                    <p className="text-sm opacity-80">{t('skills.stats.technologies')}</p>
                </div>
                <div className="text-center glass rounded-2xl p-6">
                    <motion.div
                        className="text-3xl font-bold text-[var(--accent)] mb-2"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                    >
                        5
                    </motion.div>
                    <p className="text-sm opacity-80">{t('skills.stats.categories')}</p>
                </div>
                <div className="text-center glass rounded-2xl p-6">
                    <motion.div
                        className="text-3xl font-bold text-[var(--accent)] mb-2"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                    >
                        3+
                    </motion.div>
                    <p className="text-sm opacity-80">{t('skills.stats.years')}</p>
                </div>
                <div className="text-center glass rounded-2xl p-6">
                    <motion.div
                        className="text-3xl font-bold text-[var(--accent)] mb-2"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                    >
                        ∞
                    </motion.div>
                    <p className="text-sm opacity-80">{t('skills.stats.learning')}</p>
                </div>
            </motion.div>

            {/* Quote */}
            <motion.div
                className="text-center mt-16 px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <blockquote className="text-xl sm:text-2xl font-light italic mb-4 opacity-90">
                    {t('skills.quote')}
                </blockquote>
                <cite className="text-base opacity-70">{t('skills.quoteAuthor')}</cite>
            </motion.div>
        </motion.div>
    );
}
