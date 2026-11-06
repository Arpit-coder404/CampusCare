import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  LifeBuoy,
  Printer,
  Sparkles,
  Zap,
  Shield,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Clock,
  Layers,
  Search,
  BookOpen,
} from 'lucide-react';
import { GlobalSearch } from '../components/search/GlobalSearch';
import { ResourceCard } from '../components/resources/ResourceCard';
import { ESSENTIALS_RESOURCES } from '../data/resources';
import { CAMPUS_SERVICES } from '../data/services';
import { SUPPORT_RESOURCES } from '../data/support';
import { CAMPUS_LOCATIONS } from '../data/locations';
import { DemoNotice } from '../components/ui/DemoNotice';

export const Home: React.FC = () => {
  // Select signature "Need it now?" items (chargers, first aid, menstrual pads, umbrellas, notebooks, calculators)
  const needItNowItems = ESSENTIALS_RESOURCES.filter((r) => r.urgentNeed).slice(0, 6);

  // Signature featured campus services
  const featuredServices = CAMPUS_SERVICES.slice(0, 4);

  // Emergency & urgent support quick items
  const urgentSupportItems = SUPPORT_RESOURCES.filter((s) => s.isUrgent).slice(0, 4);

  const categories = [
    {
      name: 'Everyday Essentials',
      category: 'stationery',
      icon: BookOpen,
      desc: 'Pens, notebooks, study gear',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
      path: '/discover?category=stationery',
    },
    {
      name: 'Power & Tech Loans',
      category: 'chargers',
      icon: Zap,
      desc: 'USB-C 65W, adapters, batteries',
      color: 'bg-amber-50 text-amber-900 border-amber-200/60',
      path: '/discover?category=chargers',
    },
    {
      name: 'Health & First Aid',
      category: 'first-aid',
      icon: LifeBuoy,
      desc: 'Bandages, pain relief, eye drops',
      color: 'bg-rose-50 text-rose-800 border-rose-200/60',
      path: '/discover?category=first-aid',
    },
    {
      name: 'Hygiene & Care',
      category: 'hygiene',
      icon: Sparkles,
      desc: 'Free pads, tampons, dental kits',
      color: 'bg-teal-50 text-teal-800 border-teal-200/60',
      path: '/discover?category=hygiene',
    },
    {
      name: 'Printing & Copies',
      category: 'printing',
      icon: Printer,
      desc: '24/7 webprint, posters, thesis',
      color: 'bg-sky-50 text-sky-800 border-sky-200/60',
      path: '/services?category=printing',
    },
    {
      name: 'Student Support',
      category: 'support',
      icon: HeartHandshake,
      desc: 'Safe walk, food pantry, crisis',
      color: 'bg-indigo-50 text-indigo-800 border-indigo-200/60',
      path: '/support',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-radial from-[#F1F6F2] via-[#F8F7F2] to-[#F3F6F1] border border-campus-border p-6 sm:p-12 lg:p-16">
          {/* Subtle Decorative Campus Geometry */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-campus-mint/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-campus-amber-light/50 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-campus-border shadow-2xs text-[11px] sm:text-xs font-bold uppercase tracking-widest text-campus-forest font-sans">
              <span className="w-2 h-2 rounded-full bg-campus-green" />
              THE SMART CAMPUS ESSENTIALS NETWORK
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-campus-forest tracking-tight font-sans leading-[1.1]">
              Campus life, <br />
              <span className="text-campus-charcoal font-serif italic font-normal">made a little easier.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-campus-charcoal-muted max-w-xl mx-auto leading-relaxed">
              Find the essentials, services, and support you need—right when you need them. From emergency phone chargers to 24/7 printing and first aid stations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/discover"
                className="px-6 py-3 rounded-2xl bg-campus-forest text-white font-bold text-sm hover:bg-campus-forest-dark shadow-subtle hover:shadow-card transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-campus-mint" />
                <span>Find Essentials</span>
              </Link>
              <Link
                to="/map"
                className="px-6 py-3 rounded-2xl bg-white text-campus-charcoal font-bold text-sm hover:bg-campus-ivory border border-campus-border shadow-2xs transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-campus-forest" />
                <span>Explore Campus Map</span>
              </Link>
            </div>
          </div>

          {/* Signature Search Bar Box */}
          <div className="mt-10 sm:mt-12 relative z-10">
            <GlobalSearch largeHero placeholder="What do you need right now? (e.g. charger, umbrella, printing...)" />
          </div>

          {/* Floating Campus Preview Strip */}
          <div className="mt-12 pt-8 border-t border-campus-border/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="bg-white/70 p-3.5 rounded-2xl border border-campus-border/60">
              <div className="text-[11px] font-bold uppercase text-campus-grey">Locations Tracked</div>
              <div className="text-lg font-extrabold text-campus-forest mt-0.5">12 Hubs</div>
              <div className="text-[11px] text-campus-charcoal-muted">Library, Student Union, Quads</div>
            </div>
            <div className="bg-white/70 p-3.5 rounded-2xl border border-campus-border/60">
              <div className="text-[11px] font-bold uppercase text-campus-grey">Student Essentials</div>
              <div className="text-lg font-extrabold text-campus-forest mt-0.5">32 Items</div>
              <div className="text-[11px] text-campus-charcoal-muted">Chargers, pads, calculators</div>
            </div>
            <div className="bg-white/70 p-3.5 rounded-2xl border border-campus-border/60">
              <div className="text-[11px] font-bold uppercase text-campus-grey">Campus Services</div>
              <div className="text-lg font-extrabold text-campus-forest mt-0.5">12 Desks</div>
              <div className="text-[11px] text-campus-charcoal-muted">Printing, tech bar, pantries</div>
            </div>
            <div className="bg-white/70 p-3.5 rounded-2xl border border-campus-border/60">
              <div className="text-[11px] font-bold uppercase text-campus-grey">Data Status</div>
              <div className="text-lg font-extrabold text-campus-green mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-campus-green animate-pulse" />
                Simulated
              </div>
              <div className="text-[11px] text-campus-charcoal-muted">Demo prototype environment</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-campus-forest tracking-tight font-sans">
              Quick Categories
            </h2>
            <p className="text-xs sm:text-sm text-campus-charcoal-muted mt-1">
              Select a category to view instant campus availability.
            </p>
          </div>
          <Link
            to="/discover"
            className="text-xs font-bold text-campus-forest hover:underline flex items-center gap-1"
          >
            <span>Browse complete catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={cat.path}
                className="group bg-white p-4 rounded-2xl border border-campus-border hover:border-campus-green/50 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${cat.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-campus-charcoal group-hover:text-campus-forest transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-campus-grey mt-1 line-clamp-1">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-campus-border/40 flex items-center justify-between text-[11px] font-semibold text-campus-forest">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. SIGNATURE SECTION: NEED IT NOW? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-campus-coral-light text-campus-coral border border-campus-coral/20 mb-2">
              <Zap className="w-3 h-3" />
              High Urgency Essentials
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-campus-forest tracking-tight font-sans">
              Need it now?
            </h2>
            <p className="text-xs sm:text-sm text-campus-charcoal-muted mt-1">
              Find the closest available option for what you need right now.
            </p>
          </div>
          <Link
            to="/discover?urgent=true"
            className="text-xs font-bold text-campus-forest hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View all immediate essentials ({ESSENTIALS_RESOURCES.filter((r) => r.urgentNeed).length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {needItNowItems.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      {/* 4. NEARBY CAMPUS SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-campus-forest tracking-tight font-sans">
              Nearby Campus Services
            </h2>
            <p className="text-xs sm:text-sm text-campus-charcoal-muted mt-1">
              Everyday printing, health rooms, repair stands, and help desks.
            </p>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold text-campus-forest hover:underline flex items-center gap-1"
          >
            <span>View all 12 campus services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredServices.map((service) => {
            const loc = CAMPUS_LOCATIONS.find((l) => l.id === service.locationId);
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-campus-border p-4 flex flex-col justify-between hover:shadow-card hover:border-campus-green/40 transition-all group"
              >
                <div>
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-3 bg-campus-ivory">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/95 text-campus-forest shadow-2xs">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-campus-charcoal group-hover:text-campus-forest transition-colors line-clamp-1">
                    {service.name}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-campus-grey mt-1">
                    <MapPin className="w-3.5 h-3.5 text-campus-green shrink-0" />
                    <span className="truncate">{loc?.name || 'Campus Building'}</span>
                  </div>

                  <p className="text-xs text-campus-charcoal-muted mt-2 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-campus-border/70 flex items-center justify-between text-xs">
                  <div className="text-[11px] font-semibold text-campus-green truncate">
                    {service.statusText.split('•')[0]}
                  </div>
                  <Link
                    to={`/services?id=${service.id}`}
                    className="p-1.5 px-2.5 rounded-xl bg-campus-ivory hover:bg-campus-forest hover:text-white text-campus-charcoal font-bold transition-all flex items-center gap-1 text-[11px]"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. INTERACTIVE MAP TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-campus-forest rounded-3xl p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-campus-mint border border-white/20">
              <MapPin className="w-3 h-3 text-campus-mint" />
              Interactive Resource Geography
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
              Find where everything is on campus in real time.
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Never wander from hall to hall wondering where the nearest working printer, free menstrual supply dispenser, or study charger is. Explore all 12 zones and buildings on our interactive map.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/map"
                className="px-5 py-2.5 rounded-xl bg-campus-mint text-campus-forest font-bold text-xs hover:bg-white transition-all shadow-subtle flex items-center gap-2"
              >
                <span>Open Campus Map</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/discover"
                className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 border border-white/20 transition-all flex items-center gap-2"
              >
                <span>Filter by Building</span>
              </Link>
            </div>
          </div>

          {/* Mini stylized visual card */}
          <div className="w-full lg:w-96 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 space-y-3 shrink-0">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
              <span className="font-bold text-campus-mint">Popular Zones Right Now</span>
              <span className="text-[10px] text-white/70">Demo Data</span>
            </div>
            {[
              { name: 'Du Bois Main Library', status: '24/7 • High Stock', zone: 'Central' },
              { name: 'Student Centre (The Nest)', status: 'Free Pantry Open', zone: 'Central' },
              { name: 'Health & Wellness Pavilion', status: 'Nurse on Duty', zone: 'West' },
            ].map((z, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5">
                <div>
                  <div className="font-semibold text-white">{z.name}</div>
                  <div className="text-[10px] text-campus-mint">{z.status}</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold text-white/90">
                  {z.zone}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. URGENT EMERGENCY & STUDENT SUPPORT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF3F1] border border-campus-coral/20 rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-campus-coral text-white mb-2">
                <LifeBuoy className="w-3 h-3" />
                Urgent Campus Support
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-campus-charcoal tracking-tight font-sans">
                Need urgent help?
              </h2>
              <p className="text-xs sm:text-sm text-campus-charcoal-muted mt-1">
                Find the right campus support resource quickly and calmly.
              </p>
            </div>
            <Link
              to="/support"
              className="px-4 py-2 rounded-xl bg-campus-coral text-white font-bold text-xs hover:bg-[#C24E43] transition-all shadow-subtle flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>All Support Hotlines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {urgentSupportItems.map((sup) => (
              <div
                key={sup.id}
                className="bg-white rounded-2xl border border-campus-coral/20 p-4 flex flex-col justify-between shadow-2xs hover:shadow-subtle transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-campus-coral-light text-campus-coral">
                      {sup.category}
                    </span>
                    <span className="text-[10px] text-campus-grey">{sup.hours.split('|')[0]}</span>
                  </div>
                  <h3 className="font-bold text-sm text-campus-charcoal leading-snug">
                    {sup.name}
                  </h3>
                  <p className="text-xs text-campus-charcoal-muted mt-1.5 line-clamp-2">
                    {sup.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-campus-border text-xs space-y-1.5">
                  <div className="font-mono text-xs font-bold text-campus-coral">
                    {sup.phone}
                  </div>
                  <div className="text-[11px] text-campus-grey truncate">
                    {sup.locationName}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-campus-coral/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-campus-charcoal-muted">
            <span className="italic">
              * Note: Phone numbers above are simulated demonstration contacts for testing navigation.
            </span>
            <Link to="/support" className="font-bold text-campus-coral hover:underline">
              View urgent safety protocol & guidelines →
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Notice footer element */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DemoNotice />
      </section>
    </div>
  );
};

