import { Providers } from "@/components/providers";
import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { Footer } from "@/components/core/layout/footer";

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
