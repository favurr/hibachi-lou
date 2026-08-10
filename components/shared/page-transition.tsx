"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const initialized = useRef(false);

  const getPageTitle = (path: string) => {
    if (path === "/") return "HOME";
    if (path === "/about") return "ABOUT";
    if (path === "/gallery") return "GALLERY";
    if (path === "/menu") return "MENU";
    if (path === "/catering") return "CATERING";
    if (path === "/experience") return "EXPERIENCE";
    if (path === "/locations") return "LOCATIONS";
    if (path === "/contact") return "BOOK LOU";
    return "HIBACHI LOU";
  };

  const runEntrance = () => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        panelRef.current,
        { yPercent: -100 },
        { yPercent: 100, duration: 0.35, ease: "power3.inOut" }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45 },
        "-=0.15"
      )
      .fromTo(
        containerRef.current?.children || [],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 },
        "-=0.25"
      );
    }, containerRef);

    return () => ctx.revert();
  };

  useEffect(() => {
    if (!containerRef.current) return;

    if (!initialized.current) {
      gsap.set(containerRef.current.children || [], { opacity: 1, y: 0 });
      gsap.set(titleRef.current, { opacity: 1, y: 0 });
      gsap.set(panelRef.current, { yPercent: 100 });
      initialized.current = true;
      return;
    }

    const cleanup = runEntrance();
    return cleanup;
  }, [pathname]);

  return (
    <div ref={containerRef} className="relative min-h-[calc(100vh-4rem)]">
      <div
        ref={panelRef}
        className="fixed inset-0 z-50 bg-primary flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <h2
          ref={titleRef}
          className="font-heading text-5xl font-bold tracking-tight text-cream md:text-7xl leading-[0.88]"
        >
          {getPageTitle(pathname)}
        </h2>
      </div>
      {children}
    </div>
  );
}
