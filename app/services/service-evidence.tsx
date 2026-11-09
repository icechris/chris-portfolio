import { ArrowUpRight, Check, Headphones, Layers, Monitor, Workflow, Globe2 } from "lucide-react";
export const contributionByService: Record<string,Record<string,{summary:string;duties:string[]}>> = {
 "product-operations":{
  "Dansoaa":{summary:"Product catalogue management and digital presentation for a building-materials business.",duties:["Managed product information and catalogue presentation.","Organised the website around product discovery and useful categories.","Connected product content with enquiry and quotation flows.","Created promotional content to support the product offering."]},
  "Junk Titanic":{summary:"Service information and customer enquiry journeys for a UK-based clearance business.",duties:["Structured rubbish-removal, house-clearance and commercial-clearance services.","Presented pricing, service coverage and useful customer information.","Built clear phone and WhatsApp enquiry routes.","Supported service content and search visibility through the business website."]},
  "Currently Offline":{summary:"Creative campaign delivery for a US-based events and community business.",duties:["Produced event graphics and promotional video content.","Worked through client feedback and revisions to deliver campaign assets.","Coordinated the presentation of event information across designs and videos."]},
  "BodyPride MedSpa":{summary:"Service presentation, website information and ongoing digital support for a wellness business.",duties:["Developed the business website and supporting digital system.","Presented services and supported the business's online visibility.","Provided ongoing digital and technical assistance."]},
  "Shai Cars":{summary:"Website and digital-systems support for an automotive business.",duties:["Contributed to the company website and digital systems.","Supported digital presentation and business technology needs."]},
  "3an Company":{summary:"Website information and digital-systems support for business operations.",duties:["Handled website work for the business.","Provided digital-systems support for daily operations."]},
  "Chrisango Africa":{summary:"Company website and practical technology support.",duties:["Handled the company website.","Provided assistance for business technology needs."]}
 },
 "it-support":{
  "Dansoaa":{summary:"Website development and product-information support for a building-materials business.",duties:["Redesigned and developed the business website.","Supported product catalogue information and navigation.","Created enquiry and quotation flows with contact integrations."]},
  "Junk Titanic":{summary:"A business website and clear enquiry routes for a UK-based services company.",duties:["Designed and developed the business website.","Structured service information and contact journeys.","Connected phone and WhatsApp enquiry links."]},
  "BodyPride MedSpa":{summary:"Website, business-platform setup and ongoing technical assistance.",duties:["Built the website and supporting digital system.","Handled Google-related business setup and optimisation.","Provided ongoing digital and technical support."]}
 },
 "sales-marketing":{
  "Currently Offline":{summary:"US-based event campaigns brought to life through graphics and promotional video.",duties:["Created campaign flyers and social graphics for community events.","Edited promotional videos, captions, colour and audio.","Worked with client feedback to refine the final campaign content."]},
  "Junk Titanic":{summary:"Website presentation, search visibility and enquiry journeys for a UK-based business.",duties:["Presented the company's rubbish-removal and clearance services online.","Organised service, pricing and coverage content.","Supported search visibility and clear phone and WhatsApp enquiry paths."]},
  "Dansoaa":{summary:"Product presentation and creative marketing support for a building-materials business.",duties:["Managed the website and product catalogue presentation.","Created promotional graphics and social content.","Connected product discovery with quotation and enquiry flows."]},
  "Pretty Iris Aesthetics":{summary:"Digital-platform support and social content work for an aesthetics business.",duties:["Supported the business's digital presence and social channels.","Maintained the website and provided practical technical assistance."]}
 }
};
const retillResponsibilities=[
 ["Sales & product demonstrations","Prospect for business customers, explain the product and demonstrate relevant features."],
 ["Onboarding & adoption","Help businesses get started and guide users through the software in the context of their daily work."],
 ["Product & technical support","Answer user questions, troubleshoot issues and help customers get practical value from the system."],
 ["Business data readiness","Support product and stock-data preparation, category organisation and information checks during implementation."],
 ["Customer feedback","Listen to recurring questions and needs, then bring useful feedback into team discussions."],
 ["Marketing & creative content","Produce graphic, motion, video and digital content to support product communication and business development."],
 ["Office operations","Manage daily office activities, business technology and IT equipment alongside customer-facing responsibilities."]
];
export default function ServiceEvidence({slug}:{slug:string}){
 if(slug!=="product-operations"&&slug!=="it-support")return null;
 const product=slug==="product-operations";
 const cases=product?[
 {name:"Software products",title:"Retill",body:"Product demonstrations, customer onboarding, user support and feedback—connected with sales, marketing and office operations.",tag:"PRODUCT ADOPTION",icon:Layers},
 {name:"Product catalogues",title:"Dansoaa",body:"Managing product information and digital catalogue presentation so customers can discover materials and send useful enquiries.",tag:"PRODUCT INFORMATION",icon:Workflow},
 {name:"Service businesses",title:"Junk Titanic · UK-based",body:"Organising services, pricing, coverage and contact journeys around the questions a customer needs answered.",tag:"SERVICE OPERATIONS",icon:Globe2}
 ]:[
 {name:"Business software & data",title:"Monic Home & Body Essentials",body:"Structured more than 1,800 products for POS use, supported setup and troubleshot the router/network and CCTV environment.",tag:"RETAIL SYSTEMS",icon:Layers},
 {name:"Workplace technology",title:"Pizza Republic",body:"Built the website, supported restaurant software setup and installed TV/display equipment during startup.",tag:"HOSPITALITY SUPPORT",icon:Monitor},
 {name:"Digital-platform support",title:"Pretty Iris Aesthetics",body:"Maintained the website and provided ongoing practical troubleshooting and business technology assistance.",tag:"WEBSITE & USER SUPPORT",icon:Headphones}
 ];
 return <section className={"service-evidence service-content "+(product?"evidence-product":"evidence-support")}>
  <div className="evidence-heading service-enter"><div><p className="eyebrow">{product?"PRODUCTS, SERVICES & PEOPLE":"PRACTICAL SUPPORT, CLEARLY EXPLAINED"}</p><h2>{product?"More than onboarding.":"A support profile,"}<br/><em>{product?"The work around the product.":"built on real work."}</em></h2></div><p>{product?"Products need useful information, supported customers and coordinated delivery. My work connects those pieces across software, catalogues and service businesses.":"Technical ability matters alongside how well you understand the user, explain a solution and support the next step."}</p></div>
  {product&&<div className="retill-responsibilities service-enter"><div><span className="evidence-icon"><Layers size={27}/></span><p className="eyebrow">RETILL / VERSIFIED TECHNOLOGY</p><h3>A product role,<br/>with business context.</h3><p>My contribution spans the customer journey and the operations supporting it.</p></div><div>{retillResponsibilities.map(([title,body],i)=><article key={title}><span>0{i+1}</span><div><h4>{title}</h4><p>{body}</p></div></article>)}</div></div>}
  <div className="evidence-case-grid">{cases.map(c=><article className="evidence-case service-enter" key={c.title}><div><c.icon size={24}/><span>{c.tag}</span></div><p>{c.name}</p><h3>{c.title}</h3><p>{c.body}</p></article>)}</div>
  {!product&&<div className="support-profile service-enter"><div><p className="eyebrow">WHERE THIS EXPERIENCE FITS</p><h3>Technical support.<br/><em>With people at the centre.</em></h3><div className="support-role-tags">{["IT Support","Application Support","Product Support","Technical Customer Success","Business Systems Support","Website Support"].map(role=><span key={role}>{role}</span>)}</div><a href="/Christian-Kwame-Duodu-CV.pdf" download className="service-inline-link">Download my CV <ArrowUpRight size={16}/></a></div><div className="support-skills"><h4>Hands-on experience</h4><ul>{["Business software setup & user onboarding","Website maintenance & troubleshooting","Product-data preparation & quality checks","Router / Wi-Fi and connected equipment support","PCs, peripherals & display equipment","Customer guidance & cross-functional support"].map(item=><li key={item}><Check size={14}/>{item}</li>)}</ul><div><h4>Continuing development</h4><p>Systems administration, networking, cloud engineering, cybersecurity and IT automation.</p><a href="/#learning">Explore training & learning <ArrowUpRight size={14}/></a></div></div></div>}
 </section>;
}

export function SupportHero(){
 return <div className="support-hero-console">
  <div className="support-console-bar"><span><i/><i/><i/></span><span>USER / SYSTEM / SOLUTION</span><Headphones size={17}/></div>
  <div className="support-console-content"><span className="support-console-eyebrow">A PRACTICAL SUPPORT APPROACH</span><strong>From the issue<br/><em>to the next step.</em></strong><div className="support-console-flow">{[["01","Understand the user","Context, symptoms & business impact"],["02","Work through the cause","Application, data, connection or equipment"],["03","Resolve & explain","Verify the task and guide the user"]].map(([n,title,body])=><div key={n}><span>{n}</span><div><b>{title}</b><small>{body}</small></div><Check size={14}/></div>)}</div></div>
  <div className="support-console-footer"><span><Monitor size={14}/> SYSTEMS</span><span><Layers size={14}/> APPLICATIONS</span><span><Headphones size={14}/> PEOPLE</span></div>
 </div>;
}
