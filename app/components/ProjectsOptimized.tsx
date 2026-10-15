"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const projectMeta = [
  { name: "Shisha", href: "", preview: "shisha" },
  { name: "Verba", href: "https://github.com/henritresor/verba.git", preview: "verba" },
  { name: "Conexus", href: "https://conexus-app.vercel.app", preview: "conexus" },
  { name: "Twezimbe", href: "https://twezimbe-frontend.vercel.app", preview: "twezimbe" },
];
const projectImages: Record<string, string> = {
  shisha: "/projects/shisha.PNG",
  conexus: "/projects/conexus.PNG",
  twezimbe: "/projects/twezimbe.PNG",
};

function ProjectArtwork({ kind }: { kind: string }) {
  const label = projectMeta.find((project) => project.preview === kind)?.name ?? "";
  const image = projectImages[kind];
  return (
    <div className={"project-artwork artwork-" + kind} aria-hidden="true">
      {image ? (
        <div className="project-shot-frame"><Image src={image} alt="" fill sizes="(max-width: 850px) 82vw, 43vw" className="project-shot" /></div>
      ) : (
        <div className="art-mark"><span>{label}</span></div>
      )}
      <span className="art-corner">0{projectMeta.findIndex((project) => project.preview === kind) + 1} / 04</span>
    </div>
  );
}
export default function ProjectsOptimized() {
  const { t } = useTranslation();
  const localizedProjects = t("portfolio.projects.items", { returnObjects: true }) as { category: string; description: string; tags: string[]; linkLabel: string }[];
  const projects = projectMeta.map((item, index) => ({ ...item, ...localizedProjects[index], tech: localizedProjects[index].tags }));
  const journeyRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActive(Math.min(projects.length - 1, Math.max(0, Math.floor(progress * projects.length))));
  });

  const project = projects[active];
  const jumpTo = (index: number) => {
    stepRefs.current[index]?.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "center" });
  };

  return (
    <div className="portfolio-section projects-section">
      <ScrollReveal className="section-intro">
        <h2 className="editorial-heading">{t("portfolio.projects.heading")} <em>{t("portfolio.projects.headingAccent")}</em></h2>
      </ScrollReveal>

      <div ref={journeyRef} className="project-journey">
        <div className="project-stage">
          <div className="stage-topline">
            <span>0{active + 1} / 0{projects.length}</span>
          </div>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={project.name}
              className="project-stage-content"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -22 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectArtwork kind={project.preview} />
              <div className="stage-caption"><span>{project.category}</span></div>
              <div className="stage-mobile-details">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="stage-mobile-foot">
                  <span>{project.tech.join(" / ")}</span>
                  {project.href && <a href={project.href} target="_blank" rel="noreferrer" className="editorial-link">{project.linkLabel} <ArrowUpRight aria-hidden="true" size={16} /></a>}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="stage-navigation" aria-label={t("portfolio.projects.navigation")}>
            {projects.map((item, index) => (
              <button type="button" key={item.name} onClick={() => jumpTo(index)} aria-label={t("portfolio.projects.show") + " " + item.name} aria-current={active === index ? "step" : undefined} className={active === index ? "is-active" : ""}>
                <span />
              </button>
            ))}
          </div>
        </div>

        <div className="project-steps">
          {projects.map((item, index) => (
            <div
              className={"project-step" + (active === index ? " is-active" : "")}
              key={item.name}
              ref={(node) => { stepRefs.current[index] = node; }}
            >
              <ScrollReveal className="project-step-content">
                <div className="project-mobile-artwork"><ProjectArtwork kind={item.preview} /></div>
                <span className="project-category">0{index + 1} / {item.category}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="project-step-foot">
                  <span>{item.tech.join(" / ")}</span>
                  {item.href && <a href={item.href} target="_blank" rel="noreferrer" className="editorial-link">{item.linkLabel} <ArrowUpRight aria-hidden="true" size={16} /></a>}
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
      <ScrollReveal className="section-end-link"><a href="https://github.com/henritresor" target="_blank" rel="noreferrer" className="editorial-link">{t("portfolio.projects.viewAll")} <ArrowUpRight aria-hidden="true" size={16} /></a></ScrollReveal>
    </div>
  );
}
