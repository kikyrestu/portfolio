import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from 'next/font/google'
import "./globals.css";
import { Inter, Space_Grotesk } from 'next/font/google'
import { Outfit } from 'next/font/google'
import { Syne } from 'next/font/google'
import { Orbitron } from 'next/font/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

// Google fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit'
})

const syne = Syne({ 
  subsets: ['latin'],
  variable: '--font-syne'
})

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron'
})

export const metadata = {
  title: "Kiky Restu Noviansyah - Frontend Developer Portfolio",
  description: "Frontend Developer specializing in React, Next.js, and modern web technologies. View my latest projects and get in touch for collaboration.",
  keywords: [
    "Kiky Restu Noviansyah",
    "Frontend Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "Indonesia"
  ],
  openGraph: {
    title: 'Kiky Restu Noviansyah - Frontend Developer',
    description: 'Frontend Developer specializing in React, Next.js, and modern web technologies',
    url: 'https://kikyrestunov.vercel.app',
    siteName: 'Kiky Restu Portfolio',
    images: [
      {
        url: '/og-image.jpg', // Tambahkan gambar OG
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Kiky Restu Noviansyah - Frontend Developer',
    description: 'Frontend Developer specializing in React, Next.js, and modern web technologies',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code', // Optional: dari Google Search Console
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} ${syne.variable} ${orbitron.variable} font-poppins`}>
      <head>
        {/* Primary Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="description" content="Frontend Developer specializing in React, Next.js, and modern web technologies" />
        <meta name="keywords" content="Kiky Restu Noviansyah, Frontend Developer, Web Developer, React, Next.js" />
        <meta name="author" content="Kiky Restu Noviansyah" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kikyrestunov.vercel.app/" />
        <meta property="og:title" content="Kiky Restu Noviansyah - Frontend Developer" />
        <meta property="og:description" content="Frontend Developer specializing in React, Next.js, and modern web technologies" />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kikyrestunov.vercel.app/" />
        <meta property="twitter:title" content="Kiky Restu Noviansyah - Frontend Developer" />
        <meta property="twitter:description" content="Frontend Developer specializing in React, Next.js, and modern web technologies" />
        <meta property="twitter:image" content="/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} ${syne.variable} ${orbitron.variable} font-poppins`}>
        {children}
      </body>
    </html>
  );
}
