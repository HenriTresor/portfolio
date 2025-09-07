"use client";

import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useState } from "react";

export default function ThemeSwitcher() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [showJoke, setShowJoke] = useState(false);
    const [jokeText, setJokeText] = useState("");

    const themes = [
        {
            value: "light",
            icon: Sun,
            label: "Light",
            jokes: [
                "☀️ Let there be light! (And eye strain)",
                "🌞 Switching to light mode... RIP your retinas",
                "☀️ Light mode: Because who needs sleep anyway?",
                "🌞 Welcome to the bright side! (Literally)",
                "☀️ Light mode activated! Sunglasses recommended"
            ]
        },
        {
            value: "dark",
            icon: Moon,
            label: "Dark",
            jokes: [
                "🌙 Dark mode: The developer's best friend",
                "🌚 Entering dark mode... Your eyes thank you",
                "🌙 Dark mode: Because we're not vampires, just night owls",
                "🌚 Switching to dark mode... Battery life improved by 0.001%",
                "🌙 Dark mode: Where bugs hide and code thrives"
            ]
        },
        {
            value: "system",
            icon: Monitor,
            label: "System",
            jokes: [
                "🖥️ Following the system like a good little app",
                "💻 System mode: Let the OS decide your fate",
                "🖥️ Auto-pilot mode activated!",
                "💻 System mode: Because making decisions is hard",
                "🖥️ Following the herd... I mean, system"
            ]
        },
    ] as const;

    const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
        const themeData = themes.find(t => t.value === newTheme);
        if (themeData) {
            const randomJoke = themeData.jokes[Math.floor(Math.random() * themeData.jokes.length)];
            setJokeText(randomJoke);
            setShowJoke(true);

            // Hide joke after 3 seconds
            setTimeout(() => setShowJoke(false), 3000);
        }
        setTheme(newTheme);
    };

    return (
        <div className="relative">
            <div className="flex items-center gap-1 p-1 backdrop-blur-sm rounded-lg switcher-bg">
                {themes.map(({ value, icon: Icon, label }) => (
                    <motion.button
                        key={value}
                        onClick={() => handleThemeChange(value)}
                        className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${theme === value
                            ? "text-theme"
                            : "text-theme/60 hover:text-theme/80"
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Icon className="w-4 h-4" />
                        {theme === value && (
                            <motion.div
                                className="absolute inset-0 bg-white/10 rounded-md"
                                layoutId="theme-bg"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                        <span className="sr-only">{label}</span>
                    </motion.button>
                ))}
            </div>

            {/* Joke Tooltip */}
            <AnimatePresence>
                {showJoke && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 glass rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap border border-white/10 z-50"
                    >
                        {jokeText}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/10 rotate-45 border-l border-t border-white/10" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}