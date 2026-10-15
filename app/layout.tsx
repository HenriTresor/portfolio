import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import "./portfolio.css";
import "lenis/dist/lenis.css";
import CustomCursor from "./components/CustomCursor";
import Background from "./components/Background";
import TextScrambler from "./components/TextScrambler";
import Footer from "./components/Footer";
import IntroScreen from "./components/IntroScreen";
import SmoothScroll from "./components/SmoothScroll";
import I18nProvider from "./components/I18nProvider";
import ClientLayout from "./components/ClientLayout";
import { ThemeProvider } from "./components/ThemeProvider";


const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Henri Tresor - Full-Stack & Mobile Developer",
  description: "Full-stack & mobile developer crafting web apps, mobile solutions, and AI-powered tools. Available for new projects.",
  keywords: ["Henri Tresor", "Full-Stack Developer", "Mobile Developer", "React", "Next.js", "React Native", "Flutter"],
  authors: [{ name: "Henri Tresor" }],
  creator: "Henri Tresor",
  openGraph: {
    title: "Henri Tresor - Full-Stack & Mobile Developer",
    description: "Full-stack & mobile developer crafting web apps, mobile solutions, and AI-powered tools.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henri Tresor - Full-Stack & Mobile Developer",
    description: "Full-stack & mobile developer crafting web apps, mobile solutions, and AI-powered tools.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "32x32" }
    ],
    apple: { url: "/favicon.svg", type: "image/svg+xml", sizes: "180x180" },
    shortcut: { url: "/favicon.svg", type: "image/svg+xml" }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" className="notranslate" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <script dangerouslySetInnerHTML={{ __html: "(function(){try{var saved=localStorage.getItem(\"theme\");var choice=saved===\"light\"||saved===\"dark\"?saved:(matchMedia(\"(prefers-color-scheme: dark)\").matches?\"dark\":\"light\");document.documentElement.classList.add(choice);document.documentElement.style.colorScheme=choice}catch(e){}})();" }} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
        <link rel="apple-touch-icon" href="/favicon.svg?v=2" />
        <link rel="shortcut icon" href="/favicon.svg?v=2" />
        <meta name="theme-color" content="#9ac7ff" />
      </head>
      <body className={`${syne.variable} antialiased`}>
        <ThemeProvider>
          <I18nProvider>
            <SmoothScroll>
            <IntroScreen />
            <Background />
            <CustomCursor />
            <TextScrambler />
            <ClientLayout>
              {children}
            </ClientLayout>
            <Footer />
            </SmoothScroll>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
