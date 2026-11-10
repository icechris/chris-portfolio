"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Sparkles } from "lucide-react";

function setupLivingPortrait(canvas: HTMLCanvasElement, original: HTMLImageElement, closed: HTMLImageElement) {
  const W = 925, H = 1280;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  function patch(sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) {
    const p = document.createElement("canvas"); p.width=dw; p.height=dh;
    const c=p.getContext("2d")!; c.drawImage(closed,sx,sy,sw,sh,0,0,dw,dh);
    c.globalCompositeOperation="destination-in"; c.save(); c.scale(dw,dh);
    const g=c.createRadialGradient(.5,.5,.21,.5,.5,.5);
    g.addColorStop(0,"#000"); g.addColorStop(1,"transparent");
    c.fillStyle=g; c.fillRect(0,0,1,1); c.restore();
    return {p,dx,dy};
  }
  const eyes=[patch(350,512,147,78,310,438,123,65),patch(558,510,155,78,493,436,130,65)];
  const head=document.createElement("canvas");head.width=W;head.height=H;
  const hc=head.getContext("2d")!;
  return (time: number, still=false, forceBlink=false) => {
    const t=time%7.6;
    function blink(at: number) { const v=t-at; if(v<0||v>.27)return 0; if(v<.085)return Math.sin(v/.085*Math.PI/2);if(v<.135)return 1;return Math.cos((v-.135)/.135*Math.PI/2); }
    const amount=forceBlink?1:still?0:Math.max(blink(2.4),blink(6.2));
    hc.clearRect(0,0,W,H);hc.globalCompositeOperation="source-over";hc.globalAlpha=1;hc.drawImage(original,0,0,W,H);
    hc.globalAlpha=amount;for(const {p,dx,dy} of eyes)hc.drawImage(p,dx,dy);hc.globalAlpha=1;
    hc.globalCompositeOperation="destination-in";hc.save();hc.translate(480,510);hc.scale(295,410);
    const mask=hc.createRadialGradient(0,0,.74,0,0,1);mask.addColorStop(0,"#000");mask.addColorStop(1,"transparent");hc.fillStyle=mask;hc.fillRect(-1,-1,2,2);hc.restore();hc.globalCompositeOperation="source-over";
    ctx.clearRect(0,0,W,H);ctx.drawImage(original,0,0,W,H);
    ctx.save();ctx.translate(480,820);
    if(!still) {ctx.translate(Math.sin(time*.65)*1.2,Math.sin(time*.85)*.8);ctx.rotate(Math.sin(time*.55)*.0023);}
    ctx.translate(-480,-820);ctx.drawImage(head,0,0);ctx.restore();
  };
}

export default function LivingPortrait() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [paused,setPaused]=useState(false);
  useEffect(()=>{
    const surface=canvas.current; if(!surface)return;
    const original=new Image(),closed=new Image();
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame=0,cancelled=false,visible=true,loaded=0,draw:ReturnType<typeof setupLivingPortrait>|undefined;
    let last=0,elapsed=0;
    function tick(now:number) {
      if(cancelled)return;
      if(last&&visible&&!document.hidden&&!paused&&!media.matches)elapsed+=Math.min((now-last)/1000,.05);
      last=now;
      if(visible&&!document.hidden)draw?.(elapsed,paused||media.matches);
      frame=requestAnimationFrame(tick);
    }
    function ready() { if(++loaded!==2||cancelled)return; draw=setupLivingPortrait(surface!,original,closed);draw(0,true);frame=requestAnimationFrame(tick); }
    original.onload=ready;closed.onload=ready;
    original.src="/images/christian-suit.jpg";closed.src="/images/christian-blink-frame.webp";
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;last=0;});
    observer.observe(surface);
    return()=>{cancelled=true;cancelAnimationFrame(frame);observer.disconnect();original.onload=null;closed.onload=null;};
  },[paused]);
  return <div className="portrait-wrap living-portrait"><div className="portrait">
    <img src="/images/christian-suit.jpg" alt="Christian Kwame Duodu in a navy suit, white shirt and tie" width={925} height={1280} fetchPriority="high"/>
    <canvas ref={canvas} className="living-portrait-canvas" aria-hidden="true"/>
    <span className="portrait-label">CHRISTIAN<br/>KWAME DUODU</span><span className="portrait-monogram">CD.</span>
    <button className="living-portrait-control" type="button" aria-label={paused?"Play portrait animation":"Pause portrait animation"} aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>{paused?<Play size={13}/>:<Pause size={13}/>}</button>
  </div><div className="portrait-caption"><span>Technology. Marketing. Operations.</span><Sparkles size={20}/></div></div>;
}
