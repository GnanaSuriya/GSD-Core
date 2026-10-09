export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-zinc-400 text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Creator Fan Page. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
          <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Terms of Service</a>
          <a href="/admin" className="text-zinc-700 hover:text-blue-500 transition-colors text-sm ml-4">Admin Access</a>
        </div>
      </div>
    </footer>
  );
}
