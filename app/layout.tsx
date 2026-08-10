import type { Metadata } from "next";
import localFont from "next/font/local";
import { PublicNav } from "@/components/public/nav";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { PageLoader } from "@/components/public/loader";
import { PageTransition } from "@/components/shared/page-transition";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { Footer } from "@/components/public/footer";
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
  description: "Fresh hibachi grilled to order around Pittsburgh. Book Lou for catering, weddings, and events.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${theSeasons.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SmoothScroll />
          <PageLoader />
          <PublicNav />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
