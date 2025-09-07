"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function ProjectsOptimized() {
    const { t } = useTranslation();
    const [activeProject, setActiveProject] = useState(0);

    const projects = [
        {
            title: "Projexess",
            href: "https://projexess.onrender.com",
            description: "AI-integrated project management tool for data-driven decisions.",
            tech: ["React", "Node.js", "Python", "AI APIs"],
            category: "AI Project Management",
            status: "Live",
            image: "🤖"
        },
        {
            title: "Verba",
            href: "https://github.com/henritresor/verba.git",
            description: "Real-time mobile translator with conversation recording.",
            tech: ["React Native", "Expo", "Supabase", "Fast API"],
            category: "Mobile Translation",
            status: "GitHub",
            image: "🌍"
        },
        {
            title: "Conexus",
            href: "https://conexus-app.vercel.app",
            description: "Accessibility-focused platform for individuals with disabilities.",
            tech: ["Next.js", "React Native", "Node.js", "Unity"],
            category: "Accessibility Platform",
            status: "Live",
            image: "♿"
        },
        {
            title: "Twezimbe",
            href: "https://twezimbe-frontend.vercel.app",
            description: "Crowdfunding and group management tool for communities.",
            tech: ["React", "Node.js", "PostgreSQL"],
            category: "Crowdfunding Platform",
            status: "Live",
            image: "💰"
        }
    ];

    return (
        <div className="space-y-8">
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
                        {t('projects.badge')}
                    </span>
                </div>
                <h2 className="text-5xl sm:text-7xl font-semibold">{t('projects.title')}</h2>
                <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto">
                    {t('projects.subtitle')}
                </p>
            </motion.div>

            {/* Simple Navigation */}
            <div className="flex justify-center items-center gap-6">
                <button
                    onClick={() => setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)}
                    className="p-3 glass rounded-full hover:bg-white/10 transition-all"
                >
                    ←
                </button>
                
                <div className="flex gap-2">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveProject(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === activeProject ? 'bg-[var(--accent)] w-6' : 'bg-white/30'
                            }`}
                        />
                    ))}
                </div>
                
                <button
                    onClick={() => setActiveProject((prev) => (prev + 1) % projects.length)}
                    className="p-3 glass rounded-full hover:bg-white/10 transition-all"
                >
                    →
                </button>
            </div>

            {/* Current Project */}
            <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl mx-auto"
            >
                <a
                    href={projects[activeProject].href}
                    target="_blank"
                    rel="noreferrer"
                    className="block glass rounded-3xl p-8 hover:bg-white/10 transition-all text-center"
                >
                    <div className="space-y-6">
                        <div className="text-5xl">{projects[activeProject].image}</div>
                        
                        <div>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <h3 className="text-2xl font-bold text-[var(--accent)]">
                                    {projects[activeProject].title}
                                </h3>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    projects[activeProject].status === 'Live' 
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-blue-500/20 text-blue-400'
                                }`}>
                                    {projects[activeProject].status}
                                </span>
                            </div>
                            <p className="text-sm opacity-70">{projects[activeProject].category}</p>
                        </div>
                        
                        <p className="text-base opacity-90 leading-relaxed">
                            {projects[activeProject].description}
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-2">
                            {projects[activeProject].tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 rounded-full bg-white/10 text-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="text-[var(--accent)] font-medium">
                            View Project →
                        </div>
                    </div>
                </a>
            </motion.div>

            {/* CTA */}
            <motion.div
                className="text-center pt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <p className="text-lg opacity-80 mb-6">{t('projects.cta')}</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a
                        href="/contact"
                        className="px-6 py-3 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 hover:bg-[var(--accent)]/20 transition-all font-medium"
                        data-scramble
                    >
                        {t('projects.startProject')}
                    </a>
                    <a
                        href="https://github.com/henritresor"
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
                        data-scramble
                    >
                        {t('projects.viewAll')}
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
