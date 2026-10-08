"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Lightweight smooth-scroll wrapper.
 * Applies a lerp-based easing to window scroll for a Lenis-like feel.
 * Respects prefers-reduced-motion and stays native on touch devices.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const isTouchRef = useRef(false);

  useEffect(() => {
    if (reduce) return;

    // Touch devices: native momentum scroll feels better — skip.
    isTouchRef.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchRef.current) return;

    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    currentRef.current = window.scrollY;
    targetRef.current = window.scrollY;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onWheel = (e: WheelEvent) => {
      const el = e.target as HTMLElement | null;
      // Let modals / textareas opt out.
      if (el && el.closest("[data-native-scroll]")) return;

      e.preventDefault();
      targetRef.current = Math.max(
        0,
        Math.min(targetRef.current + e.deltaY, maxScroll())
      );
    };

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const step = window.innerHeight * 0.85;
      if (e.key === "PageDown") {
        targetRef.current = Math.min(targetRef.current + step, maxScroll());
      } else if (e.key === "PageUp") {
        targetRef.current = Math.max(0, targetRef.current - step);
      } else if (e.key === "Home") {
        targetRef.current = 0;
      } else if (e.key === "End") {
        targetRef.current = maxScroll();
      }
    };

    // If user drags scrollbar or pinch-zooms, realign target.
    const onScroll = () => {
      if (Math.abs(window.scrollY - currentRef.current) > 2) {
        currentRef.current = window.scrollY;
        targetRef.current = window.scrollY;
      }
    };

    // Smooth-scroll for anchor links (e.g. nav clicking #samples)
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;

      e.preventDefault();
      const top =
        (el as HTMLElement).getBoundingClientRect().top +
        window.scrollY;
      targetRef.current = Math.max(0, Math.min(top, maxScroll()));
    };

    const tick = () => {
      currentRef.current = lerp(currentRef.current, targetRef.current, 0.09);

      if (Math.abs(currentRef.current - targetRef.current) < 0.5) {
        currentRef.current = targetRef.current;
      }

      window.scrollTo(0, currentRef.current);

      // If something else moved scroll, resync.
      if (Math.abs(window.scrollY - currentRef.current) > 2) {
        currentRef.current = window.scrollY;
        targetRef.current = window.scrollY;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onAnchorClick);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onAnchorClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      html.style.scrollBehavior = prevBehavior;
    };
  }, [reduce]);

  return <>{children}</>;
}