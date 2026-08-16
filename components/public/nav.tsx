"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransitionLink } from "../shared/transition-provider";

const SECTIONS = [
  { href: "/menu", label: "MENU" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/about", label: "ABOUT" },
  { href: "/locations", label: "LOCATIONS" },
  { href: "/catering", label: "CATERING" },
  { href: "/catering", label: "BOOK LOU →" },
];

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  const desktopLinks = SECTIONS.map((item) => {
    return (
      <TransitionLink key={item.href} href={item.href} className="hover:text-primary">
        {item.label}
      </TransitionLink>
    );
  });

  const mobileLinks = SECTIONS.map((item) => {
    return (
      <TransitionLink key={item.href} href={item.href} onClick={() => setOpen(false)}>
        {item.label}
      </TransitionLink>
    );
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <TransitionLink
            href="/"
            className="font-serif text-lg tracking-wide text-foreground hover:text-foreground/80 transition-colors flex items-baseline gap-1"
            aria-label="Home"
          >
          HIBACHI LOU
        </TransitionLink>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground">
          {desktopLinks}
        </nav>
        <div className="flex items-center gap-2">
          <TransitionLink href="/catering" className="hidden md:inline-flex text-sm font-medium hover:text-primary">
            BOOK LOU →
          </TransitionLink>
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
