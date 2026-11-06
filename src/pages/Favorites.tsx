import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, ArrowRight, Trash2, MapPin } from 'lucide-react';
import { useCampusCareStore } from '../store/campusCareStore';
import { ESSENTIALS_RESOURCES } from '../data/resources';
import { CAMPUS_LOCATIONS } from '../data/locations';
import { ResourceCard } from '../components/resources/ResourceCard';
import { AvailabilityBadge } from '../components/ui/Badge';

export const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useCampusCareStore();

  const savedItems = ESSENTIALS_RESOURCES.filter((r) => favorites.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-campus-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-campus-coral-light text-campus-coral border border-campus-coral/20 mb-2">
            <Heart className="w-3 h-3 fill-campus-coral text-campus-coral" />
            Saved to My Campus Essentials
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-campus-forest tracking-tight font-sans">
            Your Favorites
          </h1>
          <p className="text-sm text-campus-charcoal-muted mt-1">
            Saved essentials, services, and campus supplies.{' '}
            <span className="text-campus-grey text-xs font-medium">(Persisted in local storage)</span>
          </p>
        </div>

        <span className="text-xs font-semibold text-campus-grey">
          {savedItems.length} item{savedItems.length !== 1 ? 's' : ''} saved
        </span>
      </div>

      {savedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {savedItems.map((resource) => (
            <div key={resource.id} className="relative group">
              <ResourceCard resource={resource} />
              {/* Quick Remove Button */}
              <button
                onClick={() => toggleFavorite(resource.id, resource.name)}
                className="absolute top-5 right-5 p-1 rounded-full bg-white/90 border border-campus-border text-campus-grey hover:text-campus-coral hover:bg-campus-coral-light opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-subtle"
                title="Remove from favorites"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 space-y-5 text-center bg-white rounded-3xl border border-campus-border shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-campus-mint flex items-center justify-center">
            <Heart className="w-8 h-8 text-campus-forest" />
          </div>
          <div className="max-w-sm space-y-2">
            <h2 className="text-xl font-bold text-campus-forest font-sans">
              Your campus essentials, all in one place.
            </h2>
            <p className="text-sm text-campus-charcoal-muted leading-relaxed">
              Save chargers, medicine, stationery, and hygiene essentials to access them quickly when you need them most.
            </p>
          </div>
          <Link
            to="/discover"
            className="px-6 py-3 rounded-2xl bg-campus-forest text-white text-sm font-bold hover:bg-campus-forest-dark transition-all flex items-center gap-2 shadow-subtle"
          >
            <Compass className="w-4 h-4 text-campus-mint" />
            <span>Discover Essentials</span>
          </Link>
        </div>
      )}

      {/* Helpful tip if some items are saved */}
      {savedItems.length > 0 && (
        <div className="p-5 rounded-2xl bg-campus-mint/40 border border-campus-green/20 text-xs text-campus-charcoal flex items-start gap-3">
          <Heart className="w-4 h-4 text-campus-forest shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-campus-forest">Your favorites are saved locally.</span>{' '}
            <span className="text-campus-charcoal-muted">
              All saved items persist between sessions using LocalStorage in your browser. They are cleared only if you reset your browser data.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

