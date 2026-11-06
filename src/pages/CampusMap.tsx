import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CampusInteractiveMap } from '../components/map/CampusInteractiveMap';
import { MapPin, Navigation, Info, ShieldCheck, Sparkles } from 'lucide-react';
import { DemoNotice } from '../components/ui/DemoNotice';
import { useCampusCareStore } from '../store/campusCareStore';

export const CampusMap: React.FC = () => {
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get('loc');
  const { setSelectedMapLocationId } = useCampusCareStore();

  useEffect(() => {
    if (locationParam) {
      setSelectedMapLocationId(locationParam);
    }
  }, [locationParam, setSelectedMapLocationId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-campus-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-campus-mint text-campus-forest border border-campus-green/20 mb-2">
            <Navigation className="w-3 h-3" />
            Live Simulated Wayfinding
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-campus-forest tracking-tight font-sans">
            Campus Resource Map
          </h1>
          <p className="text-sm text-campus-charcoal-muted mt-1 max-w-xl">
            Locate libraries, student lounges, emergency first aid rooms, print kiosks, and residential hubs across all university quads.
          </p>
        </div>

        <DemoNotice variant="pill" />
      </div>

      {/* Interactive Map Component */}
      <CampusInteractiveMap initialLocationId={locationParam} />

      {/* Helpful Campus Tips & Protocol Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-campus-border space-y-1.5">
          <div className="font-bold text-campus-forest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-campus-green" />
            <span>Blue Light Safety Poles</span>
          </div>
          <p className="text-campus-charcoal-muted leading-relaxed">
            Emergency towers are spaced along lit walkways every 100 meters. Pressing the red button directly triggers the 24/7 Campus Security Dispatch.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-campus-border space-y-1.5">
          <div className="font-bold text-campus-forest flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-campus-green" />
            <span>Accessible Campus Paths</span>
          </div>
          <p className="text-campus-charcoal-muted leading-relaxed">
            All buildings marked on this map feature step-free automatic entrances, elevators, and ADA-compliant accessible restrooms.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-campus-border space-y-1.5">
          <div className="font-bold text-campus-forest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-campus-green" />
            <span>Simulated Prototyping</span>
          </div>
          <p className="text-campus-charcoal-muted leading-relaxed">
            Distances and walking times are based on the central campus quad. Select any building pin to see all supplies and services housed inside.
          </p>
        </div>
      </div>
    </div>
  );
};

