import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer/footer";

import { Toaster } from "@/components/ui/sonner";
import { ModelProvider } from "./(dashboard)/board/[id]/provider/model-provider";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { ClerkThemeProvider } from "@/components/theme-provider/clerk-theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boardzy",
  description: "Create boards, add cards, manage projects, and get things done",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkThemeProvider>
            <main className="min-h-screen">{children}</main>
            <Toaster />
            <ModelProvider />
            <Footer />
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
