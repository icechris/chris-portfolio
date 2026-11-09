"use client";
import { useEffect } from "react";
export default function ServiceMotion() {
 useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver(entries => { for (const e of entries) if (e.isIntersecting) { e.target.classList.add("service-visible"); observer.unobserve(e.target); } }, { threshold: .07 });
  const elements = document.querySelectorAll(".service-enter");
  elements.forEach(el => { el.classList.add("service-awaiting"); observer.observe(el); });
  return () => { observer.disconnect(); elements.forEach(el=>el.classList.remove("service-awaiting")); };
 }, []);
 return null;
}
