import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Script from 'next/script';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#8B4513',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'APNA Bazar | Shop Smarter • Live Better',
  description:
    'Pakistan\'s premier destination for lifestyle, fashion, luxury watches, electronics, and smart gadgets. Cash on delivery nationwide.',
  manifest: '/manifest.json',
  icons: {
    icon: '/logo-transparent.png',
    apple: '/icons/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'APNA Bazar',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen flex flex-col selection:bg-brand-brown selection:text-white bg-[#FAF8F5]">
        <CartProvider>{children}</CartProvider>

        {/* Register Service Worker for PWA / Mobile APK installation */}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').catch(function(err) {
                  console.log('ServiceWorker registration error:', err);
                });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
