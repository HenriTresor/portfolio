"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function Projects() {
    const { t } = useTranslation();
    const [activeProject, setActiveProject] = useState(0);

    const projects = [
        {
            title: "Projexess",
            href: "https://projexess.onrender.com",
            description: "An AI-integrated project management tool designed to help managers make data-driven decisions. Projexess analyzes market trends, predicts timeline, and delivers accurate metrics to streamline planning and boost productivity.",
            tech: ["React", "Node.js", "Python", "AI APIs"],
            category: "AI Project Management",
            status: "Live",
            image: "🤖",
            year: "2024"
        },
        {
            title: "Verba",
            href: "https://github.com/henritresor/verba.git",
            description: "Real-time mobile translator with conversation recording, multilingual support, and translation history management. Perfect for travelers and international communication.",
            tech: ["React Native", "Expo", "Supabase", "Fast API"],
            category: "Mobile Translation",
            status: "GitHub",
            image: "🌍",
            year: "2024"
        },
        {
            title: "Conexus",
            href: "https://conexus-app.vercel.app",
            description: "An accessibility-focused application that empowers individuals with disabilities to better interact with digital systems and navigate both indoor and outdoor environments more easily.",
            tech: ["Next.js", "React Native", "Node.js", "Unity"],
            category: "Accessibility Platform",
            status: "Live",
            image: "♿",
            year: "2024",
            additionalLink: "https://conexus-web-rho.vercel.app"
        },
        {
            title: "Twezimbe",
            href: "https://twezimbe-frontend.vercel.app",
            description: "A crowd funding and group management tool that simplifies contribution tracking and financial transparency. Helps communities and organizations manage collective funding efficiently.",
            tech: ["React", "Node.js", "PostgreSQL"],
            category: "Crowdfunding Platform",
            status: "Live",
            image: "💰",
            year: "2024"
        }
    ];

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
                        {t('projects.badge')}
                    </span>
                </div>
                <h2 className="text-5xl sm:text-7xl font-semibold">{t('projects.title')}</h2>
                <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto">
                    {t('projects.subtitle')}
                </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Featured Project */}
                <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <motion.a
                        href={projects[activeProject].href}
                        target="_blank"
                        rel="noreferrer"
                        className="group block glass rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
                        whileHover={{ y: -8 }}
                        data-cursor="hover"
                    >
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl">{projects[activeProject].image}</span>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-2xl sm:text-3xl font-bold group-hover:text-[var(--accent)] transition-colors">
                                                {projects[activeProject].title}
                                            </h3>
                                            <span className={`text-xs px-2 py-1 rounded-full border ${projects[activeProject].status === 'Live'
                                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                                : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                                }`}>
                                                {projects[activeProject].status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm opacity-70">{projects[activeProject].category}</span>
                                            <span className="text-xs opacity-50">•</span>
                                            <span className="text-xs opacity-50">{projects[activeProject].year}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-base sm:text-lg opacity-90 leading-relaxed">
                                    {projects[activeProject].description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {projects[activeProject].tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-[var(--accent)] group-hover:gap-3 transition-all">
                                        <span className="font-medium">View Project</span>
                                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                    {projects[activeProject].additionalLink && (
                                        <a
                                            href={projects[activeProject].additionalLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm text-[var(--accent)]/70 hover:text-[var(--accent)] transition-colors underline underline-offset-2"
                                        >
                                            Live 2 ↗
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 via-[var(--accent)]/10 to-transparent border border-white/10 flex items-center justify-center text-6xl">
                                    {projects[activeProject].image}
                                </div>
                                <motion.div
                                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    whileHover={{ scale: 1.02 }}
                                />
                            </div>
                        </div>
                    </motion.a>
                </motion.div>

                {/* Project Thumbnails */}
                <div className="lg:col-span-2">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {projects.map((project, index) => (
                            <motion.button
                                key={project.title}
                                onClick={() => setActiveProject(index)}
                                className={`group text-left p-4 rounded-2xl transition-all duration-300 ${activeProject === index
                                    ? 'bg-[var(--accent)]/10 border border-[var(--accent)]/30'
                                    : 'glass hover:bg-white/10'
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                whileHover={{ y: -4 }}
                                data-cursor="hover"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">{project.image}</span>
                                    <div className="flex-1">
                                        <h4 className={`font-semibold text-sm ${activeProject === index ? 'text-[var(--accent)]' : ''
                                            }`}>
                                            {project.title}
                                        </h4>
                                        <p className="text-xs opacity-70">{project.category}</p>
                                    </div>
                                </div>
                                <p className="text-xs opacity-80 leading-relaxed line-clamp-2">
                                    {project.description}
                                </p>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <motion.div
                className="grid sm:grid-cols-3 gap-6 mt-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                <div className="text-center glass rounded-2xl p-6">
                    <motion.div
                        className="text-3xl font-bold text-[var(--accent)] mb-2"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 1 }}
                    >
                        50+
                    </motion.div>
                    <p className="text-sm opacity-80">Projects Completed</p>
                </div>
                <div className="text-center glass rounded-2xl p-6">
                    <motion.div
                        className="text-3xl font-bold text-[var(--accent)] mb-2"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                    >
                        100%
                    </motion.div>
                    <p className="text-sm opacity-80">Client Satisfaction</p>
                </div>
                <div className="text-center glass rounded-2xl p-6">
                    <motion.div
                        className="text-3xl font-bold text-[var(--accent)] mb-2"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                    >
                        24/7
                    </motion.div>
                    <p className="text-sm opacity-80">Support Available</p>
                </div>
            </motion.div>

            {/* CTA */}
            <motion.div
                className="text-center pt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
            >
                <p className="text-lg opacity-80 mb-6">{t('projects.cta')}</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 hover:bg-[var(--accent)]/20 transition-all font-medium"
                        data-scramble
                    >
                        <span>{t('projects.startProject')}</span>
                        <span className="text-sm">→</span>
                    </a>
                    <a
                        href="https://github.com/henritresor"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
                        data-scramble
                    >
                        <span>{t('projects.viewAll')}</span>
                        <span className="text-sm">↗</span>
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
}
