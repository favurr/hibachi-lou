import { Footer } from "@/components/public/footer";
import { PublicNav } from "@/components/public/nav";
import { LayoutAnimations } from "@/components/shared/layout-animations";
import { PublicShell } from "@/components/shared/public-shell";
import { ThemeProvider } from "@/components/shared/theme-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  variable: "--font-geist-sans",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Geist.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-Italic.ttf",
      weight: "300",
      style: "italic",
    },
  ],
});

const geistMono = localFont({
  variable: "--font-geist-mono",
  display: "swap",
  src: [
    {
      path: "../public/fonts/GeistMono.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/GeistMono-Italic.ttf",
      weight: "300",
      style: "italic",
    },
  ],
});

const theSeasons = localFont({
  variable: "--font-the-seasons",
  display: "swap",
  src: [
    {
      path: "../public/fonts/theseasons-lt.otf",
      weight: "200",
    },
    {
      path: "../public/fonts/theseasons-reg.otf",
      weight: "400",
    },
    {
      path: "../public/fonts/theseasons-bd.otf",
      weight: "700",
    },
  ],
});

export const metadata: Metadata = {
  title: "Hibachi Lou — Pittsburgh Hibachi Food Truck",
  description:
    "Fresh hibachi grilled to order around Pittsburgh. Book Lou for catering, weddings, and events.",
};

import { CartDrawer } from "@/components/public/cart-drawer";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${theSeasons.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <PublicShell>
            <LayoutAnimations>
              <PublicNav />
              <main className="flex-1">{children}</main>
              <CartDrawer />
              <Footer />
            </LayoutAnimations>
          </PublicShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
