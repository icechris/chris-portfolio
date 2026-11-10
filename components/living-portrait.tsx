"use client";
import { useEffect, useId, useState } from "react";
import { Pause, Play, Sparkles } from "lucide-react";

export default function LivingPortrait() {
  const id=useId().replaceAll(":","");
  const [paused,setPaused]=useState(false);
  const [reduced,setReduced]=useState(false);
  const [enabled,setEnabled]=useState(false);
  const [restart,setRestart]=useState(0);
  useEffect(()=>{
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    const update=()=>setReduced(media.matches);
    update();media.addEventListener("change",update);
    return()=>media.removeEventListener("change",update);
  },[]);
  const stopped=paused||(reduced&&!enabled);
  function toggle(){if(stopped){setEnabled(true);setPaused(false);setRestart(value=>value+1);}else setPaused(true);}
  return <div className="portrait-wrap living-portrait" data-paused={stopped} data-motion-enabled={enabled}>
    <div className="portrait">
      <img src="/images/christian-suit.jpg" alt="Christian Kwame Duodu in a navy suit, white shirt and tie" width={925} height={1280} fetchPriority="high"/>
      <svg key={restart} className="living-photo-animation" viewBox="0 0 925 1280" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        <defs>
          <radialGradient id={id+"-feather"}><stop offset="65%" stopColor="white"/><stop offset="100%" stopColor="white" stopOpacity="0"/></radialGradient>
          <mask id={id+"-head"} maskUnits="userSpaceOnUse" x="0" y="0" width="925" height="1280"><ellipse cx="480" cy="510" rx="295" ry="410" fill={"url(#"+id+"-feather)"}/></mask>
          <mask id={id+"-left"} maskUnits="userSpaceOnUse" x="300" y="430" width="145" height="85"><ellipse cx="371.5" cy="470.5" rx="61.5" ry="32.5" fill={"url(#"+id+"-feather)"}/></mask>
          <mask id={id+"-right"} maskUnits="userSpaceOnUse" x="485" y="425" width="145" height="85"><ellipse cx="558" cy="468.5" rx="65" ry="32.5" fill={"url(#"+id+"-feather)"}/></mask>
        </defs>
        <g mask={"url(#"+id+"-head)"}>
          <g className="living-photo-head">
            <image href="/images/christian-suit.jpg" width="925" height="1280"/>
            <g className="living-photo-eyelids">
              <image href="/images/christian-blink-frame.webp" x="17.14" y="11.33" width="891.96" height="1229.17" preserveAspectRatio="none" mask={"url(#"+id+"-left)"}/>
              <image href="/images/christian-blink-frame.webp" x="25" y="11" width="894.06" height="1229.17" preserveAspectRatio="none" mask={"url(#"+id+"-right)"}/>
            </g>
          </g>
        </g>
      </svg>
      <span className="portrait-label">CHRISTIAN<br/>KWAME DUODU</span><span className="portrait-monogram">CD.</span>
      <button className="living-portrait-control" type="button" aria-label={stopped?"Play portrait animation":"Pause portrait animation"} aria-pressed={!stopped} onClick={toggle}>{stopped?<Play size={13}/>:<Pause size={13}/>}</button>
    </div><div className="portrait-caption"><span>Technology. Marketing. Operations.</span><Sparkles size={20}/></div>
  </div>;
}
