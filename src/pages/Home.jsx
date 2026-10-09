import { Link } from 'react-router-dom';
import { Play, ArrowRight, TrendingUp, Users, MonitorPlay, Cpu, ChevronDown, Compass, Rocket } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { creatorData } from '../data/creator';
import { videosData } from '../data/videos';
import Reveal from '../components/ui/Reveal';

export default function Home() {
  const featuredVideo = videosData.find(v => v.featured) || videosData[0];
  const recentVideos = videosData.filter(v => v.id !== featuredVideo.id).slice(0, 3);

  return (
    <div className="w-full bg-zinc-950 text-slate-50 selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* SECTION 1 - HERO */}
      <section className="relative w-full h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={creatorData.coverImage} 
            alt="A2D Hero Background" 
            className="w-full h-full object-cover opacity-30 object-center scale-105 animate-[pulse_25s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15)_0%,rgba(0,0,0,0)_50%)]"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center mt-12">
          <Reveal delay={100} direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-8">
              A2D CHANNEL
            </div>
          </Reveal>
          
          <Reveal delay={300} direction="up">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">TECHNOLOGY.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">CURIOSITY.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">A COMMUNITY.</span>
            </h1>
          </Reveal>
          
          <Reveal delay={500} direction="up">
            <p className="text-lg md:text-2xl text-zinc-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Leading the Tamil tech space with honest reviews, deep-dive PC builds, and a passion for engineering.
            </p>
          </Reveal>
          
          <Reveal delay={700} direction="up" className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/about" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-white text-zinc-950 hover:bg-zinc-200 h-14 px-8 rounded-full font-bold">
                Explore A2D
              </Button>
            </Link>
            <Link to="/community" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-white h-14 px-8 rounded-full font-bold backdrop-blur-md">
                Join the Community
              </Button>
            </Link>
          </Reveal>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* SECTION 2 - THE A2D EXPERIENCE */}
      <Section className="py-32 border-b border-zinc-900 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-500 mb-16 tracking-tight">MORE THAN CONTENT.</h2>
          </Reveal>
          
          <div className="flex flex-col gap-6 md:gap-8">
            {['TECHNOLOGY', 'DISCOVERY', 'COMMUNITY'].map((word, i) => (
              <Reveal key={i} delay={i * 200} direction="left">
                <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-700 hover:to-blue-500 transition-colors duration-500 cursor-default">
                  {word}
                </h3>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 3 - LATEST CONTENT */}
      <Section className="py-32 bg-zinc-900/20">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">WHAT'S HAPPENING AT A2D</h2>
              <p className="text-zinc-400 text-lg">The latest deep-dives, builds, and tech coverage.</p>
            </div>
            <Link to="/videos" className="group flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors shrink-0">
              View Content Library 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        {/* Featured Video Layout */}
        <Reveal delay={200}>
          <a href={featuredVideo.youtubeUrl} target="_blank" rel="noreferrer" className="block group mb-12">
            <div className="grid lg:grid-cols-12 gap-8 items-center bg-zinc-900/40 rounded-3xl border border-zinc-800 p-4 hover:border-blue-500/30 hover:bg-zinc-900 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10">
              <div className="lg:col-span-8 overflow-hidden rounded-2xl relative aspect-video">
                <img 
                  src={featuredVideo.thumbnail} 
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-blue-600/90 rounded-full flex items-center justify-center pl-1 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 backdrop-blur-sm shadow-lg shadow-blue-500/50">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 p-4 lg:p-6 flex flex-col justify-center">
                <div className="inline-flex px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs font-bold tracking-widest uppercase mb-6 self-start">
                  Featured Video
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight group-hover:text-blue-400 transition-colors duration-300">
                  {featuredVideo.title}
                </h3>
                <div className="flex items-center gap-4 text-zinc-500 text-sm font-medium">
                  <span>{featuredVideo.views} views</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                  <span>{featuredVideo.publishedAt}</span>
                </div>
              </div>
            </div>
          </a>
        </Reveal>

        {/* Supporting Video Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {recentVideos.map((video, idx) => (
            <Reveal key={video.id} delay={idx * 150} direction="up">
              <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="block group h-full">
                <Card className="h-full bg-zinc-900/40 border-zinc-800 hover:border-zinc-600 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-black/50 overflow-hidden flex flex-col rounded-2xl">
                  <div className="relative aspect-video overflow-hidden border-b border-zinc-800">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white/90 fill-white/90" />
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">{video.category}</span>
                    <h4 className="text-lg font-bold mb-4 line-clamp-2 leading-snug group-hover:text-zinc-300 transition-colors">
                      {video.title}
                    </h4>
                    <div className="mt-auto flex items-center justify-between text-xs font-semibold text-zinc-500">
                      <span>{video.views}</span>
                      <span>{video.publishedAt}</span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 4 - A2D JOURNEY PREVIEW */}
      <Section className="py-32 relative border-y border-zinc-800">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16 text-center">THE JOURNEY</h2>
          </Reveal>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[19px] sm:before:ml-[27px] before:w-px before:bg-gradient-to-b before:from-transparent before:via-blue-500/50 before:to-transparent mb-16">
            {[
              { year: "2018", title: "The Beginning", desc: "Started the channel to share hardware knowledge in Tamil." },
              { year: "1M", title: "Community Milestone", desc: "Crossed 1 Million subscribers, solidifying the A2D Army." },
              { year: "Today", title: "Continued Growth", desc: `Reaching ${creatorData.stats.subscribers} with deep tech dives.` }
            ].map((milestone, idx) => (
              <Reveal key={idx} delay={idx * 200} direction="left" className="relative flex items-start gap-6 sm:gap-8 group">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-zinc-950 border-4 border-zinc-800 flex items-center justify-center shrink-0 text-sm sm:text-base font-bold text-zinc-300 z-10 group-hover:border-blue-500 group-hover:text-blue-400 transition-colors duration-300">
                  {milestone.year}
                </div>
                <div className="pt-1.5 sm:pt-3">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{milestone.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">{milestone.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={600} className="text-center">
            <Link to="/about">
              <Button variant="outline" size="lg" className="gap-2 rounded-full border-zinc-700 hover:bg-zinc-800 px-8">
                Explore the full journey <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 5 - WHY A2D */}
      <Section className="py-32 bg-zinc-900/30">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">WHY A2D STANDS OUT</h2>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: <Compass className="w-8 h-8"/>, title: "CURIOUS", desc: "Always exploring what's next in the tech world." },
            { icon: <Cpu className="w-8 h-8"/>, title: "TECH-DRIVEN", desc: "Deeply focused on hardware engineering and innovation." },
            { icon: <Users className="w-8 h-8"/>, title: "COMMUNITY", desc: "Built around people who love learning and discovering." }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 200} direction="up">
              <div className="p-8 rounded-3xl bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-blue-400 mb-8 border border-zinc-800">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 6 - COMMUNITY */}
      <Section className="py-40 relative overflow-hidden bg-zinc-950 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=2000')] opacity-5 mix-blend-screen bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">THE COMMUNITY IS PART OF THE STORY.</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12">Don't just watch from the sidelines.</p>
          </Reveal>
          <Reveal delay={400}>
            <Link to="/community">
              <Button size="lg" className="h-16 px-10 rounded-full text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all">
                Join the Community
              </Button>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 7 - CREATOR SNAPSHOT */}
      <Section className="py-32 bg-zinc-900/40 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div className="aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden border border-zinc-800 relative">
              <img 
                src={creatorData.avatar} 
                alt={creatorData.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-300 font-bold tracking-widest text-sm mb-4">
                  {creatorData.name}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold">{creatorData.handle}</h3>
              </div>
            </div>
          </Reveal>
          
          <div className="space-y-12">
            <Reveal direction="right" delay={100}>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Leading the Tamil Tech Space</h2>
              <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
                Known for bringing complex PC hardware and engineering topics to a regional audience, A2D continues to push the boundaries of what tech content can be.
              </p>
            </Reveal>
            
            <div className="grid grid-cols-2 gap-6">
              <Reveal direction="up" delay={200}>
                <div className="p-6 border-l-2 border-blue-500 bg-gradient-to-r from-blue-500/5 to-transparent">
                  <div className="text-4xl font-black mb-2">{creatorData.stats.subscribers}</div>
                  <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Subscribers</div>
                </div>
              </Reveal>
              <Reveal direction="up" delay={300}>
                <div className="p-6 border-l-2 border-indigo-500 bg-gradient-to-r from-indigo-500/5 to-transparent">
                  <div className="text-4xl font-black mb-2">{creatorData.stats.joinDate !== '[Join Date Placeholder]' ? creatorData.stats.joinDate.split(' ')[2] || creatorData.stats.joinDate : '2018'}</div>
                  <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Est.</div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 8 - FINAL CTA */}
      <Section className="py-40 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(37,99,235,0.1)_0%,rgba(0,0,0,0)_60%)]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">THE JOURNEY DOESN'T STOP HERE.</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-xl text-zinc-400 mb-12">Explore the content. Discover the story. Join the community.</p>
          </Reveal>
          <Reveal delay={400} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/videos" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 px-8 rounded-full font-bold bg-white text-black hover:bg-zinc-200">
                Explore Content
              </Button>
            </Link>
            <Link to="/community" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full h-14 px-8 rounded-full font-bold border-zinc-700 hover:bg-zinc-800">
                Join Community
              </Button>
            </Link>
          </Reveal>
        </div>
      </Section>

    </div>
  );
}
