import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Resource } from '../../types';
import { CAMPUS_LOCATIONS } from '../../data/locations';
import { AvailabilityBadge } from '../ui/Badge';
import { useCampusCareStore } from '../../store/campusCareStore';

interface ResourceCardProps {
  resource: Resource;
  compact?: boolean;
  className?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  compact = false,
  className = '',
}) => {
  const { toggleFavorite, isFavorite } = useCampusCareStore();
  const favorite = isFavorite(resource.id);

  const primaryLocation = CAMPUS_LOCATIONS.find((l) => l.id === resource.locationId);
  const locationName = primaryLocation?.name || 'Campus Building';
  const locationZone = primaryLocation?.zone || 'Central';

  // Demo distance based on campus zones from student center
  const getSimulatedDistance = (zone: string) => {
    switch (zone) {
      case 'Central':
        return '2 min walk (150m)';
      case 'North':
        return '6 min walk (450m)';
      case 'South':
        return '5 min walk (380m)';
      case 'East':
        return '7 min walk (520m)';
      case 'West':
        return '4 min walk (300m)';
      default:
        return '3 min walk';
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(resource.id, resource.name);
  };

  return (
    <div
      className={`group bg-white rounded-2xl border border-campus-border overflow-hidden transition-all duration-300 hover:shadow-card hover:border-campus-green/40 flex flex-col ${
        compact ? 'p-3' : 'p-3.5 sm:p-4'
      } ${className}`}
    >
      {/* Card Image Container */}
      <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-campus-ivory mb-3.5 shrink-0">
        <img
          src={resource.image}
          alt={resource.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={favorite ? 'Remove from saved' : 'Save essential'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-subtle ${
            favorite
              ? 'bg-white text-campus-coral hover:bg-campus-coral-light'
              : 'bg-white/80 text-campus-grey hover:text-campus-coral hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-campus-coral' : ''}`} />
        </button>

        {/* Urgent Need / Free Loan Badge */}
        <div className="absolute bottom-2.5 left-2.5 flex flex-wrap gap-1.5">
          {resource.isFreeOrLoan ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-campus-forest text-white shadow-2xs">
              Free Loan
            </span>
          ) : resource.price !== undefined ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-campus-charcoal shadow-2xs backdrop-blur-xs">
              ${resource.price.toFixed(2)}
            </span>
          ) : null}

          {resource.urgentNeed && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-campus-mint text-campus-forest shadow-2xs border border-campus-green/30">
              High Demand
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Availability & Timestamp */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <AvailabilityBadge status={resource.availability} source={resource.availabilitySource} />
            {resource.lastUpdated && (
              <span className="text-[10px] text-campus-grey flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {resource.lastUpdated}
              </span>
            )}
          </div>

          {/* Title */}
          <Link to={`/essentials/${resource.id}`} className="block group-hover:text-campus-forest transition-colors">
            <h3 className="font-bold text-sm sm:text-base text-campus-charcoal font-sans leading-snug line-clamp-1">
              {resource.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-campus-charcoal-muted mt-1 line-clamp-2 leading-relaxed">
            {resource.shortDescription}
          </p>
        </div>

        {/* Location & Action Footer */}
        <div className="mt-4 pt-3 border-t border-campus-border/70 flex items-center justify-between gap-2 text-xs">
          <div className="flex flex-col min-w-0">
            <span className="flex items-center gap-1 font-semibold text-campus-forest truncate text-xs">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-campus-green" />
              <span className="truncate">{locationName}</span>
            </span>
            <span className="text-[11px] text-campus-grey pl-4.5 truncate">
              {getSimulatedDistance(locationZone)} • {locationZone} Zone
            </span>
          </div>

          <Link
            to={`/essentials/${resource.id}`}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-campus-ivory hover:bg-campus-forest hover:text-white text-campus-charcoal font-bold transition-all shrink-0 flex items-center gap-1 text-[11px]"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

