"use client";
import { useState, type CSSProperties } from "react";
import { ArrowUpRight, ArrowDown, Search, Layers, X, Palette } from "lucide-react";
import { projects, type Project } from "@/app/services/data";
const categories=["All work","Client websites","Web applications","Creative campaigns","Technical support","Research"];
const featuredNames=["Junk Titanic","Silicon Hotel & Conference Centre","Dansoaa","Currently Offline","BodyPride MedSpa","Lynxx Kloset","PSuite Procurement"];
function WorkCover({project,compact=false}:{project:Project;compact?:boolean}){
 const image=project.image||(project.name==="Currently Offline"?"/images/designs/mocktail-mixoff-final.webp":undefined);
 return <div className={"folio-cover"+(image?" folio-image":" folio-type")+(compact?" folio-cover-compact":"")} style={{"--project-color":project.color} as CSSProperties}>
 {image?<><div className="folio-preview-chrome"><span/><span/><span/><small>{project.name}</small></div><img src={image} alt={project.name+" project preview"} loading="lazy" width="1340" height="620"/></>:<><span className="folio-cover-kicker">{project.sector}</span><strong>{project.name==="PSuite Procurement"?"PSuite":project.name}</strong><span className="folio-cover-tagline">{project.short||"Technology, thoughtfully applied."}</span><Layers className="folio-cover-mark" size={90} strokeWidth={.7}/></>}
 <span className="folio-cover-open"><ArrowUpRight size={20}/></span></div>;
}
export default function ProjectShowcase({onSelect}:{onSelect:(project:Project)=>void}){
 const [filter,setFilter]=useState("All work"),[query,setQuery]=useState("");
 const term=query.trim().toLowerCase();
 const visible=projects.filter(p=>(filter==="All work"||p.category===filter)&&(!term||[p.name,p.category,p.sector,p.summary].join(" ").toLowerCase().includes(term)));
 const browsing=filter==="All work"&&!term;
 const featured=browsing?featuredNames.map(name=>projects.find(p=>p.name===name)!).filter(Boolean):visible;
 const rest=browsing?projects.filter(p=>!featuredNames.includes(p.name)):[];
 return <section id="work" className="folio-section section-anchor">
  <div className="folio-heading"><div><p className="eyebrow">01 / THE PORTFOLIO</p><h2>Work, in the<br/><em>real world.</em></h2></div><div className="folio-heading-aside"><span className="folio-count">{projects.length}<i>PROJECTS & COLLABORATIONS</i></span><p>Different businesses. Different challenges.<br/>Explore the work and the contribution behind it.</p></div></div>
  <div className="folio-tools"><div className="folio-filters" aria-label="Filter projects">{categories.map(c=><button type="button" key={c} aria-pressed={filter===c} onClick={()=>setFilter(c)} className={filter===c?"selected":""}>{c}</button>)}</div><label className="folio-search"><Search size={16}/><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a project" aria-label="Search portfolio projects"/>{query&&<button type="button" aria-label="Clear project search" onClick={()=>setQuery("")}><X size={14}/></button>}</label></div>
  <div className="folio-results"><span aria-live="polite">{visible.length} {visible.length===1?"project":"projects"}{browsing?" · Selected stories below":""}</span><a href="/graphic-design"><Palette size={15}/> Creative archive <ArrowUpRight size={14}/></a></div>
  {!featured.length&&<div className="folio-empty"><Search size={27}/><h3>No matching projects yet.</h3><p>Try another search or explore all the work.</p><button type="button" onClick={()=>{setFilter("All work");setQuery("");}}>Show all projects</button></div>}
  <div className="folio-grid">{featured.map((p,i)=><button type="button" className={"folio-project"+(browsing&&i===0?" folio-project-lead":"")} key={p.name} onClick={()=>onSelect(p)} aria-label={"View "+p.name+" project details"}><WorkCover project={p}/><div className="folio-project-copy"><div><span>{p.category}</span><span>{String(i+1).padStart(2,"0")}</span></div><h3>{p.name}</h3><p>{p.summary}</p><span className="folio-project-sector">{p.sector}</span><span className="folio-project-cta">Explore the contribution <ArrowUpRight size={17}/></span></div></button>)}</div>
  {rest.length>0&&<div className="folio-archive"><div className="folio-archive-heading"><div><p className="eyebrow">THE WIDER COLLECTION</p><h3>More of<br/><em>the work.</em></h3></div><p>Platforms, business systems and hands-on support.<br/>There’s more to the story.</p><span>{String(rest.length).padStart(2,"0")} <ArrowDown size={19}/></span></div><div className="folio-archive-grid">{rest.map((p,i)=><button type="button" className="folio-archive-item" key={p.name} onClick={()=>onSelect(p)} aria-label={"View "+p.name+" project details"}><span className="folio-archive-symbol" style={{background:p.color}}>{p.name.split(" ").slice(0,2).map(w=>w[0]).join("")}</span><span className="folio-archive-text"><small>{p.category}</small><strong>{p.name}</strong><span>{p.sector}</span></span><ArrowUpRight size={19}/></button>)}</div></div>}
 </section>;
}
