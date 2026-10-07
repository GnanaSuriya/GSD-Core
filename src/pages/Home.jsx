import { Link } from 'react-router-dom';
import { Play, ArrowRight, TrendingUp, Users, MonitorPlay, Cpu } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { creatorData } from '../data/creator';
import { videosData } from '../data/videos';

export default function Home() {
  const featuredVideo = videosData.find(v => v.featured) || videosData[0];
  const recentVideos = videosData.filter(v => v.id !== featuredVideo.id).slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={creatorData.coverImage} 
            alt="PC Build Background" 
            className="w-full h-full object-cover opacity-20 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <Cpu className="w-4 h-4" />
              <span>{creatorData.bio.split(' | ')[0]}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              Welcome to <br /> {creatorData.name}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
              {creatorData.bio} Join the A2D Army for the best hardware breakdowns and PC building guides in Tamil.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href={creatorData.socialLinks.find(l => l.platform === 'YouTube')?.url} target="_blank" rel="noreferrer">
                <Button size="lg" className="gap-2 bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg shadow-red-900/20">
                  <Play className="w-5 h-5" />
                  Subscribe Now
                </Button>
              </a>
              <Link to="/videos">
                <Button variant="outline" size="lg" className="gap-2 bg-zinc-950/50 backdrop-blur-sm hover:bg-zinc-800">
                  <MonitorPlay className="w-5 h-5" />
                  Watch Latest Videos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Introduction & Stats */}
      <Section className="border-t border-zinc-900 bg-zinc-950/50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
              Meet {creatorData.name}
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              {creatorData.fullBio}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900 transition-colors">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Users className="w-8 h-8 text-blue-500 mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-slate-50">{creatorData.stats.subscribers}</div>
                  <div className="text-xs md:text-sm text-zinc-500 uppercase tracking-wider font-semibold mt-1">Subscribers</div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900 transition-colors">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <TrendingUp className="w-8 h-8 text-blue-500 mb-2" />
                  <div className="text-xl md:text-2xl font-bold text-slate-50">
                    {creatorData.stats.joinDate !== '[Join Date Placeholder]' ? creatorData.stats.joinDate : 'Since 2018'}
                  </div>
                  <div className="text-xs md:text-sm text-zinc-500 uppercase tracking-wider font-semibold mt-1">Joined YouTube</div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="relative order-first md:order-last px-4 md:px-0">
            <div className="aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-blue-900/10">
              <img 
                src={creatorData.avatar} 
                alt={creatorData.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </Section>

      {/* Featured Video */}
      <Section className="bg-zinc-900/30">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Build</h2>
            <p className="text-zinc-400 mt-2">Check out the latest top-tier content.</p>
          </div>
          <Link to="/videos" className="hidden md:flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium transition-colors">
            View all videos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative group cursor-pointer rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 block transition-all hover:border-zinc-700 hover:shadow-2xl hover:shadow-blue-900/10">
          <div className="aspect-video relative overflow-hidden">
            <img 
              src={featuredVideo.thumbnail} 
              alt={featuredVideo.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60"></div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
              <div className="w-20 h-20 rounded-full bg-blue-600/90 flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(37,99,235,0.5)] scale-90 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 relative">
            <div className="flex items-center flex-wrap gap-3 text-sm text-zinc-400 mb-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                {featuredVideo.category}
              </span>
              <span>{featuredVideo.views} views</span>
              <span className="hidden sm:inline">•</span>
              <span>{featuredVideo.publishedAt}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold group-hover:text-blue-400 transition-colors">
              {featuredVideo.title}
            </h3>
          </div>
        </div>
      </Section>

      {/* Recent Videos Grid */}
      <Section>
        <h2 className="text-3xl font-bold mb-10">Recent Uploads</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentVideos.map(video => (
            <Card key={video.id} className="group hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-zinc-900/40 hover:shadow-xl hover:shadow-black/50">
              <div className="aspect-video relative overflow-hidden border-b border-zinc-800">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-3 right-3 bg-zinc-950/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-medium border border-zinc-800">
                  {video.category}
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-bold line-clamp-2 mb-4 group-hover:text-blue-400 transition-colors leading-snug">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-zinc-400 font-medium">
                  <span>{video.views} views</span>
                  <span>{video.publishedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center md:hidden">
          <Link to="/videos">
            <Button variant="outline" className="gap-2 w-full">
              View all videos <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Community CTA */}
      <Section className="bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-900 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto text-center py-8">
          <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Join the A2D Army</h2>
          <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
            Connect with thousands of tech enthusiasts. Share your PC builds, ask questions, and stay updated with the latest hardware news in the Tamil tech community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {creatorData.socialLinks.map(link => (
              <a key={link.platform} href={link.url} target="_blank" rel="noreferrer">
                <Button variant="secondary" size="lg" className="gap-2 min-w-[140px] bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 transition-all">
                  {link.platform}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
