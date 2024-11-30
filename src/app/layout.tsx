import './globals.css';

import localFont from 'next/font/local';
import Script from 'next/script';
import { ViewTransitions } from 'next-view-transitions';

import { Footer } from '@/components/core/layout/footer';
import { Providers } from '@/components/providers';
import { env } from '@/env';
import { baseUrl, createMetadata } from '@/lib/metadata';

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <ViewTransitions>
      <html lang='en' suppressHydrationWarning>
        {env.NEXT_PUBLIC_ENABLE_UMAMI === 'true' && (
          <Script
            defer
            src='https://metrics.kway.club/script.js'
            data-website-id='cd373fac-72f2-46f9-9892-eb7ff3820b6d'
            strategy='afterInteractive'
          />
        )}
        <body className={geistMono.className}>
          <Providers>
            <div className='flex min-h-screen flex-col'>
              {children}
              <div className='relative'>{modal}</div>
              <Footer />
            </div>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}

export const metadata = createMetadata({
  title: {
    template: '%s | banz.club',
    default: 'Hypixel Ban Statistics'
  },
  description: 'Real-time tracking of Hypixel ban statistics',
  metadataBase: baseUrl
});
