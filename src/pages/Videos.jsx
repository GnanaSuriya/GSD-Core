import { useState } from 'react';
import { Search, Play, MonitorPlay } from 'lucide-react';
import Section from '../components/ui/Section';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { videosData, categories } from '../data/videos';
import { creatorData } from '../data/creator';
import Reveal from '../components/ui/Reveal';

export default function Videos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredVideos = videosData.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || video.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredVideo = filteredVideos.length > 0 ? (filteredVideos.find(v => v.featured) || filteredVideos[0]) : null;
  const regularVideos = featuredVideo ? filteredVideos.filter(v => v.id !== featuredVideo.id) : [];

  return (
    <div className="w-full pb-32 bg-zinc-950 text-slate-50 selection:bg-blue-500/30 selection:text-blue-200 min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.1)_0%,rgba(0,0,0,0)_60%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8 font-semibold tracking-wide uppercase text-sm">
              <MonitorPlay className="w-4 h-4" />
              Content Library
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              A2D ORIGINALS <br className="hidden md:block"/> & TECH REVIEWS
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
              Browse the latest PC builds, reviews, and tech news from {creatorData.name}. Deep dives and honest opinions in Tamil.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-14 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 shadow-xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Reveal delay={100} direction="up">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? 'primary' : 'outline'}
                    size="sm"
                    className={`whitespace-nowrap rounded-full transition-all duration-300 ${activeCategory === cat ? 'bg-blue-600 text-white border-transparent' : 'border-zinc-700 hover:bg-zinc-800'}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <div className="relative w-full md:w-80 shrink-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 transition-colors duration-300 peer-focus:text-blue-500" />
                <Input 
                  type="text" 
                  placeholder="Search videos..." 
                  className="pl-11 pr-4 py-2.5 rounded-full bg-zinc-900/50 border-zinc-800 w-full focus:bg-zinc-900 focus:border-blue-500 transition-all duration-300 outline-none peer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Video Grid */}
      <Section className="pt-16">
        {filteredVideos.length > 0 ? (
          <>
            {/* Featured Video (Stronger animation) */}
            {featuredVideo && (
              <Reveal delay={200} className="mb-16">
                <a href={featuredVideo.youtubeUrl} target="_blank" rel="noreferrer" className="block group">
                  <div className="grid lg:grid-cols-12 gap-0 overflow-hidden bg-zinc-900/30 rounded-[2rem] border border-zinc-800 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/20 group-focus-visible:ring-2 group-focus-visible:ring-blue-500 outline-none">
                    <div className="lg:col-span-8 overflow-hidden relative aspect-video">
                      <img 
                        src={featuredVideo.thumbnail} 
                        alt={featuredVideo.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-transparent transition-colors duration-500"></div>
                      
                      <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/80 backdrop-blur-md rounded text-sm font-semibold border border-white/10 z-10">
                        {featuredVideo.category}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-blue-600/90 rounded-full flex items-center justify-center pl-1 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 backdrop-blur-md shadow-[0_0_40px_rgba(37,99,235,0.6)]">
                          <Play className="w-10 h-10 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-4 p-8 lg:p-10 flex flex-col justify-center bg-zinc-900/50 backdrop-blur-xl border-l border-zinc-800/50">
                      <div className="inline-flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-xs mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Featured Release
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug group-hover:text-blue-400 transition-colors duration-300">
                        {featuredVideo.title}
                      </h3>
                      <p className="text-zinc-400 mb-8 line-clamp-3 leading-relaxed">
                        Join us as we take a deep dive into {featuredVideo.category.toLowerCase()} and uncover the details that actually matter. No fluff, just pure tech.
                      </p>
                      <div className="flex items-center justify-between text-zinc-500 font-semibold text-sm mt-auto border-t border-zinc-800/50 pt-6">
                        <span>{featuredVideo.views} views</span>
                        <span>{featuredVideo.publishedAt}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>
            )}

            {/* Grid of remaining videos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {regularVideos.map((video, idx) => (
                <Reveal key={video.id} delay={(idx % 4) * 100 + 100} direction="up">
                  <a 
                    href={video.youtubeUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="block outline-none h-full group"
                  >
                    <Card className="h-full bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-black/50 overflow-hidden flex flex-col rounded-2xl">
                      <div className="relative aspect-video overflow-hidden border-b border-zinc-800">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-14 h-14 bg-blue-600/90 rounded-full flex items-center justify-center pl-1 shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                            <Play className="w-6 h-6 text-white fill-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm border border-white/10 z-10">
                          {video.category}
                        </div>
                      </div>
                      <CardContent className="p-5 flex-grow flex flex-col bg-gradient-to-b from-transparent to-zinc-900/50">
                        <h3 className="text-base font-bold line-clamp-2 mb-4 group-hover:text-blue-400 transition-colors leading-snug">
                          {video.title}
                        </h3>
                        <div className="mt-auto flex items-center justify-between text-xs text-zinc-500 font-semibold border-t border-zinc-800/50 pt-4">
                          <span>{video.views} views</span>
                          <span>{video.publishedAt}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <Reveal delay={200}>
            <div className="text-center py-32 bg-zinc-900/20 rounded-[2rem] border border-zinc-800/50">
              <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                <Search className="w-10 h-10 text-zinc-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No videos found</h3>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">We couldn't find any videos matching your search criteria. Try a different term or clear your filters.</p>
              <Button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} size="lg" className="rounded-full px-8 bg-zinc-800 hover:bg-zinc-700">
                Clear All Filters
              </Button>
            </div>
          </Reveal>
        )}
      </Section>
    </div>
  );
}
