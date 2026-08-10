"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  { href: "/#menu", label: "MENU" },
  { href: "/#gallery", label: "GALLERY" },
  { href: "/#about", label: "ABOUT" },
  { href: "/#locations", label: "LOCATIONS" },
  { href: "/#catering", label: "CATERING" },
  { href: "/#contact", label: "BOOK LOU →" },
];

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  const desktopLinks = SECTIONS.map((item) => (
    <Link key={item.href} href={isHome ? item.href.replace(/^\/#/, "#") : item.href} className="hover:text-primary">
      {item.label}
    </Link>
  ));

  const mobileLinks = SECTIONS.map((item) => {
    const href = isHome ? item.href.replace(/^\/#/, "#") : item.href;
    return (
      <Link key={href} href={href} onClick={() => setOpen(false)}>
        {item.label}
      </Link>
    );
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-heading text-base font-semibold tracking-wide text-foreground">
          HIBACHI LOU
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground">
          {desktopLinks}
        </nav>
        <div className="flex items-center gap-2">
          <Link href={isHome ? "#contact" : "/#contact"} className="hidden md:inline-flex text-sm font-medium hover:text-primary">
            BOOK LOU →
          </Link>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            {open && (
              <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
                <div className="absolute right-0 top-0 h-full w-64 bg-background p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="mb-6" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                  <div className="flex flex-col gap-5 text-base font-medium">{mobileLinks}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
