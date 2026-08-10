"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LOADER_KEY = "hibachi-lou-loader-shown";

export function PageLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const root = ref.current;
    if (!root || initialized.current) return;
    initialized.current = true;

    const shouldRun = typeof window !== "undefined" && !sessionStorage.getItem(LOADER_KEY);

    if (!shouldRun) {
      gsap.set(root, { display: "none" });
      return;
    }

    sessionStorage.setItem(LOADER_KEY, "true");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(root, { display: "none" });
        },
      });

      tl.fromTo(
        ".loader-logo",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.7 }
      )
      .fromTo(
        ".loader-meta",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6 },
        "<0.1"
      )
      .fromTo(
        ".loader-progress",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
        "<0.2"
      )
      .to(root, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        delay: 0.15,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#f5f0e8]"
    >
      <div className="loader-logo font-heading text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
        HIBACHI LOU
      </div>
      <p className="loader-meta mt-3 font-mono text-sm tracking-widest text-foreground/80">
        412 / PITTSBURGH
      </p>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 h-1 w-40 overflow-hidden rounded-full bg-foreground/20">
        <div
          className="loader-progress h-full origin-left scale-x-0 bg-primary"
          style={{ transformOrigin: "left" }}
        />
      </div>
    </div>
  );
}
