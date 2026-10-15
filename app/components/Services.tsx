"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const serviceImages = ["/services/web.jpg", "/services/mobile.jpg", "/services/interface.jpg", "/services/direction.jpg"];
type ServiceCopy = { title: string; description: string; scope: string; image: string };

function ServiceCard({ service, index }: { service: ServiceCopy; index: number }) {
  return (
    <article className="service-card">
      <div className="service-card-media"><Image src={service.image} alt="" fill sizes="(max-width: 600px) 88vw, (max-width: 850px) 82vw, 63vw" className="service-card-image" /></div>
      <span className="service-card-index">0{index + 1}</span>
      <div><h3>{service.title}</h3><p>{service.description}</p></div>
      <span className="service-scope">{service.scope}</span>
    </article>
  );
}
export default function Services() {
  const { t } = useTranslation();
  const localizedServices = t("portfolio.services.cards", { returnObjects: true }) as { title: string; description: string; scope: string }[];
  const services = localizedServices.map((service, index) => ({ ...service, image: serviceImages[index] }));
  const sceneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  useEffect(() => {
    const frame = frameRef.current;
    const rail = railRef.current;
    if (!frame || !rail) return;
    const measure = () => { const cards = rail.querySelectorAll<HTMLElement>(".service-card"); setTravel(cards.length ? cards[cards.length - 1].offsetLeft - cards[0].offsetLeft : 0); };
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(rail);
    measure();
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActive(Math.min(services.length - 1, Math.round(progress * (services.length - 1))));
  });


  return (
    <div ref={sceneRef} className="services-scene">
      <div className="portfolio-section services-section" ref={frameRef}>
        <div className="services-heading">
          <div><span className="eyebrow">{t("portfolio.services.eyebrow")}</span><h2 className="editorial-heading">{t("portfolio.services.heading")}<span className="hero-period">.</span></h2></div>
          <span className="service-position">0{active + 1} / 0{services.length}</span>
        </div>
        <motion.div className="services-rail" ref={railRef} style={reduceMotion ? undefined : { x }}>
          {services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} />)}
        </motion.div>
      </div>
    </div>
  );
}