import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Layers,
  MapPin,
  Clock,
  Phone,
  Mail,
  Filter,
  Navigation,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { CAMPUS_SERVICES } from '../data/services';
import { CAMPUS_LOCATIONS } from '../data/locations';
import { useCampusCareStore } from '../store/campusCareStore';

export const Services: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preSelectedId = searchParams.get('id');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openNowFilter, setOpenNowFilter] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(preSelectedId);
  const { setSelectedMapLocationId, addToast } = useCampusCareStore();

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'printing', label: 'Printing & Media' },
    { id: 'medical', label: 'Medical & Health' },
    { id: 'repairs', label: 'Tech & Bike Repair' },
    { id: 'help-desk', label: 'Help Desks' },
    { id: 'supplies', label: 'Free Supplies Pantry' },
    { id: 'administrative', label: 'Administrative' },
  ];

  const filteredServices = CAMPUS_SERVICES.filter((svc) => {
    if (selectedCategory !== 'all' && svc.category !== selectedCategory) return false;
    if (openNowFilter && !svc.isOpenNow) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        svc.name.toLowerCase().includes(q) ||
        svc.shortDescription.toLowerCase().includes(q) ||
        svc.tags.some((t) => t.toLowerCase().includes(q)) ||
        svc.servicesOffered.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const activeService = CAMPUS_SERVICES.find((s) => s.id === activeServiceId);
  const activeLocation = activeService
    ? CAMPUS_LOCATIONS.find((l) => l.id === activeService.locationId)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-campus-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-campus-mint text-campus-forest border border-campus-green/20 mb-2">
            <Layers className="w-3 h-3" />
            Campus Service Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-campus-forest tracking-tight font-sans">
            Campus Services
          </h1>
          <p className="text-sm text-campus-charcoal-muted mt-1">
            Printing, medical triage, tech repairs, free pantries, and admin support across all university zones.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services (e.g. printing, medical, repairs, tech bar)..."
            className="w-full pl-4 pr-9 py-2.5 bg-white rounded-xl border border-campus-border text-sm font-medium text-campus-charcoal placeholder-campus-grey focus:outline-none focus:border-campus-forest"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-campus-grey"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-campus-charcoal cursor-pointer select-none bg-white px-3 py-2.5 rounded-xl border border-campus-border hover:bg-campus-ivory transition-colors">
          <input
            type="checkbox"
            checked={openNowFilter}
            onChange={(e) => setOpenNowFilter(e.target.checked)}
            className="accent-campus-forest rounded"
          />
          <CheckCircle2 className="w-3.5 h-3.5 text-campus-green" />
          <span>Open now only</span>
        </label>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-campus-forest text-white shadow-subtle'
                : 'bg-white text-campus-charcoal border border-campus-border hover:bg-campus-mint/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((svc) => {
          const loc = CAMPUS_LOCATIONS.find((l) => l.id === svc.locationId);
          const isActive = activeServiceId === svc.id;

          return (
            <div
              key={svc.id}
              className={`bg-white rounded-2xl border p-5 flex flex-col cursor-pointer transition-all hover:shadow-card ${
                isActive ? 'border-campus-forest shadow-card ring-2 ring-campus-mint' : 'border-campus-border hover:border-campus-green/40'
              }`}
              onClick={() => setActiveServiceId(isActive ? null : svc.id)}
            >
              {/* Card Top */}
              <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-campus-ivory mb-4">
                <img
                  src={svc.image}
                  alt={svc.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/95 text-campus-forest shadow-2xs">
                  {svc.category}
                </span>
                <span
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    svc.isOpenNow
                      ? 'bg-campus-mint text-campus-forest border border-campus-green/30'
                      : 'bg-campus-coral-light text-campus-coral border border-campus-coral/20'
                  }`}
                >
                  {svc.isOpenNow ? 'Open' : 'Closed'}
                </span>
              </div>

              {/* Core Info */}
              <h3 className="font-bold text-sm text-campus-charcoal leading-snug mb-1">
                {svc.name}
              </h3>
              <p className="text-xs text-campus-charcoal-muted line-clamp-2 leading-relaxed">
                {svc.shortDescription}
              </p>

              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-campus-charcoal">
                  <MapPin className="w-3.5 h-3.5 text-campus-green shrink-0" />
                  <span className="truncate">{loc?.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-campus-grey">
                  <Clock className="w-3.5 h-3.5 text-campus-grey shrink-0" />
                  <span className="line-clamp-1">{svc.hours}</span>
                </div>
                <div className="text-campus-green font-semibold text-[11px]">
                  {svc.statusText}
                </div>
              </div>

              {/* Expandable Service Details */}
              {isActive && (
                <div className="mt-4 pt-4 border-t border-campus-border space-y-4 animate-in fade-in">
                  <p className="text-xs text-campus-charcoal-muted leading-relaxed">
                    {svc.description}
                  </p>

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-campus-grey mb-1.5">
                      Services Offered:
                    </div>
                    <ul className="space-y-1">
                      {svc.servicesOffered.map((offer, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-1.5 text-xs text-campus-charcoal"
                        >
                          <CheckCircle2 className="w-3 h-3 text-campus-green shrink-0 mt-0.5" />
                          <span>{offer}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Details */}
                  <div className="p-3 rounded-xl bg-campus-ivory border border-campus-border space-y-1.5 text-xs">
                    {svc.contactPhone && (
                      <div className="flex items-center gap-2 font-mono font-bold text-campus-forest">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{svc.contactPhone}</span>
                      </div>
                    )}
                    {svc.contactEmail && (
                      <div className="flex items-center gap-2 text-campus-charcoal-muted truncate">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{svc.contactEmail}</span>
                      </div>
                    )}
                    <p className="text-[10px] text-campus-grey italic">
                      Demo contact details — simulated prototype environment.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMapLocationId(svc.locationId);
                        window.location.href = '/map';
                      }}
                      className="flex-1 py-2 rounded-xl bg-campus-forest text-white text-xs font-bold hover:bg-campus-forest-dark transition-all flex items-center justify-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>View on Map</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveServiceId(null);
                      }}
                      className="px-3 py-2 rounded-xl bg-campus-ivory text-campus-charcoal text-xs font-bold border border-campus-border"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <p className="text-sm font-bold text-campus-charcoal">No services match your filters.</p>
          <p className="text-xs text-campus-grey">Try adjusting the category, search terms, or "open now" filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setOpenNowFilter(false);
            }}
            className="px-4 py-2 rounded-xl bg-campus-forest text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

