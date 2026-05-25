import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

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
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-body">
        {oneSignalAppId && (
          <Script id="onesignal-init" strategy="afterInteractive">
            {`
              window.OneSignalDeferred = window.OneSignalDeferred || [];
              (function() {
                var oneSignalScript = document.createElement("script");
                oneSignalScript.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
                oneSignalScript.defer = true;
                document.head.appendChild(oneSignalScript);
              })();
              window.OneSignalDeferred.push(async function(OneSignal) {
                await OneSignal.init({
                  appId: "${oneSignalAppId}",
                  notifyButton: { enable: false },
                  allowLocalhostAsSecureOrigin: true,
                });
              });
            `}
          </Script>
        )}
        {children}
      </body>
    </html>
  )
}
