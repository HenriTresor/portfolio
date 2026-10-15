"use client";

import { useEffect, useState } from "react";

import Hero from "./components/Hero";
import Section from "./components/Section";
import AboutMe from "./components/AboutMe";
import Services from "./components/Services";
import ProjectsOptimized from "./components/ProjectsOptimized";
import TechStackOptimized from "./components/TechStackOptimized";
import FAQ from "./components/FAQ";

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const revealHero = () => setHeroReady(true);
    window.addEventListener("portfolio:intro-complete", revealHero);
    root.dataset.portfolioPageReady = "true";
    window.dispatchEvent(new Event("portfolio:page-ready"));
    if (root.dataset.portfolioIntroComplete === "true") revealHero();
    return () => {
      window.removeEventListener("portfolio:intro-complete", revealHero);
      delete root.dataset.portfolioPageReady;
    };
  }, []);

  return (
    <main className="min-h-screen relative">
      <Hero ready={heroReady} />
      <div className="portfolio-work">
        <Section id="about"><AboutMe /></Section>
        <Section id="services"><Services /></Section>
        <Section id="projects"><ProjectsOptimized /></Section>
        <Section id="skills"><TechStackOptimized /></Section>
        <Section id="faq"><FAQ /></Section>
      </div>
    </main>
  );
}