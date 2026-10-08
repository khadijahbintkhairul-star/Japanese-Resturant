import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function fadeUp(elements: Element[], y = 48, duration = 0.9) {
  elements.forEach((element) => gsap.fromTo(element, { autoAlpha: 0, y }, {
    autoAlpha: 1, y: 0, duration, ease: "power3.out",
    scrollTrigger: { trigger: element, start: "top 88%", once: true },
  }));
}

export function staggerReveal(elements: Element[], y = 64, stagger = 0.14) {
  if (!elements.length) return;
  gsap.fromTo(elements, { autoAlpha: 0, y }, {
    autoAlpha: 1, y: 0, duration: 0.95, stagger, ease: "power3.out",
    scrollTrigger: { trigger: elements[0], start: "top 86%", once: true },
  });
}

export function floatLoop(element: Element, distance = 8, duration = 4.5, delay = 0) {
  return gsap.to(element, { y: distance, duration, delay, ease: "sine.inOut", yoyo: true, repeat: -1 });
}
export { gsap, ScrollTrigger };

