import { Link2, Mail, ExternalLink, Camera, MessageSquare, MonitorPlay, MessageCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import { Card, CardContent } from '../components/ui/Card';
import { creatorData } from '../data/creator';
import Reveal from '../components/ui/Reveal';

const iconMap = {
  instagram: <Camera className="w-6 h-6" />,
  twitter: <MessageSquare className="w-6 h-6" />,
  youtube: <MonitorPlay className="w-6 h-6" />,
  whatsapp: <MessageCircle className="w-6 h-6" />
};

export default function Connect() {
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-slate-50 pb-32">
      <Section className="pt-32 pb-16 relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.1)_0%,rgba(0,0,0,0)_50%)] pointer-events-none"></div>
        <Reveal>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8 font-semibold tracking-wide uppercase text-sm">
            <Link2 className="w-4 h-4" />
            Connect
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">CONNECT WITH A2D</h1>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Find {creatorData.name} across the web. Follow for updates, behind-the-scenes, and more tech content.
          </p>
        </Reveal>
      </Section>

      {/* SOCIAL CONNECTION SECTION */}
      <Section className="py-24">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {creatorData.socialLinks.map((link, idx) => (
            <Reveal key={link.platform} delay={idx * 150} direction="up">
              <a 
                href={link.url} 
                target="_blank" 
                rel="noreferrer noopener"
                className="block group outline-none h-full"
              >
                <Card className="h-full bg-zinc-900/40 border-zinc-800 group-hover:border-blue-500/50 group-hover:bg-zinc-900 transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-blue-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-blue-900/10 rounded-[2rem]">
                  <CardContent className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                        {iconMap[link.icon] || <Link2 className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-slate-50 group-hover:text-blue-400 transition-colors">{link.platform}</h3>
                        <p className="text-sm text-zinc-500 font-medium">{link.handle || creatorData.handle}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-zinc-600 group-hover:text-blue-400 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </CardContent>
                </Card>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CONTACT DETAILS SECTION */}
      <Section className="py-12">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-bold text-zinc-500 tracking-[0.2em] uppercase text-center mb-8">CONTACT</h2>
            
            <Card className="bg-zinc-900/60 backdrop-blur-xl border-zinc-800 overflow-hidden relative shadow-2xl rounded-[2.5rem]">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform translate-x-8 -translate-y-8">
                <Mail className="w-64 h-64 text-blue-500" />
              </div>
              
              <CardContent className="p-10 md:p-16 relative z-10 flex flex-col items-center text-center">
                <h3 className="text-3xl md:text-4xl font-black mb-4 text-white">GET IN TOUCH</h3>
                <p className="text-zinc-400 mb-10 text-lg leading-relaxed max-w-lg">
                  For collaborations, business enquiries and general contact.
                </p>
                
                <a 
                  href="mailto:collab@a2dmediagroup.com" 
                  className="inline-flex items-center gap-3 h-14 px-8 bg-blue-600 text-white hover:bg-blue-700 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:-translate-y-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <Mail className="w-5 h-5" />
                  collab@a2dmediagroup.com
                </a>
              </CardContent>
            </Card>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
