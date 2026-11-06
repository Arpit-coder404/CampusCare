import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, MapPin, Layers, LifeBuoy, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-campus-forest text-white/90 pt-16 pb-12 mt-20 border-t border-campus-forest-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Vision */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-campus-mint text-campus-forest flex items-center justify-center font-black">
                <svg
                  className="w-4 h-4 text-campus-forest"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                CampusCare
              </span>
            </div>
            <p className="text-sm font-semibold text-campus-mint">
              "Your campus, taken care of."
            </p>
            <p className="text-xs text-white/70 max-w-md leading-relaxed">
              Whatever you need. Wherever campus takes you. CampusCare connects university students with everyday stationery, charging, health essentials, printing hubs, and vital student support across campus.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-white/60">
              <span className="w-2 h-2 rounded-full bg-campus-green" />
              <span>Simulated Prototype Mode • No external API keys needed</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-campus-mint mb-3.5">
              Campus Access
            </h3>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <Link to="/discover" className="hover:text-white flex items-center gap-2 transition-colors">
                  <Compass className="w-3.5 h-3.5 text-campus-green-light" />
                  <span>Find Essentials</span>
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-white flex items-center gap-2 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-campus-green-light" />
                  <span>Campus Resource Map</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white flex items-center gap-2 transition-colors">
                  <Layers className="w-3.5 h-3.5 text-campus-green-light" />
                  <span>Campus Services Directory</span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white flex items-center gap-2 transition-colors">
                  <LifeBuoy className="w-3.5 h-3.5 text-campus-coral" />
                  <span>Support & First Aid</span>
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-white flex items-center gap-2 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-campus-amber" />
                  <span>Report Availability</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Tools & Disclaimer */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-campus-mint mb-3.5">
              Student Utility
            </h3>
            <ul className="space-y-2.5 text-xs text-white/80 mb-4">
              <li>
                <Link to="/favorites" className="hover:text-white flex items-center gap-2 transition-colors">
                  <Heart className="w-3.5 h-3.5 text-campus-coral" />
                  <span>Saved Essentials</span>
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white flex items-center gap-2 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-campus-green-light" />
                  <span>Student Profile & Preferences</span>
                </Link>
              </li>
            </ul>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70 leading-relaxed">
              <strong>Simulated Demo Notice:</strong> Phone numbers and inventory counts in this demonstration are fictional placeholders.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} CampusCare Platform. Designed for modern university life.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Accessibility Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Student Privacy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Feedback & Data Feeds</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

