"use client";

import { useState, useEffect, useCallback } from "react";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { TransitionProvider } from "@/components/shared/transition-provider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CartProvider } from "@/components/shared/cart-context";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);

  // Lock scroll while loading screen is active
  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  const handleLoadingComplete = useCallback(() => {
    document.body.style.overflow = "";
    setShowLoader(false);
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <CartProvider>
      <TransitionProvider>
        {/* Loading screen overlay — sits ON TOP of content on hard load */}
        {showLoader && <LoadingScreen onComplete={handleLoadingComplete} />}

        {/* Content is wrapped within the provider layout */}
        {children}
      </TransitionProvider>
    </CartProvider>
  );
}
