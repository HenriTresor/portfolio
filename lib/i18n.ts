import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            hero: {
                badge: "👋 Available for new projects",
                greeting: "Hi, I'm ",
                subtitle: "I create digital solutions that",
                typewriter: [
                    "work everywhere",
                    "solve real problems",
                    "drive business growth",
                    "connect communities",
                    "empower users"
                ],
                description: "Full-stack & mobile developer crafting web apps, mobile solutions, and AI-powered tools from concept to launch. I promise my code is cleaner than my desk! 💻✨",
                cta: {
                    viewWork: "View My Work",
                    services: "Services",
                    letsTalk: "Let's Talk"
                },
                techStack: {
                    title: "Current Stack",
                    subtitle: "Technologies I'm working with",
                    status: "Available for projects"
                },
                scrollToExplore: "Scroll to explore"
            },
            about: {
                badge: "About Me",
                text: "I create digital solutions that work everywhere. Web apps, mobile apps, and everything in between.",
                crossPlatform: {
                    title: "Cross-Platform",
                    description: "Web, mobile, and desktop apps that work everywhere. No platform left behind! 🌍"
                },
                fullStack: {
                    title: "Full-Stack",
                    description: "From design to deployment, I handle it all. Stack overflow? More like stack awesome! 📚"
                },
                cta: {
                    workTogether: "Let's Work Together",
                    viewResume: "View Resume"
                },
                name: "Henri Tresor",
                role: "Full-Stack & Mobile Developer",
                stats: {
                    years: "Years Experience",
                    projects: "Projects Completed",
                    satisfaction: "Client Satisfaction"
                },
                technologies: "Core Technologies"
            },
            services: {
                title: "Services",
                subtitle: "I help businesses and startups build comprehensive digital solutions across web, mobile, and beyond. No service interruptions! 📡",
                quote: "Great design is not just what it looks like — great design is how it works.",
                quoteAuthor: "— Steve Jobs",
                cta: {
                    ready: "Ready to bring your vision to life? Let's make it pixel perfect! 🎨",
                    startProject: "Start a project",
                    viewCredentials: "View credentials"
                },
                items: [
                    {
                        title: "Full-Stack Web Development",
                        description: "Complete web applications using React, Next.js, Node.js, and modern databases. Scalable architecture from frontend to backend. Full-stack means I've got your back(end)! 💪",
                        features: ["React & Next.js", "Node.js & APIs", "Database Design", "Cloud Deployment"]
                    },
                    {
                        title: "Mobile App Development",
                        description: "Native and cross-platform mobile applications for iOS and Android using React Native, Flutter, and native technologies. Apps so good, they'll make your phone happy! 📱😊",
                        features: ["React Native", "Flutter", "iOS Development", "Android Development"]
                    },
                    {
                        title: "UI/UX Design & Motion",
                        description: "Beautiful, intuitive interfaces with smooth animations and micro-interactions. Design systems that scale across platforms. Motion graphics that won't make you motion sick! 🎭",
                        features: ["Design Systems", "Framer Motion", "Prototyping", "User Research"]
                    },
                    {
                        title: "Technical Consulting",
                        description: "Strategic technical guidance, architecture planning, and technology stack recommendations for your digital projects. I'll help you debug your decisions! 🔍",
                        features: ["Architecture Planning", "Tech Stack Selection", "Code Review", "Performance Audit"]
                    }
                ]
            },
            projects: {
                badge: "Featured Work",
                title: "Projects",
                subtitle: "From AI-powered tools to accessibility platforms - showcasing innovative solutions that make a difference. Code that actually works? Revolutionary! 🚀",
                cta: "Interested in working together? Let's commit to something great! 💾",
                startProject: "Start a Project",
                viewAll: "View All Projects",
                stats: {
                    projects: "Projects Completed",
                    satisfaction: "Client Satisfaction",
                    support: "Support Available"
                }
            },
            skills: {
                badge: "Tech Arsenal",
                title: "Skills",
                subtitle: "Technologies I use to bring ideas to life across all platforms. Warning: May contain traces of genius! 🧠",
                categories: {
                    frontend: "Frontend",
                    mobile: "Mobile & Other",
                    backend: "Backend",
                    database: "Database",
                    tools: "DevOps & Tools"
                },
                stats: {
                    technologies: "Technologies",
                    categories: "Categories",
                    years: "Years Experience",
                    learning: "Learning (Never stops! 📚)"
                },
                quote: "The best way to predict the future is to create it.",
                quoteAuthor: "— Peter Drucker"
            },
            faq: {
                badge: "Got Questions?",
                title: "FAQ",
                subtitle: "Everything you need to know about working with me (no bugs included! 🐛)",
                stillQuestions: "Still have questions?",
                stillQuestionsDesc: "I'd love to discuss your project and answer any specific questions you might have. Promise I won't byte! 💾",
                getInTouch: "Get in touch",
                sendEmail: "Send email",
                items: [
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
                ]
            },
            footer: {
                description: "Building the future through innovative web and mobile solutions. Let's create something amazing together. No 404 errors in our friendship! 🤝",
                quickLinks: "Quick Links",
                getInTouch: "Get In Touch",
                location: "Location",
                locationValue: "Kigali, Rwanda",
                availability: "Availability",
                availabilityValue: "Open for new projects (and coffee chats! ☕)",
                startProject: "Start a project",
                copyright: "Building the future, one commit at a time. Git it? 😉",
                downloadCV: "Download CV"
            },
            nav: {
                home: { title: "Home", desc: "Return to landing page" },
                about: { title: "About", desc: "Learn about my journey" },
                services: { title: "Services", desc: "What I can do for you" },
                projects: { title: "Projects", desc: "See my latest work" },
                skills: { title: "Skills", desc: "My technical expertise" },
                faq: { title: "FAQ", desc: "Common questions answered" },
                contact: { title: "Contact", desc: "Let's start something great" }
            }
        }
    },
    rw: {
        translation: {
            hero: {
                badge: "👋 Ndi hano kubashaka imirimo mishya",
                greeting: "Muraho, ndi ",
                subtitle: "Nkora ibisubizo bya digitale",
                typewriter: [
                    "bikora ahantu hose",
                    "bikemura ibibazo nyabyo",
                    "bitera ubucuruzi gukura",
                    "bihuza abaturage",
                    "biha abakoresha imbaraga"
                ],
                description: "Umukozi wa full-stack & mobile ukora aplikasiyo z'urubuga, ibisubizo bya mobile, n'ibikoresho bya AI kuva mu gitekerezo kugeza mu gusohora.",
                cta: {
                    viewWork: "Reba Akazi Kanje",
                    services: "Serivisi",
                    letsTalk: "Reka Tuganire"
                },
                techStack: {
                    title: "Tekinoloji Nkoresha",
                    subtitle: "Tekinoloji nkoresha mu kazi",
                    status: "Ndi hano kubashaka imirimo"
                },
                scrollToExplore: "Nyura hasi urebe"
            },
            about: {
                badge: "Ibijanye Nanjye",
                text: "Nkora ibisubizo bya digitale bikora ahantu hose. Aplikasiyo z'urubuga, aplikasiyo za mobile, n'ibindi byose.",
                crossPlatform: {
                    title: "Cross-Platform",
                    description: "Aplikasiyo z'urubuga, mobile, na desktop zikora ahantu hose."
                },
                fullStack: {
                    title: "Full-Stack",
                    description: "Kuva mu gushushanya kugeza mu gusohora, nkora byose."
                },
                cta: {
                    workTogether: "Reka Dukore Hamwe",
                    viewResume: "Reba CV"
                }
            },
            services: {
                title: "Serivisi",
                subtitle: "Nfasha ubucuruzi n'amashirahamwe gukora ibisubizo bya digitale byuzuye ku rubuga, mobile, n'ibindi",
                quote: "Igishushanyo cyiza ntabwo ari icyo gisa gusa — igishushanyo cyiza ni uko gikora.",
                quoteAuthor: "— Steve Jobs",
                cta: {
                    ready: "Witeguye gukora igitekerezo cyawe?",
                    startProject: "Tangira umushinga",
                    viewCredentials: "Reba impamyabumenyi"
                }
            },
            projects: {
                badge: "Akazi Gakomeye",
                title: "Imishinga",
                subtitle: "Kuva mu bikoresho bya AI kugeza ku buryo bwo kwakira abantu bose",
                cta: "Ushaka tukore hamwe?",
                startProject: "Tangira Umushinga",
                viewAll: "Reba Imishinga Yose"
            },
            skills: {
                badge: "Ubuhanga Bwanjye",
                title: "Ubuhanga",
                subtitle: "Tekinoloji nkoresha mu gukora ibitekerezo mu buryo bwose",
                categories: {
                    frontend: "Frontend",
                    mobile: "Mobile & Ibindi",
                    backend: "Backend",
                    database: "Database",
                    tools: "DevOps & Ibikoresho"
                },
                stats: {
                    technologies: "Tekinoloji",
                    categories: "Ibyiciro",
                    years: "Imyaka y'Uburambe",
                    learning: "Kwiga"
                },
                quote: "Inzira nziza yo guhanura ejo hazaza ni ukuyikora.",
                quoteAuthor: "— Peter Drucker"
            },
            faq: {
                badge: "Ufite Ibibazo?",
                title: "Ibibazo Bikunze Kubazwa",
                subtitle: "Ibyo wose ukeneye kumenya ku gukora nanjye",
                stillQuestions: "Uracyafite ibibazo?",
                stillQuestionsDesc: "Nshaka kuvugana nawe ku mushinga wawe no gusubiza ibibazo byose ufite.",
                getInTouch: "Twandikire",
                sendEmail: "Ohereza email",
                items: [
                    {
                        question: "Ni izihe serivisi utanga?",
                        answer: "Ntanga iterambere rya full-stack web, iterambere rya aplikasiyo za mobile (React Native & Flutter), igishushanyo cya UI/UX, n'ubujyanama bwa tekiniki. Kuva mu gitekerezo kugeza mu gusohora."
                    },
                    {
                        question: "Umushinga usanzwe ufata igihe kingana ki?",
                        answer: "Igihe cy'imishinga girasinya ukurikije urwego rw'ingorabahizi. Urubuga rwisanzwe rufata ibyumweru 2-4, mu gihe aplikasiyo zigoye za web cyangwa za mobile zisanzwe zifata ibyumweru 6-12."
                    },
                    {
                        question: "Ukora aplikasiyo za mobile?",
                        answer: "Yego! Nzi cyane iterambere rya mobile cross-platform nkoresheje React Native na Flutter. Ibi bituma aplikasiyo yawe ikora kuri iOS na Android hamwe n'imibare imwe."
                    },
                    {
                        question: "Ni ubuhe buryo bw'iterambere ukoresha?",
                        answer: "Nkurikiza uburyo bwa agile: Ubushakashatsi & Igenamigambi → Igishushanyo & Prototyping → Iterambere & Ibizamini → Gusohora & Gufasha."
                    },
                    {
                        question: "Utanga ubufasha bukomeje?",
                        answer: "Rwose! Ntanga pakeji z'ubugororozi zirimo gukosora amakosa, kuvugurura umutekano, kunoza imikorere, n'ibindi biranga."
                    },
                    {
                        question: "Ushobora gukora n'itsinda ryanjye rihari?",
                        answer: "Yego, nkora neza n'amatsinda ariho. Haba ukeneye umukozi wa full-stack, umujyanama wa tekiniki, cyangwa umuntu uyobora iterambere rya frontend."
                    }
                ]
            },
            footer: {
                description: "Kubaka ejo hazaza binyuze mu bisubizo bishya bya web na mobile.",
                quickLinks: "Ihuza Byihuse",
                getInTouch: "Twandikire",
                location: "Aho Ndi",
                locationValue: "Kigali, Rwanda",
                availability: "Kuboneka",
                availabilityValue: "Ndi hano kubashaka imirimo",
                startProject: "Tangira umushinga",
                copyright: "Kubaka ejo hazaza, umushinga umwe icyarimwe.",
                downloadCV: "Kuramo CV"
            },
            nav: {
                home: { title: "Ahabanza", desc: "Subira ku rupapuro rw'ahabanza" },
                about: { title: "Ibijanye Nanjye", desc: "Menya urugendo rwanjye" },
                services: { title: "Serivisi", desc: "Icyo nshobora gukora" },
                projects: { title: "Imishinga", desc: "Reba akazi gashya" },
                skills: { title: "Ubuhanga", desc: "Ubuhanga bwanjye bwa tekiniki" },
                faq: { title: "Ibibazo", desc: "Ibibazo bikunze kubazwa" },
                contact: { title: "Twandikire", desc: "Reka dutangire ikintu gikomeye" }
            }
        }
    },
    fr: {
        translation: {
            hero: {
                badge: "👋 Disponible pour de nouveaux projets",
                greeting: "Salut, je suis ",
                subtitle: "Je crée des solutions numériques qui",
                typewriter: [
                    "fonctionnent partout",
                    "résolvent de vrais problèmes",
                    "stimulent la croissance",
                    "connectent les communautés",
                    "autonomisent les utilisateurs"
                ],
                description: "Développeur full-stack & mobile créant des applications web, des solutions mobiles et des outils IA du concept au lancement.",
                cta: {
                    viewWork: "Voir Mon Travail",
                    services: "Services",
                    letsTalk: "Parlons-en"
                },
                techStack: {
                    title: "Stack Actuel",
                    subtitle: "Technologies que j'utilise",
                    status: "Disponible pour projets"
                },
                scrollToExplore: "Faites défiler pour explorer"
            },
            about: {
                badge: "À Propos",
                text: "Je crée des solutions numériques qui fonctionnent partout. Applications web, applications mobiles, et tout le reste.",
                crossPlatform: {
                    title: "Multi-Plateforme",
                    description: "Applications web, mobiles et desktop qui fonctionnent partout."
                },
                fullStack: {
                    title: "Full-Stack",
                    description: "Du design au déploiement, je gère tout."
                },
                cta: {
                    workTogether: "Travaillons Ensemble",
                    viewResume: "Voir CV"
                }
            },
            services: {
                title: "Services",
                subtitle: "J'aide les entreprises et startups à créer des solutions numériques complètes sur web, mobile et au-delà",
                quote: "Un bon design n'est pas seulement à quoi ça ressemble — un bon design, c'est comment ça fonctionne.",
                quoteAuthor: "— Steve Jobs"
            },
            projects: {
                badge: "Travail en Vedette",
                title: "Projets",
                subtitle: "Des outils alimentés par l'IA aux plateformes d'accessibilité - présentant des solutions innovantes",
                cta: "Intéressé à travailler ensemble?",
                startProject: "Démarrer un Projet",
                viewAll: "Voir Tous les Projets"
            },
            skills: {
                badge: "Arsenal Technique",
                title: "Compétences",
                subtitle: "Technologies que j'utilise pour donner vie aux idées sur toutes les plateformes",
                categories: {
                    frontend: "Frontend",
                    mobile: "Mobile & Autres",
                    backend: "Backend",
                    database: "Base de Données",
                    tools: "DevOps & Outils"
                },
                stats: {
                    technologies: "Technologies",
                    categories: "Catégories",
                    years: "Années d'Expérience",
                    learning: "Apprentissage"
                },
                quote: "La meilleure façon de prédire l'avenir est de le créer.",
                quoteAuthor: "— Peter Drucker"
            },
            faq: {
                badge: "Des Questions?",
                title: "FAQ",
                subtitle: "Tout ce que vous devez savoir sur le travail avec moi",
                stillQuestions: "Encore des questions?",
                stillQuestionsDesc: "J'aimerais discuter de votre projet et répondre à toutes vos questions spécifiques.",
                getInTouch: "Contactez-moi",
                sendEmail: "Envoyer un email",
                items: [
                    {
                        question: "Quels services offrez-vous?",
                        answer: "Je fournis le développement web full-stack, le développement d'applications mobiles (React Native & Flutter), la conception UI/UX et le conseil technique. Du concept au déploiement."
                    },
                    {
                        question: "Combien de temps prend un projet typique?",
                        answer: "Les délais varient selon la complexité. Un site simple prend 2-4 semaines, tandis que les applications complexes prennent généralement 6-12 semaines."
                    },
                    {
                        question: "Développez-vous des applications mobiles?",
                        answer: "Oui! Je me spécialise dans le développement mobile cross-platform avec React Native et Flutter. Cela permet à votre app de fonctionner sur iOS et Android."
                    },
                    {
                        question: "Quel est votre processus de développement?",
                        answer: "Je suis une approche agile: Découverte & Planification → Conception & Prototypage → Développement & Tests → Lancement & Support."
                    },
                    {
                        question: "Fournissez-vous un support continu?",
                        answer: "Absolument! J'offre des packages de maintenance incluant corrections de bugs, mises à jour de sécurité et optimisations de performance."
                    },
                    {
                        question: "Pouvez-vous travailler avec mon équipe existante?",
                        answer: "Oui, je collabore bien avec les équipes existantes. Que vous ayez besoin d'un développeur full-stack ou d'un consultant technique."
                    }
                ]
            },
            footer: {
                description: "Construire l'avenir grâce à des solutions web et mobiles innovantes.",
                quickLinks: "Liens Rapides",
                getInTouch: "Contactez-Nous",
                location: "Localisation",
                locationValue: "Kigali, Rwanda",
                availability: "Disponibilité",
                availabilityValue: "Ouvert aux nouveaux projets",
                startProject: "Démarrer un projet",
                copyright: "Construire l'avenir, un projet à la fois.",
                downloadCV: "Télécharger CV"
            },
            nav: {
                home: { title: "Accueil", desc: "Retour à la page d'accueil" },
                about: { title: "À Propos", desc: "Découvrez mon parcours" },
                services: { title: "Services", desc: "Ce que je peux faire pour vous" },
                projects: { title: "Projets", desc: "Voir mon dernier travail" },
                skills: { title: "Compétences", desc: "Mon expertise technique" },
                faq: { title: "FAQ", desc: "Questions fréquemment posées" },
                contact: { title: "Contact", desc: "Commençons quelque chose de grand" }
            }
        }
    },
    de: {
        translation: {
            hero: {
                badge: "👋 Verfügbar für neue Projekte",
                greeting: "Hi, ich bin ",
                subtitle: "Ich entwickle digitale Lösungen, die",
                typewriter: [
                    "überall funktionieren",
                    "echte Probleme lösen",
                    "Geschäftswachstum fördern",
                    "Gemeinschaften verbinden",
                    "Nutzer stärken"
                ],
                description: "Full-stack & Mobile-Entwickler, der Web-Apps, mobile Lösungen und KI-Tools vom Konzept bis zur Markteinführung entwickelt.",
                cta: {
                    viewWork: "Meine Arbeit Ansehen",
                    services: "Services",
                    letsTalk: "Lass Uns Reden"
                },
                techStack: {
                    title: "Aktueller Stack",
                    subtitle: "Technologien, mit denen ich arbeite",
                    status: "Verfügbar für Projekte"
                },
                scrollToExplore: "Scrollen zum Erkunden"
            },
            about: {
                badge: "Über Mich",
                text: "Ich entwickle digitale Lösungen, die überall funktionieren. Web-Apps, mobile Apps und alles dazwischen.",
                crossPlatform: {
                    title: "Plattformübergreifend",
                    description: "Web-, Mobile- und Desktop-Apps, die überall funktionieren."
                },
                fullStack: {
                    title: "Full-Stack",
                    description: "Vom Design bis zur Bereitstellung - ich mache alles."
                },
                cta: {
                    workTogether: "Lass Uns Zusammenarbeiten",
                    viewResume: "Lebenslauf Ansehen"
                }
            },
            services: {
                title: "Services",
                subtitle: "Ich helfe Unternehmen und Startups dabei, umfassende digitale Lösungen für Web, Mobile und darüber hinaus zu entwickeln",
                quote: "Gutes Design ist nicht nur, wie es aussieht — gutes Design ist, wie es funktioniert.",
                quoteAuthor: "— Steve Jobs"
            },
            faq: {
                badge: "Fragen?",
                title: "FAQ",
                subtitle: "Alles, was Sie über die Zusammenarbeit mit mir wissen müssen",
                stillQuestions: "Noch Fragen?",
                stillQuestionsDesc: "Ich würde gerne Ihr Projekt besprechen und alle spezifischen Fragen beantworten.",
                getInTouch: "Kontakt aufnehmen",
                sendEmail: "E-Mail senden",
                items: [
                    {
                        question: "Welche Dienstleistungen bieten Sie an?",
                        answer: "Ich biete Full-Stack-Webentwicklung, Mobile-App-Entwicklung (React Native & Flutter), UI/UX-Design und technische Beratung. Vom Konzept bis zur Bereitstellung."
                    },
                    {
                        question: "Wie lange dauert ein typisches Projekt?",
                        answer: "Projektzeitpläne variieren je nach Komplexität. Eine einfache Website dauert 2-4 Wochen, während komplexe Anwendungen normalerweise 6-12 Wochen dauern."
                    },
                    {
                        question: "Entwickeln Sie mobile Apps?",
                        answer: "Ja! Ich spezialisiere mich auf plattformübergreifende Mobile-Entwicklung mit React Native und Flutter. Dies ermöglicht es Ihrer App, auf iOS und Android zu funktionieren."
                    },
                    {
                        question: "Wie ist Ihr Entwicklungsprozess?",
                        answer: "Ich folge einem agilen Ansatz: Entdeckung & Planung → Design & Prototyping → Entwicklung & Testen → Launch & Support."
                    },
                    {
                        question: "Bieten Sie laufenden Support?",
                        answer: "Absolut! Ich biete Wartungspakete mit Bugfixes, Sicherheitsupdates, Performance-Optimierungen und Feature-Erweiterungen."
                    },
                    {
                        question: "Können Sie mit meinem bestehenden Team arbeiten?",
                        answer: "Ja, ich arbeite gut mit bestehenden Teams zusammen. Ob Sie einen Full-Stack-Entwickler oder technischen Berater benötigen."
                    }
                ]
            },
            footer: {
                description: "Die Zukunft durch innovative Web- und Mobile-Lösungen gestalten.",
                quickLinks: "Schnelle Links",
                getInTouch: "Kontakt",
                location: "Standort",
                locationValue: "Kigali, Rwanda",
                availability: "Verfügbarkeit",
                availabilityValue: "Offen für neue Projekte",
                startProject: "Projekt starten",
                copyright: "Die Zukunft bauen, ein Projekt nach dem anderen.",
                downloadCV: "Lebenslauf herunterladen"
            },
            nav: {
                home: { title: "Startseite", desc: "Zurück zur Startseite" },
                about: { title: "Über Mich", desc: "Erfahren Sie mehr über meine Reise" },
                services: { title: "Services", desc: "Was ich für Sie tun kann" },
                projects: { title: "Projekte", desc: "Sehen Sie meine neueste Arbeit" },
                skills: { title: "Fähigkeiten", desc: "Meine technische Expertise" },
                faq: { title: "FAQ", desc: "Häufig gestellte Fragen" },
                contact: { title: "Kontakt", desc: "Lassen Sie uns etwas Großartiges beginnen" }
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },
    });

export default i18n;
