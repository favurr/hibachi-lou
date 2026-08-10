"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-heading text-base font-semibold tracking-wide text-foreground">
          HIBACHI LOU
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground">
          <Link href="#menu" className="hover:text-primary">MENU</Link>
          <Link href="#gallery" className="hover:text-primary">GALLERY</Link>
          <Link href="#about" className="hover:text-primary">ABOUT</Link>
          <Link href="#locations" className="hover:text-primary">LOCATIONS</Link>
          <Link href="#catering" className="hover:text-primary">CATERING</Link>
          <Link href="#contact" className="hover:text-primary">BOOK LOU →</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="#contact" className="hidden md:inline-flex text-sm font-medium hover:text-primary">
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
                  <div className="flex flex-col gap-5 text-base font-medium">
                    <Link href="#menu" onClick={() => setOpen(false)}>Menu</Link>
                    <Link href="#gallery" onClick={() => setOpen(false)}>Gallery</Link>
                    <Link href="#about" onClick={() => setOpen(false)}>About</Link>
                    <Link href="#locations" onClick={() => setOpen(false)}>Locations</Link>
                    <Link href="#catering" onClick={() => setOpen(false)}>Catering</Link>
                    <Link href="#contact" onClick={() => setOpen(false)}>Book Lou →</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
