import { useState } from 'react';
import { Users, MessageSquare, Cpu, Heart, CheckCircle2, ChevronRight, Globe, ShieldCheck, Video } from 'lucide-react';
import Section from '../components/ui/Section';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { creatorData } from '../data/creator';
import Reveal from '../components/ui/Reveal';
import { supabase } from '../lib/supabase';

export default function Community() {
  const [formState, setFormState] = useState('idle'); // idle | submitting | success | duplicate | error
  const [errorMessage, setErrorMessage] = useState(''); // store the actual error message
  const [focusedField, setFocusedField] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    favoriteVideo: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');
    
    try {
      const { error } = await supabase
        .from('community_members')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            favorite_video: formData.favoriteVideo,
            message: formData.message 
          }
        ]);

      if (error) {
        // Handle duplicate email (unique constraint violation)
        if (error.code === '23505') {
          setFormState('duplicate');
        } else {
          console.error("Supabase Error:", error.message, "Code:", error.code, "Details:", error.details, "Hint:", error.hint);
          setErrorMessage(`${error.message} (Code: ${error.code})`);
          setFormState('error');
        }
      } else {
        setFormState('success');
      }
    } catch (err) {
      console.error("Catch Error:", err);
      setErrorMessage(err.message || 'Unknown error');
      setFormState('error');
    }
  };

  const values = [
    {
      icon: <Cpu className="w-8 h-8 text-blue-500" />,
      title: "Hardware Enthusiasts",
      description: "From budget setups to extreme custom loops, we share a deep passion for PC hardware and builds."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
      title: "Knowledge Sharing",
      description: "We believe in explaining complex technical jargon in clear, easy-to-understand Tamil."
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-500" />,
      title: "Honest Feedback",
      description: "A community built on trust. We value honest opinions and critical analysis of tech products."
    }
  ];

  return (
    <div className="w-full bg-zinc-950 text-slate-50 min-h-screen pb-32">
      
      {/* SECTION 1 - HERO */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-40 mix-blend-overlay"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-blue-500/10 text-blue-500 mb-8 border border-blue-500/20 shadow-[0_0_40px_rgba(37,99,235,0.2)]">
              <Users className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">A2D ARMY</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-3xl mx-auto font-medium">
              More than just subscribers. We are a collective of tech lovers, gamers, and builders pushing the boundaries of Tamil tech content.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 - WHY JOIN / VALUES */}
      <Section className="py-32 bg-zinc-900/20">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Why Connect With Us?</h2>
            <p className="text-zinc-400 text-lg">The core values that make our community special.</p>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((val, idx) => (
            <Reveal key={idx} delay={idx * 200} direction="up">
              <Card className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/50 h-full rounded-3xl">
                <CardContent className="p-10 text-center flex flex-col items-center h-full">
                  <div className="mb-8 p-4 bg-zinc-950 rounded-2xl border border-zinc-800 inline-flex shadow-inner">
                    {val.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{val.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-lg">{val.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 3 - INTERACTIVE SIGNUP FORM */}
      <Section className="py-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <Reveal direction="left">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Become part of the story.
              </h2>
              <p className="text-xl text-zinc-400 leading-relaxed">
                Whether you are planning your first PC build, troubleshooting an issue, or just want to discuss the latest tech news, there is a place for you here.
              </p>
              
              <ul className="space-y-6">
                {[
                  { icon: <Globe className="w-5 h-5 text-blue-400"/>, text: "Share your custom PC builds with thousands" },
                  { icon: <MessageSquare className="w-5 h-5 text-blue-400"/>, text: "Discuss hardware reviews and latest benchmarks" },
                  { icon: <ShieldCheck className="w-5 h-5 text-blue-400"/>, text: "Participate in exclusive Q&A sessions" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-medium text-zinc-300">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      {item.icon}
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal direction="right" delay={200}>
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] border border-zinc-800 p-8 md:p-12 relative overflow-hidden shadow-2xl">
              {/* Subtle background glow for form */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              {formState === 'success' ? (
                <div className="py-16 text-center animate-[fadeInSlideUp_0.5s_ease-out_forwards]">
                  <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">You're all set!</h3>
                  <p className="text-zinc-400 text-lg mb-8">Thanks for connecting with the A2D community. We'll keep you updated.</p>
                  <a href={creatorData.socialLinks.find(l=>l.platform==='YouTube')?.url} target="_blank" rel="noreferrer">
                    <Button className="rounded-full px-8 h-12 bg-zinc-800 hover:bg-zinc-700 w-full sm:w-auto">
                      Go to YouTube Channel
                    </Button>
                  </a>
                </div>
              ) : formState === 'duplicate' ? (
                <div className="py-16 text-center animate-[fadeInSlideUp_0.5s_ease-out_forwards]">
                  <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                    <Users className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">You're already on the list.</h3>
                  <p className="text-zinc-400 text-lg mb-8">It looks like you've already signed up for updates with this email address.</p>
                  <Button onClick={() => setFormState('idle')} className="rounded-full px-8 h-12 bg-zinc-800 hover:bg-zinc-700 w-full sm:w-auto">
                    Go Back
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <div className="mb-8">
                    <h3 className="text-3xl font-black tracking-tight mb-2">STAY CONNECTED</h3>
                    <p className="text-zinc-400">Sign up for A2D updates, new content and community announcements.</p>
                  </div>
                  
                  <div className="space-y-5">
                    <div className={`transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.02] transform' : ''}`}>
                      <label className="block text-sm font-bold text-zinc-400 mb-2 ml-1 uppercase tracking-wider">Name</label>
                      <Input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        placeholder="What should we call you?"
                        className="w-full h-14 bg-zinc-950/50 border-zinc-800 focus:border-blue-500 rounded-2xl px-5 text-lg"
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    
                    <div className={`transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02] transform' : ''}`}>
                      <label className="block text-sm font-bold text-zinc-400 mb-2 ml-1 uppercase tracking-wider">Email</label>
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        placeholder="your@email.com"
                        className="w-full h-14 bg-zinc-950/50 border-zinc-800 focus:border-blue-500 rounded-2xl px-5 text-lg"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    
                    <div className={`transition-all duration-300 ${focusedField === 'favoriteVideo' ? 'scale-[1.02] transform' : ''}`}>
                      <label className="block text-sm font-bold text-zinc-400 mb-2 ml-1 uppercase tracking-wider flex items-center gap-2">
                        <Video className="w-4 h-4"/> Favorite Video
                      </label>
                      <Input 
                        type="text" 
                        name="favoriteVideo"
                        value={formData.favoriteVideo}
                        onChange={handleChange}
                        placeholder="What's your favorite A2D video?"
                        className="w-full h-14 bg-zinc-950/50 border-zinc-800 focus:border-blue-500 rounded-2xl px-5 text-lg"
                        onFocus={() => setFocusedField('favoriteVideo')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    
                    <div className={`transition-all duration-300 ${focusedField === 'message' ? 'scale-[1.02] transform' : ''}`}>
                      <label className="block text-sm font-bold text-zinc-400 mb-2 ml-1 uppercase tracking-wider">Optional Message</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any thoughts or feedback?"
                        className="w-full h-32 bg-zinc-950/50 border border-zinc-800 focus:border-blue-500 rounded-2xl px-5 py-4 text-lg outline-none resize-none transition-colors"
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                      ></textarea>
                    </div>
                  </div>

                  {formState === 'error' && (
                    <div className="text-red-400 text-sm font-semibold bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                      An error occurred: {errorMessage || 'Please try again.'}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={formState === 'submitting'}
                    className="w-full h-16 mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all disabled:opacity-70 group"
                  >
                    {formState === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 w-full">
                        GET UPDATES
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                  
                  <div className="text-center pt-2">
                    <p className="text-xs text-zinc-500 font-medium">Fan-made community project. No payment required.</p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
