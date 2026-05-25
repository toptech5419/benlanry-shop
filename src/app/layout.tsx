import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Benlanry — Discover. Compare. Buy Smart.',
    template: '%s | Benlanry',
  },
  description: 'Expert-curated Amazon product picks. Find the best products across electronics, home, kitchen, and more. Updated daily.',
  metadataBase: new URL('https://benlanry.shop'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://benlanry.shop',
    siteName: 'Benlanry',
    title: 'Benlanry — Discover. Compare. Buy Smart.',
    description: 'Expert-curated Amazon product picks. Find the best products across electronics, home, kitchen, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benlanry — Discover. Compare. Buy Smart.',
    description: 'Expert-curated Amazon product picks.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-body">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
