import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Layers,
  Heart,
  User,
  Search,
  LifeBuoy,
  Menu,
  X,
  FilePlus2,
  Sparkles,
} from 'lucide-react';
import { useCampusCareStore } from '../../store/campusCareStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites } = useCampusCareStore();

  const navLinks = [
    { label: 'Discover', path: '/discover', icon: Compass },
    { label: 'Campus Map', path: '/map', icon: MapPin },
    { label: 'Services', path: '/services', icon: Layers },
    { label: 'Support', path: '/support', icon: LifeBuoy, urgentHighlight: true },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-campus-ivory/90 backdrop-blur-md border-b border-campus-border transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-9 h-9 rounded-xl bg-campus-forest text-white flex items-center justify-center shadow-subtle group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg font-sans tracking-tight text-campus-forest flex items-center gap-1.5">
                CampusCare
                <span className="w-1.5 h-1.5 rounded-full bg-campus-green inline-block" />
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-campus-grey -mt-1 hidden sm:block">
                Essentials & Support
              </span>
            </div>
          </Link>

          {/* Centre: Main Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-white/70 px-2 py-1.5 rounded-full border border-campus-border/80 shadow-subtle">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-campus-forest text-white shadow-subtle'
                      : 'text-campus-charcoal hover:text-campus-forest hover:bg-campus-mint/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-campus-grey'}`} />
                  <span>{link.label}</span>
                  {link.urgentHighlight && !active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-campus-coral inline-block ml-0.5" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search, Favorites, Report, Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Link
              to="/discover"
              className="p-2 rounded-xl text-campus-charcoal hover:text-campus-forest hover:bg-white border border-transparent hover:border-campus-border transition-all md:flex items-center gap-1.5 text-xs font-semibold px-2.5"
              title="Search essentials"
            >
              <Search className="w-4 h-4 text-campus-forest" />
              <span className="hidden xl:inline text-campus-grey">Find</span>
            </Link>

            <Link
              to="/favorites"
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                isActive('/favorites')
                  ? 'bg-campus-forest text-white border-campus-forest'
                  : 'bg-white text-campus-charcoal hover:bg-campus-mint/40 border-campus-border'
              }`}
              title="Saved items"
            >
              <Heart
                className={`w-4 h-4 ${
                  isActive('/favorites')
                    ? 'text-white fill-white'
                    : favorites.length > 0
                    ? 'text-campus-coral fill-campus-coral'
                    : 'text-campus-grey'
                }`}
              />
              <span className="hidden sm:inline">Saved</span>
              {favorites.length > 0 && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold leading-none ${
                    isActive('/favorites')
                      ? 'bg-white text-campus-forest'
                      : 'bg-campus-coral text-white'
                  }`}
                >
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              to="/report"
              className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                isActive('/report')
                  ? 'bg-campus-forest text-white border-campus-forest'
                  : 'bg-white text-campus-charcoal hover:bg-campus-mint/40 border-campus-border'
              }`}
              title="Report item availability"
            >
              <FilePlus2 className="w-3.5 h-3.5 text-campus-forest" />
              <span>Report</span>
            </Link>

            <Link
              to="/profile"
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isActive('/profile')
                  ? 'bg-campus-forest text-white border-campus-forest'
                  : 'bg-white text-campus-charcoal hover:bg-campus-mint/40 border-campus-border'
              }`}
              title="Student Profile"
            >
              <div className="w-6 h-6 rounded-full bg-campus-mint text-campus-forest flex items-center justify-center font-bold text-[11px]">
                AR
              </div>
              <span className="hidden lg:inline text-xs">Alex</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white border border-campus-border text-campus-charcoal hover:text-campus-forest transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-campus-ivory border-b border-campus-border px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold border ${
                      active
                        ? 'bg-campus-forest text-white border-campus-forest'
                        : 'bg-white text-campus-charcoal border-campus-border'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-campus-forest'}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                to="/report"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white text-campus-charcoal border border-campus-border text-xs font-semibold"
              >
                <FilePlus2 className="w-4 h-4 text-campus-forest" />
                <span>Report Availability</span>
              </Link>
              <Link
                to="/support"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-campus-coral-light text-campus-coral border border-campus-coral/30 text-xs font-semibold"
              >
                <LifeBuoy className="w-4 h-4 text-campus-coral" />
                <span>Emergency Help</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Emergency Strip (Restrained, elegant, non-intrusive) */}
      <div className="bg-campus-forest text-white text-[11px] py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-campus-coral animate-ping" />
        <span className="font-medium text-white/90">
          Campus Urgent Help:
        </span>
        <span className="text-white/80">Need immediate emergency support or security escort?</span>
        <Link
          to="/support"
          className="underline font-bold text-campus-amber hover:text-white transition-colors ml-1"
        >
          View Campus Support →
        </Link>
      </div>
    </>
  );
};

