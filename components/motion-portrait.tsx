"use client";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Pause, Play, Sparkles } from "lucide-react";

export default function MotionPortrait() {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (root.current) observer.observe(root.current);
    return () => { media.removeEventListener("change", update); observer.disconnect(); };
  }, []);
  function reset() {
    root.current?.style.setProperty("--portrait-rx", "0deg");
    root.current?.style.setProperty("--portrait-ry", "0deg");
  }
  function follow(event: PointerEvent<HTMLDivElement>) {
    if (paused || reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    root.current?.style.setProperty("--portrait-rx", ((.5 - (event.clientY - bounds.top) / bounds.height) * 5).toFixed(2) + "deg");
    root.current?.style.setProperty("--portrait-ry", (((event.clientX - bounds.left) / bounds.width - .5) * 6).toFixed(2) + "deg");
  }
  const stopped = paused || reduced || !visible;
  return <div ref={root} className="portrait-wrap motion-portrait" data-still={stopped} onPointerMove={follow} onPointerLeave={reset}>
    <div className="motion-portrait-float">
      <div className="motion-portrait-card">
        <div className="motion-portrait-photo">
          <img src="/images/christian-white-shirt.webp" alt="Christian Kwame Duodu wearing a white shirt and glasses" width={1000} height={1500} fetchPriority="high" decoding="async"/>
        </div>
        <div className="motion-portrait-shade" aria-hidden="true"/>
        <span className="motion-portrait-kicker">A LITTLE MORE HUMAN.</span>
        <div className="motion-portrait-signature"><span>Hi, I’m</span><strong>Christian<span>✦</span></strong></div>
        <button type="button" className="motion-portrait-toggle" aria-label={paused ? "Play portrait animation" : "Pause portrait animation"} aria-pressed={paused} onClick={() => { reset(); setPaused(value => !value); }}>
          {paused ? <Play size={14}/> : <Pause size={14}/>}
        </button>
      </div>
    </div>
    <div className="motion-portrait-caption"><span>Technology. Marketing. Operations.</span><Sparkles size={17}/></div>
  </div>;
}
