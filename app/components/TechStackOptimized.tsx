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
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiBootstrap,
    SiVuedotjs,
    SiFlutter,
    SiNodedotjs,
    SiDjango,
    SiSpring,
    SiPostgresql,
    SiMongodb,
    SiGithub,
    SiDocker,
    SiVercel,
    SiPython,
    SiTensorflow
} from "react-icons/si";

export default function TechStackOptimized() {
    const { t } = useTranslation();

    // Mobile: Simple category index
    const [activeMobileCategory, setActiveMobileCategory] = useState(0);

    // Desktop: Category key for tabs
    const [activeDesktopCategory, setActiveDesktopCategory] = useState<keyof typeof techCategories>("frontend");

    const techCategories = {
        frontend: {
            title: "Frontend",
            icon: <Palette className="w-5 h-5" />,
            color: "from-blue-500/20 to-purple-500/20",
            borderColor: "border-blue-500/30",
            technologies: [
                { name: "React", level: 95, icon: <SiReact className="w-6 h-6 text-[#61DAFB]" /> },
                { name: "Next.js", level: 90, icon: <SiNextdotjs className="w-6 h-6" /> },
                { name: "Vue.js", level: 80, icon: <SiVuedotjs className="w-6 h-6 text-[#4FC08D]" /> },
                { name: "TypeScript", level: 85, icon: <SiTypescript className="w-6 h-6 text-[#3178C6]" /> },
                { name: "Tailwind CSS", level: 90, icon: <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" /> },
                { name: "Bootstrap", level: 85, icon: <SiBootstrap className="w-6 h-6 text-[#7952B3]" /> }
            ]
        },
        backend: {
            title: "Backend",
            icon: <Server className="w-5 h-5" />,
            color: "from-orange-500/20 to-red-500/20",
            borderColor: "border-orange-500/30",
            technologies: [
                { name: "Node.js", level: 90, icon: <SiNodedotjs className="w-6 h-6 text-[#339933]" /> },
                { name: "Python", level: 85, icon: <SiPython className="w-6 h-6 text-[#3776AB]" /> },
                { name: "Django", level: 80, icon: <SiDjango className="w-6 h-6 text-[#092E20]" /> },
                { name: "Spring Boot", level: 75, icon: <SiSpring className="w-6 h-6 text-[#6DB33F]" /> },
                { name: "PostgreSQL", level: 85, icon: <SiPostgresql className="w-6 h-6 text-[#336791]" /> },
                { name: "MongoDB", level: 85, icon: <SiMongodb className="w-6 h-6 text-[#47A248]" /> }
            ]
        },
        mobile: {
            title: "Mobile",
            icon: <Smartphone className="w-5 h-5" />,
            color: "from-green-500/20 to-teal-500/20",
            borderColor: "border-green-500/30",
            technologies: [
                { name: "React Native", level: 90, icon: <SiReact className="w-6 h-6 text-[#61DAFB]" /> },
                { name: "Flutter", level: 75, icon: <SiFlutter className="w-6 h-6 text-[#02569B]" /> },
                { name: "Expo", level: 85, icon: <Globe className="w-6 h-6 text-[var(--accent)]" /> },
                { name: "iOS Dev", level: 70, icon: <Smartphone className="w-6 h-6 text-[var(--accent)]" /> },
                { name: "Android Dev", level: 75, icon: <Smartphone className="w-6 h-6 text-[#3DDC84]" /> }
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
                { name: "CI/CD", level: 85, icon: <Zap className="w-6 h-6 text-[var(--accent)]" /> },
                { name: "Vercel", level: 90, icon: <SiVercel className="w-6 h-6" /> },
                { name: "Machine Learning", level: 75, icon: <SiTensorflow className="w-6 h-6 text-[#FF6F00]" /> }
            ]
        }
    };

    const categoryKeys = Object.keys(techCategories) as (keyof typeof techCategories)[];

    // Get current category for mobile
    const currentMobileCategory = categoryKeys[activeMobileCategory];
    const currentMobileCategoryData = techCategories[currentMobileCategory];

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

            {/* Mobile: Simple Navigation */}
            <div className="block lg:hidden">
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={() => setActiveMobileCategory((prev) => (prev - 1 + categoryKeys.length) % categoryKeys.length)}
                        className="p-3 glass rounded-full hover:bg-white/10 transition-all"
                    >
                        ←
                    </button>

                    <div className="flex gap-2">
                        {categoryKeys.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveMobileCategory(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === activeMobileCategory ? 'bg-[var(--accent)] w-6' : 'bg-white/30'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setActiveMobileCategory((prev) => (prev + 1) % categoryKeys.length)}
                        className="p-3 glass rounded-full hover:bg-white/10 transition-all"
                    >
                        →
                    </button>
                </div>

                {/* Mobile: Current Category */}
                <motion.div
                    key={activeMobileCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-8"
                >
                    <div className="glass rounded-3xl p-6 text-center max-w-2xl mx-auto">
                        <div className="space-y-6">
                            <div className="text-4xl">{currentMobileCategoryData.title === "Frontend" ? "🎨" :
                                currentMobileCategoryData.title === "Backend" ? "⚙️" :
                                    currentMobileCategoryData.title === "Mobile" ? "📱" : "🛠️"}</div>

                            <h3 className="text-xl font-bold text-[var(--accent)]">
                                {currentMobileCategoryData.title}
                            </h3>

                            <div className="space-y-3">
                                {currentMobileCategoryData.technologies.map((tech, index) => (
                                    <motion.div
                                        key={tech.name}
                                        className="flex items-center justify-between p-3 glass rounded-xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-6 h-6">{tech.icon}</div>
                                            <span className="text-sm font-medium">{tech.name}</span>
                                        </div>
                                        <span className="text-xs text-[var(--accent)] font-medium">{tech.level}%</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Desktop: Tabbed Interface */}
            <div className="hidden lg:block">
                <div className="flex justify-center mb-8">
                    <div className="glass rounded-2xl p-2 flex gap-2">
                        {Object.entries(techCategories).map(([key, category]) => (
                            <motion.button
                                key={key}
                                onClick={() => setActiveDesktopCategory(key as keyof typeof techCategories)}
                                className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${activeDesktopCategory === key
                                    ? `bg-gradient-to-r ${category.color} border ${category.borderColor}`
                                    : 'hover:bg-white/10'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="flex items-center justify-center">{category.icon}</span>
                                <span className="font-medium">{category.title}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Desktop: Technologies Grid */}
                <motion.div
                    key={activeDesktopCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {techCategories[activeDesktopCategory].technologies.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            className="glass rounded-2xl p-6 hover:bg-white/10 transition-all"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
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
            </div>

            {/* Stats */}
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