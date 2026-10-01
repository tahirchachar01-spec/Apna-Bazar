import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'APNA Bazar | Shop Smarter • Live Better',
  description:
    'Pakistan\'s premier destination for lifestyle, fashion, luxury watches, electronics, and smart gadgets. Cash on delivery nationwide.',
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="min-h-screen flex flex-col selection:bg-brand-brown selection:text-white bg-[#FAF8F5]">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
