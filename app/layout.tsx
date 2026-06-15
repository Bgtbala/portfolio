import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import { ThemeProvider } from "./context/ThemeContext";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import FloatingActions from "./components/FloatingActions";
import PortfolioChatbot from "./components/PortfolioChatbot";
import ParticleBackground from "./components/ParticleBackground";
import SmoothScroll from "./components/SmoothScroll";

export const metadata: Metadata = {
  title: "Balagangatharan | Portfolio",
  description: "Full Stack Developer with 1+ years of experience in MERN and Next.js, building scalable and secure web applications.",
  keywords: ["Full Stack Developer", "Next.js", "React", "Node.js", "AWS", "Portfolio", "MERN", "Balagangatharan"],
  authors: [{ name: "Balagangatharan M" }],
  openGraph: {
    title: "Balagangatharan | Full Stack Developer",
    description: "Building scalable web applications with MERN & Next.js",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Playfair+Display:wght@400..900&family=Bangers&family=JetBrains+Mono:wght@100..800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased overflow-x-hidden transition-colors duration-500">
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <ThemeProvider>
          <Preloader />
          <ScrollProgress />
          <ParticleBackground />
          <CustomCursor />
          <FloatingActions />
          <PortfolioChatbot />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
