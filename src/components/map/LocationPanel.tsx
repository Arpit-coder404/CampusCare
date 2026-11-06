import React from 'react';
import { Link } from 'react-router-dom';
import { CampusLocation } from '../../types';
import { ESSENTIALS_RESOURCES } from '../../data/resources';
import { CAMPUS_SERVICES } from '../../data/services';
import { X, MapPin, Clock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { AvailabilityBadge } from '../ui/Badge';

interface LocationPanelProps {
  location: CampusLocation | null;
  onClose: () => void;
}

export const LocationPanel: React.FC<LocationPanelProps> = ({ location, onClose }) => {
  if (!location) return null;

  // Find essentials hosted at this building (primary or additional locations)
  const hostedEssentials = ESSENTIALS_RESOURCES.filter(
    (e) =>
      e.locationId === location.id ||
      e.additionalLocations?.some((loc) => loc.locationId === location.id)
  );

  // Find services hosted here
  const hostedServices = CAMPUS_SERVICES.filter((s) => s.locationId === location.id);

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-campus-border shadow-floating p-5 max-w-md w-full overflow-hidden flex flex-col max-h-[80vh]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-campus-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-campus-mint text-campus-forest border border-campus-green/20">
              {location.zone} Zone • {location.category}
            </span>
            {location.accessibleEntrance && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-campus-charcoal">
                Wheelchair Accessible
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold text-campus-forest font-sans leading-tight">
            {location.name}
          </h2>
          <p className="text-xs text-campus-grey mt-0.5">{location.building}</p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close location panel"
          className="p-1.5 text-campus-grey hover:text-campus-charcoal hover:bg-campus-ivory rounded-xl transition-colors shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Description & Operating Hours */}
      <div className="py-3 border-b border-campus-border text-xs space-y-2">
        <p className="text-campus-charcoal leading-relaxed">{location.description}</p>
        <div className="flex items-center gap-2 text-campus-forest font-semibold bg-campus-ivory p-2 rounded-xl">
          <Clock className="w-4 h-4 text-campus-green shrink-0" />
          <span>{location.openHours}</span>
        </div>
      </div>

      {/* Available Essentials & Services list */}
      <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
        {/* Essentials */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-campus-forest mb-2">
            <span>Everyday Essentials Here ({hostedEssentials.length})</span>
          </div>

          {hostedEssentials.length > 0 ? (
            <div className="space-y-2">
              {hostedEssentials.slice(0, 6).map((item) => (
                <Link
                  key={item.id}
                  to={`/essentials/${item.id}`}
                  className="flex items-center justify-between p-2 rounded-xl bg-campus-ivory/60 hover:bg-campus-mint/50 transition-colors border border-transparent hover:border-campus-green/20 group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 rounded-lg object-cover shrink-0"
                    />
                    <div className="truncate">
                      <div className="text-xs font-semibold text-campus-charcoal group-hover:text-campus-forest truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-campus-grey">
                        {item.isFreeOrLoan ? 'Free Loan' : `$${item.price?.toFixed(2)}`}
                      </div>
                    </div>
                  </div>
                  <AvailabilityBadge status={item.availability} size="sm" />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-campus-grey italic">No direct supplies recorded at this location.</p>
          )}
        </div>

        {/* Services */}
        {hostedServices.length > 0 && (
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-campus-forest mb-2">
              <span>Campus Services Located Here ({hostedServices.length})</span>
            </div>
            <div className="space-y-2">
              {hostedServices.map((svc) => (
                <Link
                  key={svc.id}
                  to={`/services?id=${svc.id}`}
                  className="p-2.5 rounded-xl bg-campus-ivory/60 hover:bg-campus-mint/50 transition-colors border border-transparent hover:border-campus-green/20 block group"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-campus-forest group-hover:underline">
                      {svc.name}
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-campus-forest" />
                  </div>
                  <p className="text-[11px] text-campus-charcoal-muted mt-0.5 line-clamp-1">
                    {svc.shortDescription}
                  </p>
                  <div className="text-[10px] text-campus-green font-semibold mt-1">
                    {svc.statusText}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-campus-border text-center">
        <Link
          to={`/discover?location=${location.id}`}
          className="text-xs font-bold text-campus-forest hover:underline inline-flex items-center gap-1"
        >
          <span>Filter all items in {location.name}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

