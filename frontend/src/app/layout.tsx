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
  title: "GringADS - O Maior Swipe de Ofertas Gringas Escaladas",
  description: "Infoprodutos escalados nos mercados Latam, Americano e Europeu. Escale sua operação em dólar modelando infoprodutos gringos de sucesso. Copie, Cole e Escale!",
  keywords: [
    "infoprodutos",
    "dropshipping", 
    "marketing digital",
    "mercado americano",
    "mercado europeu",
    "latam",
    "escalar negócio",
    "produtos gringos",
    "vendas em dólar",
    "marketing de resposta direta"
  ],
  authors: [{ name: "GringADS" }],
  creator: "GringADS",
  publisher: "GringADS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gringads.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "GringADS - O Maior Swipe de Ofertas Gringas Escaladas",
    description: "Infoprodutos escalados nos mercados Latam, Americano e Europeu. Escale sua operação em dólar modelando infoprodutos gringos de sucesso.",
    url: 'https://gringads.com',
    siteName: 'GringADS',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GringADS - O Maior Swipe de Ofertas Gringas Escaladas',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GringADS - O Maior Swipe de Ofertas Gringas Escaladas",
    description: "Infoprodutos escalados nos mercados Latam, Americano e Europeu. Escale sua operação em dólar modelando infoprodutos gringos de sucesso.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
