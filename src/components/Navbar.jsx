import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Videos', path: '/videos' },
    { name: 'Community', path: '/community' },
    { name: 'Connect', path: '/connect' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-2' : 'bg-transparent border-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 group outline-none">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:scale-105 transition-transform duration-300 group-hover:bg-blue-500/20">
              <Play className="w-5 h-5 text-blue-500 fill-blue-500 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">A2D</span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm font-semibold transition-colors duration-300 hover:text-blue-400 outline-none ${
                    isActive ? 'text-blue-500' : 'text-zinc-300'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-blue-500 rounded-full animate-[fadeInSlideUp_0.3s_ease-out_forwards]"></span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-300 hover:text-white bg-zinc-900/50 rounded-lg border border-zinc-800 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {isOpen ? <X className="w-5 h-5 animate-[fadeInSlideUp_0.2s_ease-out_forwards]" /> : <Menu className="w-5 h-5 animate-[fadeInSlideUp_0.2s_ease-out_forwards]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 px-4 py-4 space-y-2">
          {links.map((link, index) => (
            <div key={link.name} style={{ transitionDelay: `${index * 50}ms` }} className={`transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white border border-transparent'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
