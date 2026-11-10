"use client";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, ArrowUpRight, Code2, Monitor, Workflow, TrendingUp, BriefcaseBusiness, Palette, Film, ShieldCheck } from "lucide-react";

const links = [
 {label:"Websites & Digital Systems",detail:"Websites, interfaces & applications",href:"/services/websites-digital-systems",icon:Code2},
 {label:"IT Support & Business Systems",detail:"Setup, troubleshooting & support",href:"/services/it-support",icon:Monitor},
 {label:"AI Automation",detail:"Connected tools & digital workflows",href:"/services/ai-automation",icon:Workflow},
 {label:"Sales, Marketing & Growth",detail:"SEO, content & business development",href:"/services/sales-marketing",icon:TrendingUp},
 {label:"Product & Operations",detail:"Product adoption & everyday delivery",href:"/services/product-operations",icon:BriefcaseBusiness},
 {label:"Graphic Design",detail:"Brand graphics & creative campaigns",href:"/graphic-design",icon:Palette},
 {label:"Motion & Video",detail:"Motion graphics & video production",href:"/graphic-design#motion",icon:Film},
 {label:"Cybersecurity",detail:"Security training & foundations",href:"/services/cybersecurity",icon:ShieldCheck},
];
export default function ServicesDropdown({mobile=false,overviewHref="/#expertise",onNavigate}:{mobile?:boolean;overviewHref?:string;onNavigate?:()=>void}) {
 const [open,setOpen]=useState(false);
 const root=useRef<HTMLDivElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const id=useId();
 useEffect(()=>{
  if(!open)return;
  function outside(event:PointerEvent){if(!root.current?.contains(event.target as Node))setOpen(false);}
  function escape(event:KeyboardEvent){if(event.key==="Escape"){setOpen(false);trigger.current?.focus();}}
  document.addEventListener("pointerdown",outside);document.addEventListener("keydown",escape);
  return()=>{document.removeEventListener("pointerdown",outside);document.removeEventListener("keydown",escape);};
 },[open]);
 function navigate(){setOpen(false);onNavigate?.();}
 return <div ref={root} className={"nav-services"+(mobile?" nav-services-mobile":"")} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setOpen(false);}}>
  <button ref={trigger} type="button" className="nav-services-trigger" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(value=>!value)}>What I Do <ChevronDown size={14} className={open?"is-open":""}/></button>
  <div id={id} className="nav-services-panel" hidden={!open}>
   <div className="nav-services-intro"><span>MY EXPERTISE</span><p>Different skills. One connected approach.</p></div>
   <div className="nav-services-grid">{links.map(({label,detail,href,icon:Icon})=><a className="nav-service-link" key={href} href={href} onClick={navigate}><span className="nav-service-icon"><Icon size={18}/></span><span><strong>{label}</strong><small>{detail}</small></span><ArrowUpRight size={13}/></a>)}</div>
   <a className="nav-services-overview" href={overviewHref} onClick={navigate}>Explore all expertise <ArrowUpRight size={15}/></a>
  </div>
 </div>;
}
