import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, MonitorPlay, Zap, ArrowRight, Cpu, Rocket, Video, Smartphone, Globe, ChevronDown, Play, ChevronRight, MessageSquare, Compass, Shield } from 'lucide-react';
import Section from '../components/ui/Section';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { creatorData } from '../data/creator';

import Reveal from '../components/ui/Reveal';

export default function About() {
  return (
    <div className="w-full bg-zinc-950 text-slate-50 selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* SECTION 1 — HERO */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={creatorData.coverImage} 
            alt="A2D Journey" 
            className="w-full h-full object-cover opacity-20 object-center scale-105 animate-[pulse_20s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <Reveal delay={100}>
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs sm:text-sm font-semibold tracking-widest mb-6">
              A2D CHANNEL • CREATOR STORY
            </span>
          </Reveal>
          
          <Reveal delay={300}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              THE JOURNEY<br/>OF A2D
            </h1>
          </Reveal>
          
          <Reveal delay={500}>
            <p className="text-lg sm:text-2xl text-zinc-300 max-w-2xl mx-auto font-medium leading-relaxed">
              From a passion for technology to building a community around it.
            </p>
          </Reveal>

          <Reveal delay={700} className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 text-zinc-500" />
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 — WHO IS A2D? */}
      <Section className="py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Tech Content</span> in Tamil.
            </h2>
            <div className="h-1 w-20 bg-blue-500 rounded-full mb-8"></div>
            <div className="flex flex-wrap gap-3">
              {['Technology', 'PC Building', 'Hardware Breakdowns', 'Gadgets', 'Tamil Tech Community'].map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          
          <Reveal direction="right" delay={200}>
            <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
              <p>
                {creatorData.fullBio}
              </p>
              <p>
                We believe that technology isn't just about reading a spec sheet—it's about understanding how it integrates into our lives, how it works under the hood, and how it pushes the boundaries of what's possible.
              </p>
              <p>
                Through deep-dive tutorials and completely honest reviews, {creatorData.name} aims to bridge the gap between complex engineering concepts and the everyday tech enthusiast.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 3 — THE BEGINNING */}
      <Section className="py-20 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Where It Started</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">A simple motivation to share knowledge sparked a movement.</p>
          </Reveal>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            {[
              { title: "START", desc: "A passion for tech and a desire to share it in native Tamil." },
              { title: "First Content", desc: "Breaking down hardware basics and PC building." },
              { title: "Early Audience", desc: "Finding viewers who valued deep, honest technical insights." },
              { title: "Growing Channel", desc: "Evolving into a trusted voice in the regional tech space." }
            ].map((step, i, arr) => (
              <Reveal key={i} delay={i * 200} className="flex flex-col items-center w-full">
                <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-slate-50 mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-400">{step.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="h-12 w-px bg-gradient-to-b from-blue-500/50 to-transparent my-2"></div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 4 — JOURNEY TIMELINE */}
      <Section className="py-24 md:py-32">
        <div className="text-center mb-20">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">THE A2D JOURNEY</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Every milestone represents a step forward with the community.</p>
          </Reveal>
        </div>

        <div className="max-w-5xl mx-auto relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-zinc-800 before:via-blue-500/50 before:to-zinc-800">
          {[
            { label: "Early Years", title: "The Beginning", desc: "Started the A2D Channel journey with a focus on hardware education." },
            { label: "Growth Era", title: "Expanding Reach", desc: "The channel gains momentum, crossing major subscriber milestones and expanding content." },
            { label: "Expansion", title: "New Content Eras", desc: "Diving deeper into gadgets, setup showcases, and advanced tech concepts." },
            { label: "Today", title: "A Massive Community", desc: `Continuing to grow the A2D Army, now reaching ${creatorData.stats.subscribers} strong.` }
          ].map((m, index) => (
            <Reveal key={index} delay={index * 150} direction={index % 2 === 0 ? "right" : "left"}>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-12 md:mb-20 last:mb-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-blue-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 md:p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm hover:bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-zinc-700">
                  <div className="mb-2">
                    <span className="text-sm font-bold text-blue-400 tracking-wider uppercase">{m.label}</span>
                  </div>
                  <h3 className="font-bold text-2xl text-slate-50 mb-3">{m.title}</h3>
                  <p className="text-zinc-400 text-base leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 5 — KEY MILESTONES */}
      <Section className="py-24 bg-zinc-900/20 border-t border-zinc-800/50">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">Key Achievements</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: <Video className="w-8 h-8"/>, title: "Channel Created", desc: "The foundation of A2D." },
            { icon: <Users className="w-8 h-8"/>, title: "1M Subscribers", desc: "A massive milestone of community trust." },
            { icon: <Zap className="w-8 h-8"/>, title: `${creatorData.stats.subscribers} Subscribers`, desc: "Currently growing the A2D Army." },
            { icon: <Shield className="w-8 h-8"/>, title: "Trusted Reviews", desc: "Known for completely honest tech opinions." },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 100}>
              <Card className="bg-zinc-900/50 border-zinc-800 hover:border-blue-500/30 transition-all duration-300 h-full group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-8 text-center relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-slate-50">{card.title}</h3>
                  <p className="text-sm text-zinc-400">{card.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 6 — CONTENT EVOLUTION */}
      <Section className="py-24">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Content Evolution</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">How our storytelling and topics have expanded over time.</p>
          </Reveal>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-2">
            {[
              { icon: <MonitorPlay />, title: "EARLY CONTENT", desc: "Basic tech news & updates" },
              { icon: <Cpu />, title: "PC BUILDING", desc: "Deep hardware breakdowns" },
              { icon: <Smartphone />, title: "GADGETS & REVIEWS", desc: "Honest product testing" },
              { icon: <Globe />, title: "MODERN A2D", desc: "Comprehensive tech ecosystem" }
            ].map((stage, i, arr) => (
              <Reveal key={i} delay={i * 150} className="flex-1 flex flex-col md:flex-row items-center">
                <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center hover:bg-zinc-800/50 transition-colors duration-300">
                  <div className="inline-flex p-3 rounded-full bg-zinc-950 border border-zinc-800 text-blue-400 mb-4">
                    {stage.icon}
                  </div>
                  <h3 className="font-bold text-sm tracking-widest text-slate-200 mb-2">{stage.title}</h3>
                  <p className="text-xs text-zinc-500">{stage.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:flex text-zinc-700 px-2">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
                {i < arr.length - 1 && (
                  <div className="md:hidden flex text-zinc-700 py-2">
                    <ChevronDown className="w-6 h-6" />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 7 — THE COMMUNITY */}
      <Section className="py-32 relative overflow-hidden bg-zinc-900/20">
        <div className="absolute inset-0 bg-blue-500/[0.02] mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-6 block">More Than A Channel</span>
            <div className="px-4 py-8 md:py-12 border-y border-zinc-800/50 my-8">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
                "TECHNOLOGY ISN'T JUST ABOUT PRODUCTS. IT'S ABOUT PEOPLE, CURIOSITY AND DISCOVERY."
              </h2>
            </div>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              The A2D Army is the heartbeat of this journey. We don't just build PCs; we build connections, share knowledge, and foster a culture of learning.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 8 — A2D TODAY */}
      <Section className="py-24">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center">A2D TODAY</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: <MonitorPlay className="w-10 h-10 text-blue-400"/>, title: "CONTENT", desc: "Producing high-quality, deep-dive technical content in Tamil." },
            { icon: <Users className="w-10 h-10 text-emerald-400"/>, title: "COMMUNITY", desc: `Leading the A2D Army with ${creatorData.stats.subscribers} engaged members.` },
            { icon: <Zap className="w-10 h-10 text-amber-400"/>, title: "INNOVATION", desc: "Continuously pushing the boundaries of creator storytelling and tech journalism." }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 200} direction="up">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:bg-zinc-800/50 transition-all duration-300">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 9 — BEYOND THE CHANNEL */}
      <Section className="py-24 bg-gradient-to-b from-transparent to-zinc-900/30">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Where The Journey Could Go Next</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Exploring the frontiers of technology and storytelling.</p>
          </div>
        </Reveal>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {[
            { label: "Artificial Intelligence", icon: <Cpu className="w-4 h-4"/> },
            { label: "New Tech Frontiers", icon: <Rocket className="w-4 h-4"/> },
            { label: "Community Events", icon: <MessageSquare className="w-4 h-4"/> },
            { label: "Innovative Storytelling", icon: <Compass className="w-4 h-4"/> }
          ].map((theme, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-blue-500 hover:text-white transition-colors cursor-default">
                {theme.icon}
                <span className="font-medium">{theme.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 10 — FINAL CTA */}
      <Section className="py-32 pb-40 relative border-t border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              THE JOURNEY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">CONTINUES.</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-xl mx-auto leading-relaxed">
              Explore the content, join the community, and be part of what's next.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/videos" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white text-zinc-950 hover:bg-zinc-200 gap-2 h-14 px-8 text-base font-bold rounded-full">
                  <Play className="w-5 h-5 fill-current" />
                  Explore Content
                </Button>
              </Link>
              <Link to="/community" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-white gap-2 h-14 px-8 text-base font-bold rounded-full">
                  <Users className="w-5 h-5" />
                  Join Community
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
