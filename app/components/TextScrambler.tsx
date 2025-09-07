"use client";

import { useEffect, useCallback, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

// Optimized scramble function with requestAnimationFrame
function scramble(el: HTMLElement) {
    const original = el.getAttribute("data-original") ?? el.textContent ?? "";
    if (!el.getAttribute("data-original")) el.setAttribute("data-original", original);

    const duration = 500; // Reduced duration for snappier feel
    let animationId: number;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smoother animation
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

        const reveal = Math.floor(original.length * easedProgress);
        const head = original.slice(0, reveal);

        // Generate random tail with decreasing intensity
        const tailLength = original.length - reveal;
        const intensity = Math.max(0.1, 1 - progress); // Fade out scrambling
        const tail = Array.from({ length: tailLength }, (_, i) => {
            // Less scrambling towards the end
            if (Math.random() > intensity) {
                return original[reveal + i] || "";
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("");

        el.textContent = head + tail;

        if (progress < 1) {
            animationId = requestAnimationFrame(animate);
        } else {
            el.textContent = original;
            el.classList.remove("scrambling");
        }
    };

    // Store animation ID for cleanup
    el.setAttribute("data-animation-id", "true");
    animationId = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    };
}

export default function TextScrambler() {
    const activeAnimations = useRef(new Set<HTMLElement>());

    const handler = useCallback((e: Event) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        // Opt-in only: require explicit data-scramble
        const el = target.closest("[data-scramble]") as HTMLElement | null;
        if (!el) return;

        // Prevent multiple simultaneous animations on same element
        if (activeAnimations.current.has(el)) return;

        // Skip elements without meaningful text or with media children
        const text = (el.textContent ?? "").trim();
        if (!text || text.length < 2) return;
        if (el.querySelector("svg,img,video,canvas")) return;

        // Performance check: skip very long text
        if (text.length > 50) return;

        // Add to active animations
        activeAnimations.current.add(el);
        el.classList.add("scrambling");

        // Start scramble animation
        const cleanup = scramble(el);

        // Clean up after animation
        const activeAnimationsRef = activeAnimations.current;
        setTimeout(() => {
            activeAnimationsRef.delete(el);
            cleanup?.();
        }, 600);

    }, []);

    // Throttled mouse enter handler for better performance
    const throttledHandler = useCallback((e: Event) => {
        requestAnimationFrame(() => handler(e));
    }, [handler]);

    useEffect(() => {
        // Use passive listeners for better performance
        document.addEventListener("mouseenter", throttledHandler, { passive: true, capture: true });

        // Capture the current ref value
        const currentAnimations = activeAnimations.current;

        return () => {
            document.removeEventListener("mouseenter", throttledHandler, true);
            // Cancel any remaining animations
            currentAnimations.clear();
        };
    }, [throttledHandler]);

    return null;
}


