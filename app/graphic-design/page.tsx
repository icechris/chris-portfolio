"use client";
import {useEffect,useRef,useState} from "react";
import type {CSSProperties,PointerEvent} from "react";
import {ArrowUp,X,ChevronLeft,ChevronRight,Palette,Play,FolderOpen,Images,Film,Plus} from "lucide-react";
import groups from "./designs.json";
import motion from "./motion.json";
type Design={src:string;title:string};
type Video={src:string;title:string;poster:string};
const all=groups.flatMap(g=>g.designs);
const accents=["#7fe9dc","#71b8ff","#a9c9ff","#f9b6d2","#8ccaff","#93e2ff","#f8d59d","#d6baff","#a7e3cc","#b5d1ff"];
function tilt(event:PointerEvent<HTMLButtonElement>){
 if(event.pointerType!=="mouse"||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 const rect=event.currentTarget.getBoundingClientRect();
 event.currentTarget.style.setProperty("--tilt-x",((event.clientY-rect.top)/rect.height* -8+4)+"deg");
 event.currentTarget.style.setProperty("--tilt-y",((event.clientX-rect.left)/rect.width*10-5)+"deg");
}
export default function GraphicDesign(){
 const [selected,setSelected]=useState<Design|null>(null);
 const [collection,setCollection]=useState<number|null>(null);
 const [video,setVideo]=useState<Video|null>(null);
 const [scrolled,setScrolled]=useState(false);
 const imageDialog=useRef<HTMLDialogElement>(null);
 const folderDialog=useRef<HTMLDialogElement>(null);
 const videoDialog=useRef<HTMLDialogElement>(null);
 const imageFocus=useRef<HTMLElement|null>(null);
 const folderFocus=useRef<HTMLElement|null>(null);
 const videoFocus=useRef<HTMLElement|null>(null);
 const imageOpen=selected!==null,folderOpen=collection!==null,videoOpen=video!==null;
 useEffect(()=>{const scroll=()=>setScrolled(window.scrollY>400);scroll();window.addEventListener("scroll",scroll,{passive:true});return()=>window.removeEventListener("scroll",scroll)},[]);
 useEffect(()=>{const target=folderDialog.current;if(!folderOpen||!target)return;folderFocus.current=document.activeElement as HTMLElement;target.showModal();return()=>{target.close();folderFocus.current?.focus()}},[folderOpen]);
 useEffect(()=>{const target=imageDialog.current;if(!imageOpen||!target)return;imageFocus.current=document.activeElement as HTMLElement;target.showModal();return()=>{target.close();imageFocus.current?.focus()}},[imageOpen]);
 useEffect(()=>{const target=videoDialog.current;if(!videoOpen||!target)return;videoFocus.current=document.activeElement as HTMLElement;target.showModal();return()=>{target.querySelector("video")?.pause();target.close();videoFocus.current?.focus()}},[videoOpen]);
 useEffect(()=>{if(!folderOpen&&!imageOpen&&!videoOpen)return;const old=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=old}},[folderOpen,imageOpen,videoOpen]);
 useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("arrived");observer.unobserve(entry.target)}}),{threshold:.1});document.querySelectorAll(".glass-reveal").forEach(el=>{el.classList.add("awaiting");observer.observe(el)});return()=>observer.disconnect()},[]);
 useEffect(()=>{if(window.location.hash==="#currently-offline"){const index=groups.findIndex(g=>g.name==="Currently Offline");if(index>=0)setCollection(index)}},[]);
 const navigateImage=(direction:number)=>{if(!selected)return;const items=collection===null?all:groups[collection].designs;const index=items.findIndex(d=>d.src===selected.src);setSelected(items[(index+direction+items.length)%items.length])};
 const navigateFolder=(direction:number)=>setCollection(current=>current===null?0:(current+direction+groups.length)%groups.length);
 const group=collection===null?null:groups[collection];
 return <div className="design-page">
 <header className="design-nav"><a className="design-logo" href="/">chris<span>✦</span></a><nav aria-label="Design navigation"><a href="/">Portfolio</a><a href="#gallery">Gallery</a><a href="#motion">Motion</a><a href="https://wa.me/233554453553">Contact me</a></nav></header>
 <main>
 <section className="design-hero"><div className="design-hero-copy"><p className="eyebrow">CHRISTIAN DUODU / GRAPHIC DESIGN</p><h1>Business<br/><span>Social Media.</span></h1><p>Campaigns, brand graphics and visual stories for the businesses I work with.</p><a className="design-cta" href="#gallery">Explore the gallery <Palette size={18}/></a></div><div className="design-portrait"><img src="/images/christian-suit.jpg" alt="Christian Duodu in a navy suit"/><span>IDEAS INTO<br/>IMAGES.</span></div><span className="design-script" aria-hidden="true">Christian</span></section>
 <section className="design-featured" aria-label="Featured business designs">{[21,20,19,7,0].map(i=>{const design=all.find(d=>d.src.endsWith(String(i).padStart(2,"0")+".webp"))!;return <button key={i} onClick={()=>setSelected(design)} aria-label={"View "+design.title}><img src={design.src} alt={design.title}/></button>})}</section>

 <section className="glass-library" id="gallery">
  <div className="glass-section-heading glass-reveal"><div><p className="eyebrow">THE CREATIVE ARCHIVE</p><h2>A little curiosity.<br/><em>A whole lot of work.</em></h2></div><div className="archive-summary"><span><Images size={16}/>{all.length} designs</span><span>{groups.length} collections</span><p>Open a folder. Explore the story.</p></div></div>
  <div className="glass-folders">{groups.map((item,index)=><button id={item.name==="Currently Offline"?"currently-offline":undefined} key={item.name} className="glass-folder-card glass-reveal" style={{"--folder-accent":accents[index%accents.length],"--delay":(index%3)*75+"ms"} as CSSProperties} onPointerMove={tilt} onPointerLeave={e=>{e.currentTarget.style.setProperty("--tilt-x","0deg");e.currentTarget.style.setProperty("--tilt-y","0deg")}} onClick={()=>setCollection(index)} aria-label={"Open "+item.name+" collection, "+item.designs.length+" designs"}>
   <span className="folder-topline"><span>{String(index+1).padStart(2,"0")}</span><span>{String(item.designs.length).padStart(2,"0")} DESIGNS</span></span>
   <span className="folder-stage" aria-hidden="true"><span className="folder-halo"/><span className="folder-back"/><span className="folder-tab"/>{item.designs.slice(0,3).map((design,i)=><span className={"folder-art folder-art-"+i} key={design.src}><img src={design.src} alt="" loading="lazy"/></span>)}<span className="folder-glass"><span className="folder-shine"/><FolderOpen size={25} strokeWidth={1.3}/><span>CHRIS / CREATIVE WORK</span><span className="folder-open-symbol"><Plus size={18}/></span></span></span>
   <span className="folder-caption"><strong>{item.name}</strong><span>Explore collection <FolderOpen size={16}/></span></span>
  </button>)}</div>
 </section>
 <section id="motion" className="glass-cinema">
  <div className="cinema-ambient" aria-hidden="true"/><div className="glass-section-heading glass-reveal"><div><p className="eyebrow"><Film size={14}/> THE MOTION ROOM</p><h2>Stories that<br/><em>move you.</em></h2></div><p className="cinema-note">Motion, rhythm, and the details<br/>that bring a brand to life.</p></div>
  <div className="cinema-grid">{motion.map((item,index)=><button className={"cinema-card glass-reveal"+(index===0?" cinema-lead":"")} key={item.src} onClick={()=>setVideo(item)} aria-label={"Play "+item.title}><span className="cinema-poster"><img src={item.poster} alt="" loading="lazy"/><span className="cinema-vignette"/><span className="cinema-play"><Play size={24} fill="currentColor"/></span><span className="cinema-film-label">FILM {String(index+1).padStart(2,"0")}</span><span className="cinema-duration-label">PRESS PLAY</span></span><span className="cinema-caption"><strong>{item.title}</strong><span>Motion & video <Play size={13}/></span></span></button>)}</div>
 </section>
 <section className="glass-finale glass-reveal"><span className="finale-orbit" aria-hidden="true"/><p className="eyebrow">LET’S MAKE SOMETHING GOOD</p><h2>Your next idea.<br/><em>My next obsession.</em></h2><a href="https://wa.me/233554453553" className="glass-contact-button">Start a conversation <Plus size={18}/></a><a className="glass-back" href="/">Back to my portfolio</a></section>
 </main><footer className="design-footer"><span>© {new Date().getFullYear()} Christian Kwame Duodu</span><span>GRAPHIC DESIGN & BRAND CONTENT</span></footer>
 {scrolled&&<button className="design-top" aria-label="Scroll to top" onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}><ArrowUp size={20}/></button>}
 <dialog ref={folderDialog} className="folder-dialog" aria-labelledby="folder-dialog-title" onCancel={()=>setCollection(null)} onClick={e=>{if(e.target===e.currentTarget)setCollection(null)}}><div className="folder-dialog-bar"><span><FolderOpen size={18}/> COLLECTION {collection===null?"":String(collection+1).padStart(2,"0")}</span><div><button onClick={()=>navigateFolder(-1)} aria-label="Previous collection"><ChevronLeft size={20}/></button><button onClick={()=>navigateFolder(1)} aria-label="Next collection"><ChevronRight size={20}/></button><button onClick={()=>setCollection(null)} aria-label="Close collection"><X size={22}/></button></div></div>{group&&<div className="folder-dialog-content" key={group.name}><div className="folder-dialog-heading"><p className="eyebrow">{group.designs.length} CAMPAIGN DESIGNS</p><h2 id="folder-dialog-title">{group.name}</h2><p>{group.description}</p></div><div className="folder-artwork-grid">{group.designs.map((item,index)=><button key={item.src} style={{"--art-delay":Math.min(index,5)*50+"ms"} as CSSProperties} onClick={()=>setSelected(item)} aria-label={"Enlarge "+item.title}><span><img src={item.src} alt={item.title} loading="lazy"/><span className="art-enlarge"><Plus size={23}/></span></span><strong>{item.title}</strong></button>)}</div></div>}</dialog>
 <dialog ref={imageDialog} className="glass-image-dialog" aria-label={selected?.title??"Design preview"} onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null)}} onKeyDown={e=>{if(e.key==="ArrowRight")navigateImage(1);if(e.key==="ArrowLeft")navigateImage(-1)}}><button className="glass-modal-close" aria-label="Close design" onClick={()=>setSelected(null)}><X/></button>{selected&&<><img src={selected.src} alt={selected.title}/><div className="glass-image-toolbar"><button onClick={()=>navigateImage(-1)} aria-label="Previous design"><ChevronLeft/></button><p>{selected.title}</p><button onClick={()=>navigateImage(1)} aria-label="Next design"><ChevronRight/></button></div></>}</dialog>
 <dialog ref={videoDialog} className="cinema-dialog" aria-label={video?.title??"Video player"} onCancel={()=>setVideo(null)} onClick={e=>{if(e.target===e.currentTarget)setVideo(null)}}><button className="glass-modal-close" aria-label="Close video" onClick={()=>setVideo(null)}><X/></button>{video&&<><video key={video.src} controls playsInline autoPlay preload="metadata" poster={video.poster}><source src={video.src} type="video/mp4"/>Your browser does not support video playback.</video><div className="cinema-now-playing"><span>NOW PLAYING</span><h2>{video.title}</h2></div></>}</dialog>
 </div>
}
