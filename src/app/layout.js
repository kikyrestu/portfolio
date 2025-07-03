import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from 'next/font/google'
import "./globals.css";
import { Inter, Space_Grotesk } from 'next/font/google'
import { Outfit } from 'next/font/google'
import { Syne } from 'next/font/google'
import { Orbitron } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

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
  title: "Kiky Restu Noviansyah - Frontend Developer Portfolio | React & Next.js Expert Indonesia",
  description: "Frontend Developer Indonesia spesialis React & Next.js. Ahli dalam pengembangan website modern, responsive design, dan clean code. Portofolio terbaik dengan pengalaman di berbagai proyek teknologi web terkini.",
  keywords: [
    "Kiky Restu Noviansyah",
    "Frontend Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "Indonesia",
    "Web Developer Indonesia",
    "Frontend Engineer Jakarta",
    "React.js Expert",
    "Next.js Specialist",
    "UI/UX Developer",
    "JavaScript Developer Indonesia",
    "TypeScript Expert",
    "Web Development Services",
    "Jasa Pembuatan Website",
    "Portfolio Website",
    "Professional Web Developer",
    "Frontend Development Indonesia",
    "React Native Developer"
  ],
  openGraph: {
    title: 'Kiky Restu Noviansyah - Expert Frontend Developer Indonesia',
    description: 'Frontend Developer spesialis React & Next.js dengan fokus pada performa dan user experience. Berpengalaman dalam pembuatan website modern dan aplikasi web yang scalable.',
    url: 'https://kikyrestunov.vercel.app',
    siteName: 'Kiky Restu - Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kiky Restu Noviansyah - Professional Frontend Developer Portfolio'
      },
    ],
    locale: 'id_ID',
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
        <meta name="description" content="Frontend Developer Indonesia spesialis React & Next.js. Ahli dalam pengembangan website modern, responsive design, dan clean code. Portofolio terbaik dengan pengalaman di berbagai proyek teknologi web terkini." />
        <meta name="keywords" content="Kiky Restu Noviansyah, Frontend Developer, Web Developer, React Developer, Next.js Developer, Portfolio, Indonesia, Web Developer Indonesia, Frontend Engineer Jakarta, React.js Expert, Next.js Specialist, UI/UX Developer, JavaScript Developer Indonesia, TypeScript Expert, Web Development Services, Jasa Pembuatan Website, Portfolio Website, Professional Web Developer, Frontend Development Indonesia, React Native Developer" />
        <meta name="author" content="Kiky Restu Noviansyah" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kikyrestunov.vercel.app/" />
        <meta property="og:title" content="Kiky Restu Noviansyah - Expert Frontend Developer Indonesia" />
        <meta property="og:description" content="Frontend Developer spesialis React & Next.js dengan fokus pada performa dan user experience. Berpengalaman dalam pembuatan website modern dan aplikasi web yang scalable." />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kikyrestunov.vercel.app/" />
        <meta property="twitter:title" content="Kiky Restu Noviansyah - Frontend Developer" />
        <meta property="twitter:description" content="Frontend Developer specializing in React, Next.js, and modern web technologies" />
        <meta property="twitter:image" content="/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Google Site Verification */}
        <meta 
          name="google-site-verification" 
          content="google8366d1a87ce1c8d2" 
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kiky Restu Noviansyah",
            "jobTitle": "Frontend Developer",
            "description": "Professional Frontend Developer dari Indonesia dengan spesialisasi di React.js dan Next.js",
            "url": "https://kikyrestunov.vercel.app",
            "image": "https://kikyrestunov.vercel.app/og-image.jpg",
            "sameAs": [
              "https://github.com/kikyrestu",
              "https://linkedin.com/in/kikyrestu"
            ],
            "knowsAbout": [
              "React",
              "Next.js",
              "JavaScript",
              "TypeScript",
              "Frontend Development",
              "Web Development",
              "UI/UX Design",
              "Responsive Design",
              "Web Performance Optimization"
            ],
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance Frontend Developer"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Indonesia"
            },
            "makesOffer": [
              {
                "@type": "Offer",
                "name": "Frontend Development Services",
                "description": "Pengembangan website modern menggunakan React.js dan Next.js"
              },
              {
                "@type": "Offer",
                "name": "Web Application Development",
                "description": "Pembuatan aplikasi web yang responsif dan performa tinggi"
              }
            ]
          })}
        </script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} ${syne.variable} ${orbitron.variable} font-poppins`}>
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #475569'
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff'
              }
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff'
              }
            }
          }}
        />
      </body>
    </html>
  );
}
