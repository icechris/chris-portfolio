import { Sparkles } from "lucide-react";

export default function LivingPortrait() {
  return <div className="portrait-wrap">
    <div className="portrait">
      <img src="/images/christian-suit.jpg" alt="Christian Kwame Duodu in a navy suit, white shirt and tie" width={925} height={1280} fetchPriority="high"/>
      <span className="portrait-label">CHRISTIAN<br/>KWAME DUODU</span>
      <span className="portrait-monogram">CD.</span>
    </div>
    <div className="portrait-caption"><span>Technology. Marketing. Operations.</span><Sparkles size={20}/></div>
  </div>;
}
