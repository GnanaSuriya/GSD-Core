import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, LogOut, Search, Users, Clock, Video, Lock, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin';

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch('/api/admin/submissions', {
        headers: {
          'Authorization': `Bearer ${passwordInput}`
        }
      });
      
      const result = await response.json();

      if (!response.ok) {
        setFetchError(result.error || { message: 'Unknown error occurred' });
      } else {
        setSubmissions(result.data || []);
      }
    } catch (err) {
      setFetchError({ message: err.message || 'Failed to fetch from backend API' });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      const q = searchQuery.toLowerCase();
      return (
        (sub.name && sub.name.toLowerCase().includes(q)) ||
        (sub.email && sub.email.toLowerCase().includes(q)) ||
        (sub.favorite_video && sub.favorite_video.toLowerCase().includes(q))
      );
    });
  }, [submissions, searchQuery]);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="w-full bg-zinc-950 min-h-screen flex items-center justify-center p-4">
        <Reveal>
          <div className="w-full max-w-md">
            <Link to="/" className="inline-block mb-8 text-zinc-500 hover:text-white transition-colors text-sm font-medium">
              &larr; Back to Home
            </Link>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-blue-500 mb-6 shadow-xl">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight mb-2">A2D COMMUNITY ADMIN</h1>
              <p className="text-zinc-400">View community submissions</p>
            </div>
            
            <Card className="bg-zinc-900/50 backdrop-blur-xl border-zinc-800">
              <CardContent className="p-8">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                      Admin Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <Input
                        type="password"
                        placeholder="Enter admin password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="w-full pl-12 h-14 bg-zinc-950 border-zinc-800 text-white rounded-xl focus:border-blue-500"
                        autoFocus
                      />
                    </div>
                    {loginError && <p className="text-red-400 text-sm mt-2 font-medium">{loginError}</p>}
                  </div>
                  
                  <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">
                    LOGIN
                  </Button>

                  <div className="pt-4 border-t border-zinc-800/50 text-center">
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      This is a simple demo gate using environment variables. 
                      Not intended for true production authentication.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </Reveal>
      </div>
    );
  }

  // Dashboard Metrics
  const totalSubmissions = submissions.length;
  const latestSubmission = submissions.length > 0 ? new Date(submissions[0].created_at).toLocaleDateString() : 'N/A';
  const favoriteVideosCount = submissions.filter(s => s.favorite_video).length;

  return (
    <div className="w-full bg-zinc-950 min-h-screen pb-32 text-slate-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal>
          <div className="mb-6">
            <Link to="/" className="inline-block text-zinc-500 hover:text-white transition-colors text-sm font-medium">
              &larr; Back to Home
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-900 pb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">A2D COMMUNITY</h1>
              <p className="text-xl text-zinc-400">Community submissions</p>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline"
              className="border-zinc-800 text-zinc-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 gap-2 h-12 px-6 rounded-xl"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </Reveal>

        {/* Summary Cards */}
        <Reveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-zinc-900/40 border-zinc-800 rounded-2xl">
              <CardContent className="p-6 flex items-center gap-6">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-400 mb-1">TOTAL SUBMISSIONS</p>
                  <p className="text-3xl font-black text-white">{isLoading ? '-' : totalSubmissions}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900/40 border-zinc-800 rounded-2xl">
              <CardContent className="p-6 flex items-center gap-6">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-400 mb-1">LATEST SUBMISSION</p>
                  <p className="text-3xl font-black text-white">{isLoading ? '-' : latestSubmission}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/40 border-zinc-800 rounded-2xl">
              <CardContent className="p-6 flex items-center gap-6">
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-400 mb-1">FAVORITE VIDEOS</p>
                  <p className="text-3xl font-black text-white">{isLoading ? '-' : favoriteVideosCount}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Reveal>

        {/* Error / Warning State */}
        {fetchError || (!isLoading && totalSubmissions === 0) ? (
          <Reveal delay={200}>
            <div className="mb-12 bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {fetchError ? 'Error Loading Submissions' : 'No Submissions Found'}
                  </h3>
                  
                  {fetchError && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-4">
                      <p className="text-red-400 font-mono text-sm mb-2 font-bold">
                        Error Details:
                      </p>
                      <ul className="text-red-400 font-mono text-xs space-y-1 list-disc pl-4">
                        <li><span className="font-semibold text-red-300">Message:</span> {fetchError.message || 'N/A'}</li>
                        <li><span className="font-semibold text-red-300">Code:</span> {fetchError.code || 'N/A'}</li>
                        {fetchError.details && <li><span className="font-semibold text-red-300">Details:</span> {fetchError.details}</li>}
                        {fetchError.hint && <li><span className="font-semibold text-red-300">Hint:</span> {fetchError.hint}</li>}
                      </ul>
                    </div>
                  )}

                  {(!fetchError && totalSubmissions === 0) && (
                    <p className="text-zinc-300 mb-6 text-lg">
                      No community submissions have been made yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ) : null}

        {/* Submissions Table Section */}
        <Reveal delay={200}>
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 md:p-8 border-b border-zinc-800 flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-900/80">
              <h2 className="text-2xl font-bold">All Submissions</h2>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  type="text"
                  placeholder="Search submissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 h-10 bg-zinc-950 border-zinc-800 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-12 text-center text-zinc-500 flex flex-col items-center justify-center gap-4">
                  <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                  <p className="font-medium">Loading submissions...</p>
                </div>
              ) : filteredSubmissions.length > 0 ? (
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-950 text-zinc-400 font-medium uppercase tracking-wider text-xs">
                    <tr>
                      <th className="px-6 py-4 border-b border-zinc-800">#</th>
                      <th className="px-6 py-4 border-b border-zinc-800">Name</th>
                      <th className="px-6 py-4 border-b border-zinc-800">Email</th>
                      <th className="px-6 py-4 border-b border-zinc-800">Favorite Video</th>
                      <th className="px-6 py-4 border-b border-zinc-800">Message</th>
                      <th className="px-6 py-4 border-b border-zinc-800">Submitted On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {filteredSubmissions.map((sub, index) => (
                      <tr key={sub.id || index} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4 text-zinc-500 font-mono">{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-white">{sub.name || '-'}</td>
                        <td className="px-6 py-4 text-zinc-400">{sub.email || '-'}</td>
                        <td className="px-6 py-4 text-zinc-300 max-w-xs truncate" title={sub.favorite_video}>{sub.favorite_video || '-'}</td>
                        <td className="px-6 py-4 text-zinc-400 max-w-md truncate" title={sub.message}>{sub.message || '-'}</td>
                        <td className="px-6 py-4 text-zinc-500 whitespace-nowrap">
                          {sub.created_at ? new Date(sub.created_at).toLocaleString() : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : !fetchError && totalSubmissions > 0 ? (
                <div className="p-12 text-center text-zinc-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="font-medium text-lg text-zinc-400 mb-2">No results found</p>
                  <p>No submissions match "{searchQuery}"</p>
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
