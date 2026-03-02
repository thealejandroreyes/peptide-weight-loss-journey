import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DisclaimerBanner } from '@/components/DisclaimerBanner'

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const jetbrains = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Peptide Nerds — Evidence-Based Peptide Guide',
    template: '%s | Peptide Nerds',
  },
  description:
    'The evidence-based guide to peptides for weight loss. GLP-1 comparisons, dosing protocols, side effect management, and research-backed recommendations.',
  metadataBase: new URL('https://peptidenerds.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Peptide Nerds',
  },
  twitter: {
    card: 'summary_large_image',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}>
        <Header />
        <DisclaimerBanner />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
