import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { ThemedConstellation } from "~/components/ThemedConstellation";

export const metadata: Metadata = {
  title: "Learnstellation - AI-Powered Learning Platform",
  description: "Transform your learning experience with AI-powered personalized education. Learn at your own pace with intelligent tutoring and adaptive content.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider defaultTheme="system" storageKey="learnstellation-ui-theme">
          <ThemedConstellation 
            particleCount={80}
            connectionDistance={120}
            particleSpeed={0.3}
            className="opacity-40"
          />
          <div className="relative z-10">
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
