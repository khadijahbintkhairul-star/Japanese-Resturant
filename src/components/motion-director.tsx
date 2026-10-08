"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { fadeUp, floatLoop, gsap, ScrollTrigger, staggerReveal } from "@/lib/gsap";

export function MotionDirector({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;
    let removeParallax = () => {};
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nav = scope.querySelector<HTMLElement>(".nav");
      const overlay = scope.querySelector<HTMLElement>(".page-transition");
      if (reduced) { if (overlay) overlay.hidden = true; return; }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (overlay) intro.set(overlay, { autoAlpha: 1 }).to(overlay, { autoAlpha: 0, duration: .8, onComplete: () => { overlay.hidden = true; } });
      intro.fromTo(".hero-smoke", { autoAlpha: 0 }, { autoAlpha: .6, duration: 1.5 }, overlay ? "-=.55" : 0)
        .fromTo(".nav", { autoAlpha: 0, y: -30 }, { autoAlpha: 1, y: 0, duration: 1 }, "-=1.2")
        .fromTo(".hero-label", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .7 }, "-=.7")
        .fromTo(".hero-bowl", { autoAlpha: 0, scale: .82, y: 18 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1.4, ease: "power4.out" }, "-=.35")
        .fromTo(".sticker", { autoAlpha: 0, scale: .7, rotation: 0 }, { autoAlpha: 1, scale: 1, rotation: i => [-9, 8, 6, -7, 0][i] ?? 0, duration: .65, stagger: .12, ease: "back.out(1.7)" }, "-=.75")
        .fromTo(".hero-cta", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: .9, ease: "power4.out" }, "-=.3")
        .fromTo(".hero-cta .button", { autoAlpha: 0, scale: .88 }, { autoAlpha: 1, scale: 1, duration: .55, ease: "back.out(1.8)" }, "-=.18");

      const bowl = scope.querySelector(".hero-bowl");
      if (bowl) floatLoop(bowl, 7, 4.6, 2.8);
      gsap.utils.toArray<HTMLElement>(".steam").forEach((strand, i) => gsap.fromTo(strand, { autoAlpha: 0, y: 8, scaleX: .75, rotation: i % 2 ? 5 : -5 }, { autoAlpha: .45, y: -56, scaleX: 1.2, rotation: i % 2 ? -5 : 5, duration: 3.6 + i * .65, delay: 1.8 + i * .38, repeat: -1, repeatDelay: .35, ease: "sine.out" }));
      gsap.utils.toArray<HTMLElement>(".sticker").forEach((sticker, i) => gsap.to(sticker, { y: i % 2 ? -5 : 5, duration: 3.4 + i * .45, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .13 }));

      if (nav) { const compact = window.matchMedia("(max-width:640px)").matches ? 54 : 60; const expanded = window.matchMedia("(max-width:640px)").matches ? 61 : 70; ScrollTrigger.create({ trigger: document.body, start: "top -80", onEnter: () => { nav.classList.add("is-scrolled"); gsap.to(nav, { height: compact, duration: .25 }); }, onLeaveBack: () => { nav.classList.remove("is-scrolled"); gsap.to(nav, { height: expanded, duration: .25 }); } }); }
      const stage = scope.querySelector(".bowl-stage");
      if (stage) gsap.to(stage, { y: -25, scale: .96, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .8 } });
      const smoke = scope.querySelector(".hero-smoke");
      if (smoke) gsap.to(smoke, { y: 45, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } });
      fadeUp(gsap.utils.toArray(".brand-strip"), 32, .8);
      staggerReveal(gsap.utils.toArray(".ramen-card"), 70, .15);
      staggerReveal(gsap.utils.toArray(".why-row"), 26, .12);
      fadeUp(gsap.utils.toArray(".section-top,.menu-heading,.why-heading,.story-art,.story-copy,.final-inner"), 46, .95);

      const hero = scope.querySelector<HTMLElement>(".hero");
      const heroBowl = scope.querySelector<HTMLElement>(".hero-bowl");
      const stickers = gsap.utils.toArray<HTMLElement>(".sticker");
      if (window.matchMedia("(min-width:900px) and (pointer:fine)").matches && hero && heroBowl) {
        const bowlX = gsap.quickTo(heroBowl, "x", { duration: .8, ease: "power3.out" });
        const smokeLayer = scope.querySelector<HTMLElement>(".hero-smoke");
        const smokeX = smokeLayer ? gsap.quickTo(smokeLayer, "x", { duration: 1.2, ease: "power3.out" }) : () => {};
        const stickerX = stickers.map(el => gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }));
        const stickerTilt = stickers.map(el => gsap.quickTo(el, "rotation", { duration: 1, ease: "power3.out" }));
        const onMove = (event: MouseEvent) => { const box = hero.getBoundingClientRect(); const x = (event.clientX - box.left) / box.width - .5; const y = (event.clientY - box.top) / box.height - .5; bowlX(x * 8); smokeX(x * 4); stickers.forEach((_, i) => { stickerX[i](x * (i % 2 ? 15 : 9)); stickerTilt[i](y * (i % 2 ? 2.5 : 1.5)); }); };
        hero.addEventListener("mousemove", onMove);
        removeParallax = () => hero.removeEventListener("mousemove", onMove);
      }
    }, scope);
    return () => { removeParallax(); ctx.revert(); };
  }, []);
  return <div className="motion-root" ref={root}><div className="page-transition" aria-hidden="true" />{children}</div>;
}


