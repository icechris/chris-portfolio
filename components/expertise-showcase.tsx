"use client";
import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, ArrowDown, Code2, TrendingUp, BriefcaseBusiness, Palette, ShieldCheck, Check, Layers, Play, Pause } from "lucide-react";

const areas = [
 { id:"technology",label:"Technology & Digital Systems",word:"Build.",intro:"Useful websites. Connected systems. Technology that works for the people using it.",skills:["Web development","IT support","Business software & systems","AI automation"],links:[["Websites & Digital Systems","/services/websites-digital-systems"],["IT & Business Systems","/services/it-support"],["AI Automation","/services/ai-automation"]],icon:Code2 },
 { id:"growth",label:"Sales, Marketing & Growth",word:"Grow.",intro:"Connect the right message to the right people, then support the relationship beyond the first sale.",skills:["B2B sales","SEO & digital marketing","Business development","Customer success"],links:[["Sales, Marketing & Growth","/services/sales-marketing"]],icon:TrendingUp },
 { id:"operations",label:"Product & Operations",word:"Connect.",intro:"Help customers adopt products, turn feedback into useful insight and keep everyday operations moving.",skills:["Product onboarding & adoption","Customer feedback","Product support","Business operations"],links:[["Product & Operations","/services/product-operations"]],icon:BriefcaseBusiness },
 { id:"creative",label:"Creative Production",word:"Create.",intro:"Give a business something people can see, feel and remember—from a single graphic to a moving story.",skills:["Graphic design","Brand content","Motion graphics","Video editing"],links:[["Graphic Design","/graphic-design"],["Motion Room","/graphic-design#motion"]],icon:Palette },
 { id:"security",label:"Cybersecurity",word:"Protect.",intro:"A growing foundation in security awareness, supported by training and continued learning.",skills:["Security awareness","Cybersecurity training","Systems fundamentals","Continued learning"],links:[["Security Training & Foundations","/services/cybersecurity"]],icon:ShieldCheck },
];
export function ExpertiseShowcase() {
 const [active,setActive]=useState(0);
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{
  let frame=0;
  const update=()=>{frame=0;const panels=root.current?.querySelectorAll<HTMLElement>(".expertise-panel");if(!panels)return;let next=0;panels.forEach((panel,i)=>{if(panel.getBoundingClientRect().top<window.innerHeight*.55)next=i;});setActive(current=>current===next?current:next);};
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  window.addEventListener("scroll",scroll,{passive:true});update();
  return()=>{window.removeEventListener("scroll",scroll);cancelAnimationFrame(frame);};
 },[]);
 return <section id="expertise" className="expertise-studio section-anchor" ref={root}>
  <div className="expertise-studio-layout">
   <div className="expertise-studio-aside"><p className="eyebrow"><span/> MY EXPERTISE</p><h2>what<br/><em>I do.</em></h2><p className="expertise-aside-copy">Different skills.<br/>One connected approach.</p>
    <nav aria-label="Expertise areas" className="expertise-index">{areas.map((area,i)=><a key={area.id} href={"#expertise-"+area.id} aria-current={active===i?"location":undefined} className={active===i?"selected":""}><span>0{i+1}</span>{area.label}<ArrowUpRight size={14}/></a>)}</nav>
    <span className="expertise-scroll-hint"><ArrowDown size={15}/> SCROLL TO EXPLORE</span>
   </div>
   <div className="expertise-panels">{areas.map((area,i)=><Fragment key={area.id}><span id={"expertise-"+area.id} className="expertise-panel-anchor" aria-hidden="true"/><article className={"expertise-panel expertise-panel-"+area.id} style={{"--panel-index":i} as CSSProperties} key={area.id}>
     <div className="expertise-panel-top"><span><area.icon size={17}/>{area.label}</span><span>(0{i+1})</span></div>
     <div className="expertise-panel-body"><div className="expertise-panel-copy"><h3>{area.word}</h3><p>{area.intro}</p><ul>{area.skills.map(skill=><li key={skill}><Check size={13}/>{skill}</li>)}</ul></div>
      <div className={"expertise-art expertise-art-"+area.id} aria-hidden="true">
       {area.id==="technology"?<><div className="expertise-browser-mini"><div><i/><i/><i/><span>Designed for real life</span></div><img src="/images/dansoaa.jpg" alt="" width="1340" height="620" loading="lazy"/></div><div className="expertise-code-chip"><Code2 size={18}/><span>Idea → Interface → Experience</span></div></>:
        area.id==="growth"?<><div className="expertise-growth-orbit"/><div className="expertise-growth-type">REACH.<br/>CONNECT.<br/><em>GROW.</em></div><span className="expertise-growth-chip">SEARCH · CONTENT · CONVERSATION</span><TrendingUp className="expertise-growth-arrow" size={65}/></>:
        area.id==="operations"?<><div className="expertise-operation-hub"><Layers size={34}/></div><div className="expertise-operation-node node-a"><span>01</span>Onboard</div><div className="expertise-operation-node node-b"><span>02</span>Support</div><div className="expertise-operation-node node-c"><span>03</span>Improve</div><span className="expertise-operation-line line-a"/><span className="expertise-operation-line line-b"/><span className="expertise-operation-line line-c"/></>:
        area.id==="creative"?<><img className="expertise-art-poster poster-one" src="/images/designs/mocktail-mixoff-final.webp" alt="" width="640" height="800" loading="lazy"/><img className="expertise-art-poster poster-two" src="/images/designs/no-plus-one-final.webp" alt="" width="640" height="800" loading="lazy"/><span className="expertise-play"><Play size={22} fill="currentColor"/></span></>:
        <><div className="expertise-security-grid"/><div className="expertise-shield"><ShieldCheck size={88} strokeWidth={1}/></div><span className="expertise-security-label">AWARENESS → UNDERSTANDING</span></>}
      </div>
     </div>
     <div className="expertise-panel-links">{area.links.map(([label,url])=><a key={url} href={url}>{label}<ArrowUpRight size={16}/></a>)}</div>
   </article></Fragment>)}</div>
  </div>
  <a href="#work" className="expertise-all-work">Explore the project portfolio <ArrowDown size={17}/></a>
 </section>;
}

const brandRows = [
 [["Currently Offline","CO","/graphic-design#currently-offline"],["Junk Titanic","JT","https://www.junktitanic.co.uk/"],["Versified","V","/#about"],["Shai Cars","SC","https://www.shaicars.com"],["Dansoaa","D","https://dansoaa.com"],["3AN Company","3A","https://threeancompany.com"],["Lynxx Kloset","LK","https://lynxxkloset.vercel.app/"],["BodyPride","BP","https://www.bodypridemedspagh.com"],["Chrisango Africa","CA","https://chrisangoafrica.com/"],["MatchGigs","MG","https://matchgigs.co"],["CourseRep","CR","https://courserep.academy"]],
 [["Pretty Iris","PI","/#work"],["Accurate Edu","AE","https://accurate-edu.vercel.app"],["Solvia","S","https://solviaglobal.vercel.app"],["Staphmust","SE","https://staphmustengltd.com/"],["CareGh","CG","https://care-gh.vercel.app/"],["Akoma Learning","AK","https://hybrid-ai-roan.vercel.app/"],["Monic Essentials","ME","/#work"]]
];
export function ClientRibbon(){
 const [paused,setPaused]=useState(false);
 return <div className={"client-ribbon"+(paused?" ribbon-paused":"")}>
  <div className="client-ribbon-heading"><p><span/> BUSINESSES & PROJECTS I’VE WORKED WITH</p><button type="button" onClick={()=>setPaused(p=>!p)} aria-label={paused?"Play company carousel":"Pause company carousel"} aria-pressed={paused}>{paused?<Play size={14}/>:<Pause size={14}/>}</button></div>
  <div className="client-ribbon-mask">{brandRows.map((row,r)=><div className={"client-ribbon-track"+(r?" ribbon-reverse":"")} key={r}>{[0,1].map(copy=><div className="client-ribbon-group" key={copy} aria-hidden={copy===1?true:undefined}>{row.map(([name,initials,url],i)=><a className={"client-ribbon-brand brand-type-"+i%3} href={url} key={name} tabIndex={copy===1?-1:undefined} target={url.startsWith("http")?"_blank":undefined} rel={url.startsWith("http")?"noreferrer":undefined}><span className="client-brand-symbol">{initials}</span><span>{name}</span><ArrowUpRight size={12}/></a>)}</div>)}</div>)}</div>
  <p className="client-ribbon-footnote">Across technology, business and creative work.</p>
 </div>;
}
