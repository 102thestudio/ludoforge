import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LudoForge - Creador Universal de Juegos de Mesa Print & Play",
    template: "%s | LudoForge"
  },
  description: "Diseña, edita e imprime tus propios juegos de mesa (cartas coleccionables TCG, tableros estilo Monopoly, party games y roles ocultos) de forma fácil y gratuita.",
  keywords: ["juegos de mesa", "print and play", "creador de cartas", "monopoly personalizado", "fiasco de gente", "diseñar cartas", "ludo forge", "juegos para imprimir"],
  authors: [{ name: "Josema & Co." }],
  creator: "LudoForge Team",
  metadataBase: new URL("https://ludoforge.vercel.app"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://ludoforge.vercel.app",
    title: "LudoForge - Creador Universal de Juegos de Mesa",
    description: "Diseña, edita e imprime tus propios juegos de mesa y cartas listos para jugar en minutos.",
    siteName: "LudoForge"
  },
  twitter: {
    card: "summary_large_image",
    title: "LudoForge - Creador de Juegos de Mesa",
    description: "La plataforma definitiva para maquetar e imprimir juegos de mesa Print & Play gratis."
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  }
};

import { CSPostHogProvider } from "@/lib/posthog/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CSPostHogProvider>
          {children}
        </CSPostHogProvider>
      </body>
    </html>
  );
}
