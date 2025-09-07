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
            description: "AI-integrated project management tool designed to help managers make data-driven decisions. Projexess analyzes market trends, predicts timeline, and delivers accurate metrics to streamline planning and boost productivity.",
            tech: ["React", "Node.js", "Python", "AI APIs"],
            category: "AI Project Management",
            status: "Live",
            image: "🤖",
            year: "2024",
            features: ["AI-powered project analytics", "Market trend predictions", "Data-driven decision tools", "Timeline optimization"]
        },
        {
            title: "Verba",
            href: "https://github.com/henritresor/verba.git",
            description: "Real-time mobile translator with conversation recording, multilingual support, and translation history management. Perfect for travelers and international communication.",
            tech: ["React Native", "Expo", "Supabase", "Fast API"],
            category: "Mobile Translation",
            status: "GitHub",
            image: "🌍",
            year: "2024",
            features: ["Real-time translation", "Conversation recording", "Multi-language support", "Offline capabilities"]
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
            additionalLink: "https://conexus-web-rho.vercel.app",
            features: ["Accessibility-first design", "Indoor/outdoor navigation", "Digital system integration", "Cross-platform support"]
        },
        {
            title: "Twezimbe",
            href: "https://twezimbe-frontend.vercel.app",
            description: "A crowd funding and group management tool that simplifies contribution tracking and financial transparency. Helps communities and organizations manage collective funding efficiently.",
            tech: ["React", "Node.js", "PostgreSQL"],
            category: "Crowdfunding Platform",
            status: "Live",
            image: "💰",
            year: "2024",
            features: ["Crowdfunding management", "Financial transparency", "Group contribution tracking", "Analytics dashboard"]
        }
    ];

    return (
        <div className="space-y-8 py-5">
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

            {/* Mobile: Simple Carousel */}
            <div className="block lg:hidden">
                <div className="flex justify-center items-center gap-6 mb-6">
                    <button
                        onClick={() => setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)}
                        className="p-3 nav-btn rounded-full transition-all text-theme"
                    >
                        ←
                    </button>

                    <div className="flex gap-2">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveProject(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === activeProject ? 'bg-[var(--accent)] w-6' : 'bg-white/30'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setActiveProject((prev) => (prev + 1) % projects.length)}
                        className="p-3 nav-btn rounded-full transition-all text-theme"
                    >
                        →
                    </button>
                </div>

                <motion.div
                    key={activeProject}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <a
                        href={projects[activeProject].href}
                        target="_blank"
                        rel="noreferrer"
                        className="block glass rounded-3xl p-6 hover:bg-white/10 transition-all text-center"
                    >
                        <div className="space-y-4">
                            <div className="text-4xl">{projects[activeProject].image}</div>
                            <div>
                                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">
                                    {projects[activeProject].title}
                                </h3>
                                <p className="text-sm opacity-70">{projects[activeProject].category}</p>
                            </div>
                            <p className="text-sm opacity-90 leading-relaxed">
                                {projects[activeProject].description}
                            </p>
                            <div className="text-[var(--accent)] font-medium text-sm">
                                View Project →
                            </div>
                        </div>
                    </a>
                </motion.div>
            </div>

            {/* Desktop: Enhanced Layout */}
            <div className="hidden lg:block">
                {/* Project Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="glass rounded-2xl p-2 flex gap-2">
                        {projects.map((project, index) => (
                            <motion.button
                                key={project.title}
                                onClick={() => setActiveProject(index)}
                                className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${activeProject === index
                                    ? 'bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)]'
                                    : 'hover:bg-white/10'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-lg">{project.image}</span>
                                <span className="font-medium text-sm">{project.title}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Enhanced Project Display */}
                <motion.div
                    key={activeProject}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <a
                        href={projects[activeProject].href}
                        target="_blank"
                        rel="noreferrer"
                        className="group block glass rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
                    >
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            {/* Left: Detailed Project Info */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <span className="text-5xl mt-2">{projects[activeProject].image}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-3xl font-bold group-hover:text-[var(--accent)] transition-colors">
                                                {projects[activeProject].title}
                                            </h3>
                                            <span className={`text-xs px-3 py-1 rounded-full border ${projects[activeProject].status === 'Live'
                                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                                : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                                }`}>
                                                {projects[activeProject].status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm opacity-70 mb-4">
                                            <span>{projects[activeProject].category}</span>
                                            <span>•</span>
                                            <span>{projects[activeProject].year}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-lg opacity-90 leading-relaxed">
                                    {projects[activeProject].description}
                                </p>

                                {/* Key Features */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-[var(--accent)]">Key Features</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {projects[activeProject].features?.map((feature) => (
                                            <div key={feature} className="flex items-center gap-2 text-sm opacity-80">
                                                <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full flex-shrink-0"></span>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-[var(--accent)]">Technologies Used</h4>
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
                                </div>

                                {/* Action Links */}
                                <div className="flex items-center gap-4 pt-2">
                                    <div className="flex items-center gap-2 text-[var(--accent)] group-hover:gap-3 transition-all">
                                        <span className="font-medium">View Live Project</span>
                                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                    {projects[activeProject].additionalLink && (
                                        <a
                                            href={projects[activeProject].additionalLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm text-[var(--accent)]/70 hover:text-[var(--accent)] transition-colors underline underline-offset-2"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Alternative Link ↗
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Right: Visual Preview */}
                            <div className="space-y-6">
                                <div className="relative">
                                    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 via-[var(--accent)]/10 to-transparent border border-white/10 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-300">
                                        {projects[activeProject].image}
                                    </div>
                                    <div className="absolute top-4 right-4 glass rounded-lg px-2 py-1">
                                        <span className="text-xs font-medium">{projects[activeProject].year}</span>
                                    </div>
                                </div>

                                {/* Project Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="glass rounded-xl p-4 text-center">
                                        <div className="text-lg font-bold text-[var(--accent)]">{projects[activeProject].tech.length}</div>
                                        <div className="text-xs opacity-70">Technologies</div>
                                    </div>
                                    <div className="glass rounded-xl p-4 text-center">
                                        <div className="text-lg font-bold text-[var(--accent)]">{projects[activeProject].features?.length || 4}</div>
                                        <div className="text-xs opacity-70">Features</div>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="glass rounded-xl p-4 space-y-3">
                                    <h4 className="font-semibold text-sm">Project Highlights</h4>
                                    <div className="space-y-2 text-xs opacity-80">
                                        {projects[activeProject].features?.map((feature, index) => (
                                            <div key={feature} className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-[var(--accent)] rounded-full flex-shrink-0"></span>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </motion.div>
            </div>

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
                        className="px-6 py-3 rounded-full btn-theme transition-all"
                        data-scramble
                    >
                        {t('projects.viewAll')}
                    </a>
                </div>
            </motion.div>
        </div>
    );
}