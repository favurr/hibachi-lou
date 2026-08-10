"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Lenis from "lenis";

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  useEffect(() => {
    if (!overlayRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.set(overlayRef.current, { yPercent: 100 })
        .to(overlayRef.current, { yPercent: 0, duration: 0.5, ease: "power3.inOut" })
        .to(overlayRef.current, { yPercent: -100, duration: 0.5, ease: "power3.inOut", delay: 0.1 });
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-background"
        aria-hidden="true"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html { scroll-behavior: auto; }
            html.lenis, html.lenis body { height: auto; }
            .lenis.lenis-smooth { scroll-behavior: auto !important; }
          `,
        }}
      />
    </>
  );
}
