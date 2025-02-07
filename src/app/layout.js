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
  title: "Kiky Restu Noviansyah - Portfolio",
  description: "Front-end Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} ${syne.variable} ${orbitron.variable} font-poppins`}>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} ${syne.variable} ${orbitron.variable} font-poppins`}>
        {children}
      </body>
    </html>
  );
}
