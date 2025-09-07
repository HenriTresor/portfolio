"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, MessageCircle, Clock, Code, Smartphone, Settings, Users } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function FAQ() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Use the FAQ items from translations (English with puns) or fallback to static
    const faqItems = (t('faq.items', { returnObjects: true }) as Array<{
        question: string;
        answer: string;
    }>) || [
            {
                question: "What services do you offer?",
                answer: "I provide full-stack web development, mobile app development (React Native & Flutter), UI/UX design, and technical consulting. From concept to deployment, I handle the entire development lifecycle. Think of me as your digital Swiss Army knife! 🔧"
            },
            {
                question: "How long does a typical project take?",
                answer: "Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex web applications or mobile apps typically take 6-12 weeks. I provide detailed timelines during our initial consultation. Good code takes time - like a fine wine, but with less debugging! 🍷"
            },
            {
                question: "Do you develop mobile apps?",
                answer: "Yes! I specialize in cross-platform mobile development using React Native and Flutter. This allows your app to work on both iOS and Android with a single codebase, saving time and costs. It's like having your cake and eating it too, but with fewer calories! 📱"
            },
            {
                question: "What's your development process?",
                answer: "I follow an agile approach: Discovery & Planning → Design & Prototyping → Development & Testing → Launch & Support. You'll receive regular updates and can provide feedback throughout the process. No black boxes here - everything is transparent! 📦"
            },
            {
                question: "Do you provide ongoing support?",
                answer: "Absolutely! I offer maintenance packages that include bug fixes, security updates, performance optimizations, and feature enhancements. I'm committed to long-term success of your project. Think of me as your digital guardian angel! 👼"
            },
            {
                question: "Can you work with my existing team?",
                answer: "Yes, I collaborate well with existing teams. Whether you need a full-stack developer, technical consultant, or someone to lead frontend development, I adapt to your team's workflow and processes. I play well with others - no merge conflicts in personality! 🤝"
            }
        ];

    const faqIcons = [
        <Code className="w-5 h-5" />,
        <Clock className="w-5 h-5" />,
        <Smartphone className="w-5 h-5" />,
        <Settings className="w-5 h-5" />,
        <MessageCircle className="w-5 h-5" />,
        <Users className="w-5 h-5" />
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <motion.div
            className="space-y-12 py-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
                        {t('faq.badge')}
                    </span>
                </div>
                <h2 className="text-5xl sm:text-7xl font-semibold">{t('faq.title')}</h2>
                <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto">
                    {t('faq.subtitle')}
                </p>
            </motion.div>

            {/* FAQ Items */}
            <div className="max-w-4xl mx-auto space-y-4">
                {faqItems.map((faq, index) => (
                    <motion.div
                        key={index}
                        className="glass rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                        <motion.button
                            onClick={() => toggleFAQ(index)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
                            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <motion.div
                                    className="flex items-center justify-center w-10 h-10 glass rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    animate={{
                                        backgroundColor: openIndex === index ? "rgba(154, 199, 255, 0.2)" : "transparent"
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {faqIcons[index]}
                                </motion.div>
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    {faq.question}
                                </h3>
                            </div>
                            <motion.div
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <ChevronDown className="w-5 h-5 opacity-70" />
                            </motion.div>
                        </motion.button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <motion.div
                                        initial={{ y: -10 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -10 }}
                                        transition={{ duration: 0.2, delay: 0.1 }}
                                        className="px-6 pb-6"
                                    >
                                        <div className="pl-14 pr-4">
                                            <p className="text-base opacity-90 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <motion.div
                className="text-center pt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
            >
                <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold text-[var(--accent)] mb-4">{t('faq.stillQuestions')}</h3>
                    <p className="text-base opacity-80 mb-6">
                        {t('faq.stillQuestionsDesc')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 hover:bg-[var(--accent)]/20 transition-all font-medium"
                            data-scramble
                        >
                            <MessageCircle className="w-4 h-4" />
                            Get in touch
                        </a>
                        <a
                            href="mailto:shimwamanahenritresor@gmail.com"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
                            data-scramble
                        >
                            Send email
                            <span>→</span>
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
