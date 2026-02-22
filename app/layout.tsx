import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Schism Base',
    template: '%s | Schism Base',
  },
  description: 'Database karakter untuk Schism Series. Berisi informasi lengkap tentang karakter, power system (Astral Energy, Astral Technique), Divine Conditions, 5 Primordium Families, dan 4 Omniverses.',
  keywords: [
    'Schism Series', 'character database', 'Schism Termina', 'Schism The Beginning', 'Schism Hell',
    'Astral Energy', 'Astral Technique', 'Divine Conditions', 'Primordium',
    'Vennamyseus', 'Remeryllus', 'Asariya', 'Lea ven Belladonna', 'Leo ven Belleum',
    'Avoro ven Belleum', 'Ars ven Belleum', 'Artemys ven Belladonna',
    'Remulus ven Belladonna', 'Athena ven Belladonna', 'Anne',
    'Zero-Entropy', 'Primal-Axiomatic', 'Axiomatic', 'Morphogen',
    'OmniVenna', 'OmniEvitheia', 'OmniRion', 'OmniSera',
  ],
  authors: [{ name: 'Schism Series Author' }],
  openGraph: {
    title: 'Schism Base',
    description: 'Database karakter lengkap untuk Schism Series. Profil karakter, power system, divine conditions, primordium families, dan omniverses.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Schism Base',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schism Base',
    description: 'Database karakter lengkap untuk Schism Series.',
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
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
      },
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
  verification: {
    google: 'snyNWth_xlkHUx0bEMH4S3gdX8loNz0XfQjc_lQ2N3A',
  },
  other: {
    'ai-content-declaration': 'Schism Base - This website contains fictional character data from the Schism Series. All content is AI-readable. See /llms.txt for structured content.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
