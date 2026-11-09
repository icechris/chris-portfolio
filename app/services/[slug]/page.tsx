import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, ArrowDown, Check, Code2, Monitor, Workflow, TrendingUp, MessageCircle, ExternalLink, Palette, Film, BriefcaseBusiness, ShieldCheck } from "lucide-react";
import { projects, services } from "../data";
import ServiceMotion from "../service-motion";
import ServiceEvidence, { contributionByService, SupportHero } from "../service-evidence";

export function generateStaticParams() { return services.map(s => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  return { title: service ? service.label + " — Christian Duodu" : "Service not found", description: service?.intro };
}
const icons = { web: Code2, support: Monitor, automation: Workflow, growth: TrendingUp, product: BriefcaseBusiness, security: ShieldCheck };
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) notFound();
  const Icon = icons[service.visual as keyof typeof icons];
  const work = service.projectNames.map(name => projects.find(p => p.name === name)).filter((p): p is NonNullable<typeof p> => !!p);
  const enquiry = "https://wa.me/233554453553?text=" + encodeURIComponent("Hi Christian, I would like to discuss " + service.label.toLowerCase() + ".");
  return <div className={"service-page service-" + service.visual}>
    <ServiceMotion />
    <a href="#service-main" className="skip-link">Skip to content</a>
    <header className="service-header">
      <a href="/" className="wordmark" aria-label="Christian Duodu home">chris<span>✦</span><i /></a>
      <a href="/#expertise" className="service-back"><ArrowLeft size={16} /> All expertise</a>
      <a href={enquiry} target="_blank" rel="noreferrer" className="service-header-cta">Let’s talk <ArrowUpRight size={17} /></a>
    </header>
    <main id="service-main">
      <section className="service-hero">
        <div className="service-breadcrumb"><a href="/">HOME</a><span>/</span><a href="/#expertise">WHAT I DO</a><span>/</span><span>{service.short.toUpperCase()}</span></div>
        <div className="service-hero-grid">
          <div className="service-hero-copy"><p className="eyebrow">{service.kicker}</p><h1>{service.headline}<br /><em>{service.emphasis}</em></h1><p className="service-lead">{service.intro}</p><div className="service-actions"><a href={enquiry} target="_blank" rel="noreferrer" className="service-primary">{service.visual==="security"?"Discuss an opportunity":["support","product"].includes(service.visual)?"Discuss a role or project":"Discuss a project"} <ArrowUpRight size={19} /></a><a href="#service-work" className="service-secondary">Explore the work <ArrowDown size={17} /></a>{["support","product"].includes(service.visual)&&<a href="/Christian-Kwame-Duodu-CV.pdf" download className="service-secondary">Download CV <ArrowDown size={17}/></a>}</div></div>
          <div className="service-visual" aria-hidden="true">
            <div className="service-orbit orbit-one" /><div className="service-orbit orbit-two" /><span className="service-visual-coordinate">CHRIS / {service.short.toUpperCase()}</span>
            {service.visual === "support" ? <SupportHero/> : service.visual === "web" ? <div className="service-browser"><div className="service-browser-bar"><i /><i /><i /><span>Built for real businesses</span><Code2 size={16} /></div><img src="/images/dansoaa.jpg" alt="" width="1340" height="620" /><div className="service-browser-footer"><span>Design → Development → Experience</span><ArrowUpRight size={18} /></div></div> :
            <div className="service-system"><div className="service-system-top"><Icon size={23}/><span>{service.visual === "support" ? "EVERYDAY SYSTEMS" : service.visual === "automation" ? "A BETTER WORKFLOW" : "A CONNECTED APPROACH"}</span><i /></div>
              {(service.visual === "support" ? ["Business software & data","Software & connectivity","People & practical support"] : service.visual === "automation" ? ["Capture the information","Connect the workflow","Review the outcome"] : service.visual==="product" ? ["Organise product information","Support customers & adoption","Coordinate daily delivery"] : service.visual==="security" ? ["Build awareness","Learn the fundamentals","Continue developing"] : ["Start a conversation","Show the value","Support the customer"]).map((item,i)=><div className="service-system-step" key={item}><span>{String(i+1).padStart(2,"0")}</span><strong>{item}</strong><Check size={16}/></div>)}
              <div className="service-system-bottom"><span>Thoughtful processes. Practical work.</span><Icon size={19}/></div></div>}
            <div className="service-floating-tag"><Icon size={17}/>{service.tags[0]}</div><span className="service-visual-note">BUILT AROUND PEOPLE.</span>
          </div>
        </div>
        <div className="service-tags">{service.tags.map(tag=><span key={tag}><Check size={14}/>{tag}</span>)}<span className="service-location">Hybrid & remote collaboration</span></div>
      </section>
      <section className="service-capabilities service-content">
        <div className="service-section-title service-enter"><p className="eyebrow">01 / HOW I CAN HELP</p><h2>The details that<br/><em>make it work.</em></h2></div>
        <div className="service-capability-grid">{service.capabilities.map(([title,body],i)=><article className="service-capability service-enter" key={title}><span className="service-small-number">0{i+1}</span><h3>{title}</h3><p>{body}</p><ArrowUpRight size={20}/></article>)}</div>
      </section>
      {service.experience && <section className="service-experience service-content service-enter"><div className="service-experience-mark"><Icon size={36}/></div><div><p className="eyebrow">RELEVANT EXPERIENCE</p><h2>{service.experience.name}</h2><span>{service.experience.role}</span><p>{service.experience.body}</p></div><a href={service.slug==="sales-marketing"?"/#about":service.experience.url} className="service-inline-link">More about the experience <ArrowUpRight size={17}/></a></section>}
      <ServiceEvidence slug={service.slug}/>
      <section className="service-work service-content" id="service-work"><div className="service-work-heading service-enter"><div><p className="eyebrow">02 / {work.length?"RELEVANT WORK":"LEARNING & DEVELOPMENT"}</p><h2>{work.length?"From the":"A foundation."}<br/><em>{work.length?"portfolio.":"In progress."}</em></h2></div><p>{service.context}</p></div>
        {!work.length&&<div className="security-foundation-note"><ShieldCheck size={32}/><div><h3>Learning, then building.</h3><p>My completed training is listed above. As I develop more practical security work, I’ll add clear examples here.</p><a className="service-inline-link" href="/#learning">Explore certifications & ongoing learning <ArrowUpRight size={16}/></a></div></div>}<div className="service-projects">{work.map((p,i)=><article className={"service-project service-enter "+(p.image?"with-preview":"")} key={p.name}>
          {p.image && <a href={p.url} target="_blank" rel="noreferrer" className="service-project-preview" aria-label={"Visit "+p.name+" website"}><img src={p.image} alt={p.name+" website preview"} loading="lazy" width="1340" height="620"/><span>View website <ArrowUpRight size={17}/></span></a>}
          <div className="service-project-body"><div className="service-project-top"><span>{p.sector}</span><span>{String(i+1).padStart(2,"0")}</span></div><h3>{p.name}</h3><p>{contributionByService[service.slug]?.[p.name]?.summary??p.summary}</p><details><summary>My contribution <span>+</span></summary><ul>{(contributionByService[service.slug]?.[p.name]?.duties??p.duties).map(d=><li key={d}>{d}</li>)}</ul></details>{p.url?<a href={p.url} target={p.url.startsWith("/")?undefined:"_blank"} rel={p.url.startsWith("/")?undefined:"noreferrer"} className="service-inline-link">{p.url.startsWith("/")?"Explore creative work":p.category==="Research"?"View research project":p.category==="Web applications"?"View platform":"Visit website"} <ExternalLink size={15}/></a>:<span className="service-delivery-label">Client support & implementation</span>}</div>
        </article>)}</div>
        {service.visual==="growth"&&<div className="service-creative-links service-enter"><a href="/graphic-design"><Palette size={24}/><div><strong>Graphic Design</strong><span>Explore the creative archive</span></div><ArrowUpRight size={23}/></a><a href="/graphic-design#motion"><Film size={24}/><div><strong>Motion & Video</strong><span>Step into the Motion Room</span></div><ArrowUpRight size={23}/></a></div>}
      </section>
      <section className="service-process service-content"><div className="service-section-title service-enter"><p className="eyebrow">03 / THE APPROACH</p><h2>Good work starts<br/><em>with understanding.</em></h2></div><div className="service-process-grid">{service.process.map(([title,body],i)=><article className="service-enter" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className="service-next service-content"><p className="eyebrow">EXPLORE MY EXPERTISE</p><div>{services.filter(s=>s.slug!==service.slug).map(s=><a key={s.slug} href={"/services/"+s.slug}>{s.short}<ArrowUpRight size={17}/></a>)}<a href="/graphic-design">Graphic Design<ArrowUpRight size={17}/></a><a href="/graphic-design#motion">Motion & Video<ArrowUpRight size={17}/></a></div></section>
      <section className="service-contact service-enter"><div className="service-contact-glow"/><p className="eyebrow">LET’S MAKE SOMETHING USEFUL</p><h2>A project in mind?<br/><em>Let’s talk about it.</em></h2><a href={enquiry} target="_blank" rel="noreferrer" className="service-primary">Start a conversation <MessageCircle size={19}/></a><a className="service-email" href="mailto:duoduchristian36@gmail.com">duoduchristian36@gmail.com</a></section>
    </main>
    <footer className="service-footer"><a className="wordmark" href="/">chris<span>✦</span><i/></a><span>© {new Date().getFullYear()} chris</span><a href="/#expertise">Back to portfolio <ArrowUpRight size={16}/></a></footer>
    <a href="#service-main" className="service-scroll-top" aria-label="Scroll to top"><ArrowDown size={20}/></a>
  </div>;
}
