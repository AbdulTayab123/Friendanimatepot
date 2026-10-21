import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/scroll";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { PROFILE } from "@/lib/data";

const interTight = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--font-inter-tight",
  display: "swap",
  weight: "100 900",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: PROFILE.resumeSummary.slice(0, 160),
  authors: [{ name: PROFILE.name }],
  metadataBase: new URL("https://ameemawaheed.dev"),
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.resumeSummary.slice(0, 160),
    url: "https://ameemawaheed.dev",
    siteName: `${PROFILE.name} Portfolio`,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} — ${PROFILE.role}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#f4f2ee] text-[#0d0d0d] antialiased selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        <SmoothScrollProvider>
          <RevealObserver />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
