import { Providers } from "@/components/providers";
import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { Footer } from "@/components/core/layout/footer";
import Script from "next/script";
import { env } from "@/env";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        {env.NEXT_PUBLIC_ENABLE_UMAMI === "true" && (
          <Script
            defer
            src="https://metrics.kway.club/script.js"
            data-website-id="cd373fac-72f2-46f9-9892-eb7ff3820b6d"
            strategy="afterInteractive"
          />
        )}
        <body className={geistMono.className}>
          <Providers>
            <div className="min-h-screen flex flex-col">
              {children}
              <Footer />
            </div>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}

export const metadata = {
  title: "Hypixel Ban Statistics",
  description: "Real-time tracking of Hypixel ban statistics",
};
