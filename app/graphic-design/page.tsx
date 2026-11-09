"use client";
import {useEffect,useRef,useState} from "react";
import {ArrowUp, X, ChevronLeft, ChevronRight, Palette} from "lucide-react";
import groups from "./designs.json";
import motion from "./motion.json";
type Design={src:string;title:string};
export default function GraphicDesign(){
 const [selected,setSelected]=useState<Design|null>(null);
 const [scrolled,setScrolled]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null);
 const previousFocus=useRef<HTMLElement|null>(null);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>400);window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[]);
 useEffect(()=>{if(selected){previousFocus.current=document.activeElement as HTMLElement;dialog.current?.showModal();const old=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=old;dialog.current?.close();previousFocus.current?.focus()}}},[selected]);
 const all=groups.flatMap(g=>g.designs);
 const move=(direction:number)=>{if(!selected)return;const index=all.findIndex(d=>d.src===selected.src);setSelected(all[(index+direction+all.length)%all.length])};
 return <div className="design-page">
 <header className="design-nav"><a className="design-logo" href="/">chris<span>✦</span></a><nav aria-label="Design navigation"><a href="/">Portfolio</a><a href="#gallery">Gallery</a><a href="#motion">Motion</a><a href="https://wa.me/233554453553">Contact me</a></nav></header>
 <main>
 <section className="design-hero"><div className="design-hero-copy"><p className="eyebrow">CHRISTIAN DUODU / GRAPHIC DESIGN</p><h1>Business<br/><span>Social Media.</span></h1><p>Campaigns, brand graphics and visual stories for the businesses I work with.</p><a className="design-cta" href="#gallery">Explore the gallery <Palette size={18}/></a></div><div className="design-portrait"><img src="/images/christian-suit.jpg" alt="Christian Duodu in a navy suit"/><span>IDEAS INTO<br/>IMAGES.</span></div><span className="design-script" aria-hidden="true">Christian</span></section>
 <section className="design-featured" aria-label="Featured business designs">{[21,20,19,7,0].map(i=>{const design=all.find(d=>d.src.endsWith(String(i).padStart(2,"0")+".webp"))!;return <button key={i} onClick={()=>setSelected(design)} aria-label={"View "+design.title}><img src={design.src} alt={design.title}/></button>})}</section>
 <div className="design-gallery" id="gallery"><div className="design-gallery-intro"><p className="eyebrow">THE DESIGN COLLECTION</p><h2>Made for<br/><em>real businesses.</em></h2><p>{all.length} campaign designs · Recent work</p></div>
 {groups.map((group,index)=><section className="design-business" id={group.name==="Currently Offline"?"currently-offline":undefined} key={group.name}><div className="design-business-copy"><span className="design-index">{String(index+1).padStart(2,"0")} / {String(group.designs.length).padStart(2,"0")} DESIGNS</span><h2>{group.name}</h2><p>{group.description}</p></div><div className="design-business-grid">{group.designs.map(design=><button key={design.src} onClick={()=>setSelected(design)} aria-label={"View "+design.title}><img src={design.src} alt={design.title} loading="lazy"/><span>{design.title}</span></button>)}</div></section>)}</div>
 <section id="motion" className="design-motion"><p className="eyebrow">MOTION & VIDEO</p><h2>Ideas in <em>motion.</em></h2><div className="motion-grid">{motion.map(video=><article key={video.src}><video controls playsInline preload="none" poster={video.poster} aria-label={video.title}><source src={video.src} type="video/mp4"/>Your browser does not support video playback.</video><h3>{video.title}</h3></article>)}</div></section>
 <section className="design-contact"><p className="eyebrow">YOUR NEXT CAMPAIGN</p><h2>Let’s make it<br/><em>worth looking at.</em></h2><a className="design-cta" href="https://wa.me/233554453553">Discuss a design project</a><a href="/">Back to my portfolio</a></section>
 </main><footer className="design-footer"><span>© {new Date().getFullYear()} Christian Kwame Duodu</span><span>GRAPHIC DESIGN & BRAND CONTENT</span></footer>
 {scrolled&&<button className="design-top" aria-label="Scroll to top" onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}><ArrowUp size={20}/></button>}
 <dialog ref={dialog} className="design-lightbox" onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null)}} onKeyDown={e=>{if(e.key==="ArrowRight")move(1);if(e.key==="ArrowLeft")move(-1)}}><button className="design-close" aria-label="Close design" onClick={()=>setSelected(null)}><X/></button>{selected&&<><img src={selected.src} alt={selected.title}/><p>{selected.title}</p><div className="design-lightbox-controls"><button onClick={()=>move(-1)} aria-label="Previous design"><ChevronLeft/></button><button onClick={()=>move(1)} aria-label="Next design"><ChevronRight/></button></div></>}</dialog>
 </div>
}
