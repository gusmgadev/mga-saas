import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: "MGA Informática: desarrollo web, sistemas de gestión, soporte técnico y consultoría IT en Comodoro Rivadavia y Rada Tilly, Chubut. Distribuidor certificado ZooLogic.",
  keywords: [
    "MGA Informática", "desarrollo web Comodoro Rivadavia", "sistemas de gestión Chubut",
    "soporte técnico Comodoro Rivadavia", "consultoría IT Patagonia", "ZooLogic distribuidor",
    "Rada Tilly tecnología", "punto de venta Chubut", "software gestión pymes",
  ],
  authors: [{ name: "MGA Informática" }],
  creator: "MGA Informática",
  metadataBase: new URL("https://mgainformatica.com.ar"),
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://mgainformatica.com.ar",
    siteName: "MGA Informática",
    title: "MGA Informática | Soluciones Tecnológicas",
    description: "Desarrollo web, sistemas de gestión, soporte técnico y consultoría IT en Comodoro Rivadavia, Chubut.",
    images: [{ url: "/images/logos/mga-logo.png", width: 400, height: 120, alt: "MGA Informática" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MGA Informática | Soluciones Tecnológicas",
    description: "Desarrollo web, sistemas de gestión, soporte técnico y consultoría IT en Comodoro Rivadavia, Chubut.",
    images: ["/images/logos/mga-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${dmSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased scroll-smooth`}
    >
      <body
        className="min-h-full flex flex-col bg-white font-dm-sans"
        style={{
          borderLeft: "2px solid transparent",
          borderRight: "15px solid transparent",
          borderImage: "linear-gradient(to bottom, #2E5C8A, #cce7fd, #0c1019) 1",
        }}
      >
        {children}
      </body>
    </html>
  );
}
