"use client";

import { useEffect, useCallback, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SPECIAL_CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

// Optimized scramble function with requestAnimationFrame
function scramble(el: HTMLElement) {
    const original = el.getAttribute("data-original") ?? el.textContent ?? "";
    if (!el.getAttribute("data-original")) el.setAttribute("data-original", original);

    const duration = 500; // Reduced duration for snappier feel
    let animationId: number;

    // Store original styles to prevent layout shifts
    const originalWhiteSpace = el.style.whiteSpace;
    const originalOverflow = el.style.overflow;
    const originalTextOverflow = el.style.textOverflow;
    const originalMinWidth = el.style.minWidth;
    const originalWidth = el.style.width;
    const originalHeight = el.style.height;
    const originalMinHeight = el.style.minHeight;
    const originalFlexBasis = el.style.flexBasis;
    const originalBoxSizing = el.style.boxSizing;

    // For buttons and links, completely lock dimensions to prevent ANY layout shifts
    const isInteractive = el.tagName === 'BUTTON' || el.tagName === 'A' || el.closest('button, a');

    if (isInteractive) {
        // Get current dimensions and lock them completely
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            el.style.boxSizing = 'border-box';
            el.style.width = `${rect.width}px`;
            el.style.height = `${rect.height}px`;
            el.style.minWidth = `${rect.width}px`;
            el.style.minHeight = `${rect.height}px`;
            el.style.whiteSpace = 'nowrap';
            el.style.overflow = 'hidden';
            el.style.textOverflow = 'ellipsis';
        }
    } else if (original.length > 0) {
        // For regular text, use em-based calculation
        el.style.minWidth = `${original.length * 0.6}em`;
    }

    const startTime = performance.now();

    const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // More realistic easing function with slight delay at start
        const easedProgress = progress < 0.1 ? 0 : 1 - Math.pow(1 - (progress - 0.1) / 0.9, 2.5);

        const reveal = Math.floor(original.length * easedProgress);
        const head = original.slice(0, reveal);

        // Generate random tail with decreasing intensity and realistic character selection
        const tailLength = original.length - reveal;
        const intensity = Math.max(0.1, 1 - progress); // Fade out scrambling
        const tail = Array.from({ length: tailLength }, (_, i) => {
            const originalIndex = reveal + i;
            // Ensure we don't go beyond original text length
            if (originalIndex >= original.length) {
                return "";
            }

            const originalChar = original[originalIndex] || "";

            // Less scrambling towards the end
            if (Math.random() > intensity) {
                return originalChar;
            }

            // More realistic character selection based on original character type
            let charSet = CHARS;
            if (/[0-9]/.test(originalChar)) {
                charSet = "0123456789";
            } else if (/[A-Z]/.test(originalChar)) {
                charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            } else if (/[a-z]/.test(originalChar)) {
                charSet = "abcdefghijklmnopqrstuvwxyz";
            } else if (/[!@#$%^&*()_+\-=\[\]{}|;':",./<>?]/.test(originalChar)) {
                charSet = SPECIAL_CHARS;
            } else if (originalChar === " ") {
                // Keep spaces as spaces for readability
                return " ";
            }

            return charSet[Math.floor(Math.random() * charSet.length)];
        }).join("");

        // Ensure total length never exceeds original
        const scrambledText = head + tail;
        el.textContent = scrambledText.length <= original.length ? scrambledText : original;

        if (progress < 1) {
            animationId = requestAnimationFrame(animate);
        } else {
            el.textContent = original;
            el.classList.remove("scrambling");
            // Restore original styles
            el.style.whiteSpace = originalWhiteSpace;
            el.style.overflow = originalOverflow;
            el.style.textOverflow = originalTextOverflow;
            el.style.minWidth = originalMinWidth;
            el.style.width = originalWidth;
            el.style.height = originalHeight;
            el.style.minHeight = originalMinHeight;
            el.style.flexBasis = originalFlexBasis;
            el.style.boxSizing = originalBoxSizing;
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
        // Restore original styles
        el.style.whiteSpace = originalWhiteSpace;
        el.style.overflow = originalOverflow;
        el.style.textOverflow = originalTextOverflow;
        el.style.minWidth = originalMinWidth;
        el.style.width = originalWidth;
        el.style.height = originalHeight;
        el.style.minHeight = originalMinHeight;
        el.style.flexBasis = originalFlexBasis;
        el.style.boxSizing = originalBoxSizing;
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

        // Allow buttons and links, but we'll prevent layout shifts in the scramble function

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


