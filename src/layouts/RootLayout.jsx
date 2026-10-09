import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-slate-50">
      <Navbar />
      <main className="flex-grow">
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
