"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PageLoader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          if (ref.current) {
            gsap.set(ref.current, { display: "none" });
          }
        },
      });

      tl.toTo(
        ".loader-progress",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8 }
      )
      .toTo(
        ".loader-counter",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "<"
      )
      .to(ref.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <p className="font-heading text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
        HIBACHI LOU
      </p>
      <p className="mt-3 font-mono text-sm tracking-widest text-muted-foreground">
        PITTSBURGH / 412
      </p>
      <div className="absolute bottom-10 right-10 flex flex-col items-end">
        <span className="loader-counter font-mono text-6xl font-light text-foreground md:text-8xl">
          0%
        </span>
      </div>
      <div className="absolute bottom-10 left-10 h-1 w-32 overflow-hidden rounded-full bg-muted">
        <div
          className="loader-progress h-full origin-left scale-x-0 bg-primary"
          style={{ transformOrigin: "left" }}
        />
      </div>
    </div>
  );
}
