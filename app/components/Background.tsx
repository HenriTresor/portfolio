"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function Background() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Particle system
        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
            life: number;
            maxLife: number;
        }> = [];

        // Create particles
        const createParticle = () => {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                life: 0,
                maxLife: Math.random() * 200 + 100,
            });
        };

        // Initialize particles
        for (let i = 0; i < 50; i++) {
            createParticle();
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life++;

                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Fade out over time
                const lifeRatio = particle.life / particle.maxLife;
                particle.opacity = (1 - lifeRatio) * 0.6;

                // Draw particle with theme-aware color
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                const particleColor = resolvedTheme === "dark"
                    ? `rgba(154, 199, 255, ${particle.opacity})`
                    : `rgba(59, 130, 246, ${particle.opacity})`;
                ctx.fillStyle = particleColor;
                ctx.fill();

                // Remove dead particles
                if (particle.life >= particle.maxLife) {
                    particles.splice(index, 1);
                    createParticle(); // Replace with new particle
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base gradient - theme aware */}
            <div className={`absolute inset-0 ${resolvedTheme === "dark"
                ? "bg-gradient-to-br from-black via-slate-900 to-black"
                : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
                }`} />

            {/* Primary radial gradient - theme aware */}
            <div className={`absolute inset-0 ${resolvedTheme === "dark"
                ? "bg-[radial-gradient(1400px_800px_at_20%_20%,rgba(154,199,255,0.08),transparent_50%)]"
                : "bg-[radial-gradient(1400px_800px_at_20%_20%,rgba(59,130,246,0.06),transparent_50%)]"
                }`} />

            {/* Secondary radial gradient - theme aware */}
            <div className={`absolute inset-0 ${resolvedTheme === "dark"
                ? "bg-[radial-gradient(1000px_600px_at_80%_80%,rgba(99,102,241,0.06),transparent_60%)]"
                : "bg-[radial-gradient(1000px_600px_at_80%_80%,rgba(147,51,234,0.04),transparent_60%)]"
                }`} />

            {/* Tertiary gradient - theme aware */}
            <div className={`absolute inset-0 ${resolvedTheme === "dark"
                ? "bg-[radial-gradient(800px_400px_at_50%_10%,rgba(236,72,153,0.05),transparent_70%)]"
                : "bg-[radial-gradient(800px_400px_at_50%_10%,rgba(236,72,153,0.03),transparent_70%)]"
                }`} />

            {/* Subtle overlay - theme aware */}
            <div className={`absolute inset-0 ${resolvedTheme === "dark"
                ? "bg-[linear-gradient(rgba(255,255,255,0.01),rgba(255,255,255,0.01))] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
                : "bg-[linear-gradient(rgba(0,0,0,0.01),rgba(0,0,0,0.01))] [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]"
                }`} />

            {/* Enhanced aurora effect - theme aware */}
            <div className={`aurora absolute -inset-1 ${resolvedTheme === "dark" ? "opacity-60" : "opacity-40"
                }`} />

            {/* Animated particles canvas - theme aware */}
            <canvas
                ref={canvasRef}
                className={`absolute inset-0 ${resolvedTheme === "dark" ? "opacity-40" : "opacity-30"
                    }`}
                style={{ mixBlendMode: resolvedTheme === "dark" ? 'screen' : 'multiply' }}
            />

            {/* Floating orbs - theme aware */}
            <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${resolvedTheme === "dark"
                ? "bg-gradient-to-r from-blue-500/5 to-purple-500/5"
                : "bg-gradient-to-r from-blue-500/3 to-purple-500/3"
                }`} />
            <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse ${resolvedTheme === "dark"
                ? "bg-gradient-to-r from-pink-500/5 to-blue-500/5"
                : "bg-gradient-to-r from-pink-500/3 to-blue-500/3"
                }`} style={{ animationDelay: '1s' }} />
            <div className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse ${resolvedTheme === "dark"
                ? "bg-gradient-to-r from-cyan-500/5 to-purple-500/5"
                : "bg-gradient-to-r from-cyan-500/3 to-purple-500/3"
                }`} style={{ animationDelay: '2s' }} />
        </div>
    );
}


