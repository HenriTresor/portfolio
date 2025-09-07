"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

function Marquee() {
    const text = " Let&apos;s Build • Something Amazing • Together • Your Vision • My Code • ";
    return (
        <div className="relative overflow-hidden border-b border-white/10">
            <div className="whitespace-nowrap text-[18vw] leading-none font-extrabold opacity-10 animate-[marquee_30s_linear_infinite]">
                {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i}>{text}</span>
                ))}
            </div>
        </div>
    );
}

export default function ContactPage() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const projectTypes = [
        { id: "web-app", label: "Web Application", icon: "🌐" },
        { id: "mobile-app", label: "Mobile App", icon: "📱" },
        { id: "website", label: "Website", icon: "💻" },
        { id: "ecommerce", label: "E-Commerce", icon: "🛒" },
        { id: "consulting", label: "Technical Consulting", icon: "💡" },
        { id: "ai-integration", label: "AI Integration", icon: "🤖" },
        { id: "other", label: "Other", icon: "✨" }
    ];

    const toggleProjectType = (typeId: string) => {
        setSelectedTypes(prev =>
            prev.includes(typeId)
                ? prev.filter(id => id !== typeId)
                : [...prev, typeId]
        );
    };

    return (
        <div className="min-h-screen">
            {/* Back to Home */}
            <div className="fixed top-6 left-0 z-50">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-white/10 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Back to Home</span>
                </Link>
            </div>

            <Marquee />
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid sm:grid-cols-2 gap-10 items-start">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="text-xs uppercase opacity-60 tracking-wide">Contact</div>
                            <h1 className="text-5xl sm:text-7xl font-semibold leading-tight">Let&apos;s build something amazing</h1>
                            <p className="text-lg opacity-80 leading-relaxed">
                                Ready to turn your ideas into reality? I&apos;d love to hear about your project.
                                Every message gets a personal response within 24 hours. ⚡
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="glass rounded-2xl p-6 space-y-3">
                                <div className="flex items-center gap-2 text-[var(--accent)]">
                                    <span className="text-xl">📍</span>
                                    <span className="font-medium">Location</span>
                                </div>
                                <p className="text-sm opacity-80">Kigali, Rwanda</p>
                                <p className="text-xs opacity-60">Available for remote & on-site projects</p>
                            </div>

                            <div className="glass rounded-2xl p-6 space-y-3">
                                <div className="flex items-center gap-2 text-[var(--accent)]">
                                    <span className="text-xl">⏰</span>
                                    <span className="font-medium">Response Time</span>
                                </div>
                                <p className="text-sm opacity-80">Within 24 hours</p>
                                <p className="text-xs opacity-60">Usually much faster! 🚀</p>
                            </div>
                        </div>

                        <div className="glass rounded-2xl p-6">
                            <h3 className="font-semibold text-[var(--accent)] mb-3">What happens next?</h3>
                            <div className="space-y-2 text-sm opacity-80">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 bg-[var(--accent)]/20 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                    <span>I&apos;ll review your project details</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 bg-[var(--accent)]/20 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                    <span>We&apos;ll schedule a consultation call</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 bg-[var(--accent)]/20 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                    <span>I&apos;ll provide a detailed proposal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <motion.form
                        className="space-y-6"
                        action="https://formsubmit.co/shimwamanahenritresor@gmail.com"
                        method="POST"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_subject" value="💼 New Project Request from Portfolio" />
                        <input type="hidden" name="_next" value="/?success=true" />

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 opacity-90">Your Name</label>
                                <input
                                    className="glass w-full rounded-xl px-4 py-3 bg-transparent outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all"
                                    placeholder="John Doe"
                                    name="name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 opacity-90">Email Address</label>
                                <input
                                    className="glass w-full rounded-xl px-4 py-3 bg-transparent outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all"
                                    placeholder="john@example.com"
                                    type="email"
                                    name="email"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-3 opacity-90">
                                    Project Type(s) <span className="text-xs opacity-60">(Select all that apply)</span>
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {projectTypes.map((type) => (
                                        <motion.button
                                            key={type.id}
                                            type="button"
                                            onClick={() => toggleProjectType(type.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${selectedTypes.includes(type.id)
                                                ? 'bg-[var(--accent)]/20 border-[var(--accent)]/50 text-[var(--accent)]'
                                                : 'glass border-white/20 hover:bg-white/10'
                                                }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span className="text-lg">{type.icon}</span>
                                            <span className="text-sm font-medium">{type.label}</span>
                                        </motion.button>
                                    ))}
                                </div>
                                <input
                                    type="hidden"
                                    name="project_types"
                                    value={selectedTypes.join(', ')}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 opacity-90">Tell me about your project</label>
                                <textarea
                                    className="glass w-full rounded-xl px-4 py-3 bg-transparent outline-none min-h-32 focus:ring-2 focus:ring-[var(--accent)]/30 transition-all"
                                    placeholder="Describe your project, goals, timeline, and any specific requirements..."
                                    name="message"
                                    required
                                />
                            </div>
                        </div>

                        <label className="flex items-start gap-3 text-sm opacity-80">
                            <input type="checkbox" className="mt-1" required />
                            <span>I agree to the privacy policy and consent to my data being temporarily stored for processing this request. No spam, just project talk! 📧</span>
                        </label>

                        <motion.button
                            type="submit"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 hover:bg-[var(--accent)]/20 transition-all font-medium"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            data-scramble
                        >
                            Send Project Request 🚀
                        </motion.button>
                    </motion.form>
                </div>
            </section>
        </div>
    );
}


