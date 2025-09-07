"use client";

import Section from "./components/Section";
import { motion } from "framer-motion";
import Link from "next/link";
// Removed skills section
import ParallaxLayers from "./components/ParallaxLayers";
import CyclingTypewriter from "./components/CyclingTypewriter";
import AboutMe from "./components/AboutMe";
import Services from "./components/Services";
import ProjectsOptimized from "./components/ProjectsOptimized";
import TechStackOptimized from "./components/TechStackOptimized";
import FAQ from "./components/FAQ";
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiPython } from "react-icons/si";
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen overflow-y-auto no-scrollbar relative">
      <ParallaxLayers />

      <Section id="hero">
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 right-20 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            <motion.div
              className="absolute bottom-20 left-20 w-80 h-80 bg-[var(--accent)]/5 rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[80vh] pt-24 sm:pt-4">
            {/* Left Side - Main Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block"
              >
                <span className="text-sm font-medium accent-theme bg-[var(--accent)]/10 px-4 py-2 rounded-full border border-[var(--accent)]/20">
                  {t('hero.badge')}
                </span>
              </motion.div>

              {/* Main Title */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[0.9] text-theme">
                    {t('hero.greeting')} <span className="accent-theme">Henri</span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-light opacity-90 text-theme"
                >
                  {t('hero.subtitle')}
                </motion.div>

                <CyclingTypewriter
                  texts={t('hero.typewriter', { returnObjects: true }) as string[]}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold accent-theme min-h-[1.2em]"
                  speedMs={80}
                  pauseMs={2000}
                  deleteSpeedMs={40}
                />
              </div>

              {/* Subtitle */}
              <motion.p
                className="text-lg sm:text-xl opacity-80 max-w-2xl leading-relaxed text-theme"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {t('hero.description')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <Link
                  href="#projects"
                  className="group px-8 py-4 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 hover:bg-[var(--accent)]/20 transition-all text-base font-medium accent-theme"
                  data-scramble
                >
                  <span className="flex items-center gap-2">
                    {t('hero.cta.viewWork')}
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>

                <a
                  href="/contact"
                  className="px-8 py-4 rounded-full btn-theme transition-all text-base text-theme"
                  data-scramble
                >
                  {t('hero.cta.letsTalk')}
                </a>
              </motion.div>
            </div>

            {/* Right Side - Tech Stack Preview */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                className="relative max-w-sm w-full"
              >
                {/* Tech Stack Preview */}
                <div className="glass rounded-3xl p-6 space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-[var(--accent)]">{t('hero.techStack.title')}</h3>
                    <p className="text-sm opacity-70">{t('hero.techStack.subtitle')}</p>
                  </div>

                  {/* Tech Icons Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: "React", icon: <SiReact className="w-6 h-6 text-[#61DAFB]" />, delay: 0 },
                      { name: "Next.js", icon: <SiNextdotjs className="w-6 h-6 text-white" />, delay: 0.1 },
                      { name: "Node.js", icon: <SiNodedotjs className="w-6 h-6 text-[#339933]" />, delay: 0.2 },
                      { name: "React Native", icon: <SiReact className="w-6 h-6 text-[#61DAFB]" />, delay: 0.3 },
                      { name: "TypeScript", icon: <SiTypescript className="w-6 h-6 text-[#3178C6]" />, delay: 0.4 },
                      { name: "Python", icon: <SiPython className="w-6 h-6 text-[#3776AB]" />, delay: 0.5 }
                    ].map((tech) => (
                      <motion.div
                        key={tech.name}
                        className="aspect-square glass rounded-xl flex flex-col items-center justify-center p-3 hover:bg-white/10 transition-all"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 + tech.delay }}
                        whileHover={{
                          scale: 1.1,
                          y: -4,
                          backgroundColor: "rgba(154, 199, 255, 0.05)"
                        }}
                      >
                        <div className="flex items-center justify-center mb-2">
                          {tech.icon}
                        </div>
                        <span className="text-xs opacity-70 text-center leading-tight">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Status Indicator */}
                  <motion.div
                    className="flex items-center justify-center gap-2 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="opacity-80">{t('hero.techStack.status')}</span>
                  </motion.div>
                </div>

                {/* Floating Code Elements */}
                <motion.div
                  className="absolute -top-3 -right-3 w-8 h-8 bg-[var(--accent)]/20 rounded-lg flex items-center justify-center text-sm font-mono"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {'</>'}
                </motion.div>
                <motion.div
                  className="absolute -bottom-3 -left-3 w-6 h-6 bg-[var(--accent)]/15 rounded-lg flex items-center justify-center text-xs"
                  animate={{
                    y: [0, 6, 0],
                    rotate: [0, -3, 3, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  {'{}'}
                </motion.div>
                <motion.div
                  className="absolute top-1/2 -left-6 w-4 h-4 bg-[var(--accent)]/10 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator - Hidden on mobile, visible on desktop */}
          <motion.div
            className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-theme/60 hover:text-theme/80 transition-colors cursor-pointer"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-sm font-medium">{t('hero.scrollToExplore')}</span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ scale: 1.1 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </motion.div>
          </motion.div>

          {/* Mobile: Quick Navigation Dots */}
          <motion.div
            className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="flex gap-2">
              {['about', 'services', 'projects'].map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-2 h-2 bg-white/30 hover:bg-[var(--accent)] rounded-full transition-all"
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      <div className="space-y-8 sm:space-y-12">
        <Section id="about">
          <AboutMe />
        </Section>

        <Section id="services" bg="panel">
          <Services />
        </Section>

        <Section id="projects">
          <ProjectsOptimized />
        </Section>

        <Section id="skills" bg="panel">
          <TechStackOptimized />
        </Section>

        <Section id="faq">
          <FAQ />
        </Section>
      </div>

      {/* Contact form moved to /contact */}

      {/* Footer is rendered globally in layout */}

    </div>
  );
}
