import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Heart,
  Clock,
  Navigation,
  FilePlus2,
  Sparkles,
  Share2,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Compass,
} from 'lucide-react';
import { ESSENTIALS_RESOURCES } from '../data/resources';
import { CAMPUS_LOCATIONS } from '../data/locations';
import { AvailabilityBadge } from '../components/ui/Badge';
import { ResourceCard } from '../components/resources/ResourceCard';
import { useCampusCareStore } from '../store/campusCareStore';
import { DemoNotice } from '../components/ui/DemoNotice';

export const ResourceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    toggleFavorite,
    isFavorite,
    setSelectedMapLocationId,
    addRecentlyViewed,
    addToast,
  } = useCampusCareStore();

  const item = ESSENTIALS_RESOURCES.find((r) => r.id === id);

  useEffect(() => {
    if (item) {
      addRecentlyViewed(item.id);
      window.scrollTo(0, 0);
    }
  }, [item?.id]);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-campus-forest">Item not found</h2>
        <p className="text-sm text-campus-charcoal-muted">
          The requested campus essential could not be located in the catalog.
        </p>
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-campus-forest text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discovery</span>
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(item.id);
  const primaryLocation = CAMPUS_LOCATIONS.find((l) => l.id === item.locationId);

  // Related essentials in the same category
  const relatedItems = ESSENTIALS_RESOURCES.filter(
    (r) => r.category === item.category && r.id !== item.id
  ).slice(0, 3);

  const handleViewOnMap = (locId: string) => {
    setSelectedMapLocationId(locId);
    navigate('/map');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Find ${item.name} at ${primaryLocation?.name} on CampusCare`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Direct link copied to clipboard', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <Link
          to="/discover"
          className="inline-flex items-center gap-1.5 font-bold text-campus-forest hover:text-campus-forest-dark hover:underline transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Essentials Discovery</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white border border-campus-border text-campus-charcoal hover:bg-campus-ivory text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Share item link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={() => toggleFavorite(item.id, item.name)}
            className={`p-2 sm:px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              favorite
                ? 'bg-campus-coral text-white border-campus-coral shadow-subtle'
                : 'bg-white text-campus-charcoal border-campus-border hover:bg-campus-mint/40'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-white' : ''}`} />
            <span>{favorite ? 'Saved to Favorites' : 'Save Item'}</span>
          </button>
        </div>
      </div>

      {/* Main Details Presentation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Big Image & Visual Highlights */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-white border border-campus-border shadow-card">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {/* Overlay Category Pill */}
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-campus-forest shadow-subtle">
              {item.category}
            </span>

            {item.isFreeOrLoan && (
              <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-campus-forest text-white shadow-subtle">
                Free Student Loan
              </span>
            )}
          </div>

          {/* Availability Notice Box */}
          <div className="p-4 rounded-2xl bg-campus-mint/50 border border-campus-green/20 text-xs text-campus-charcoal space-y-1">
            <div className="flex items-center gap-2 font-bold text-campus-forest">
              <Sparkles className="w-4 h-4 text-campus-green" />
              <span>Simulated Prototype Inventory</span>
            </div>
            <p className="text-campus-charcoal-muted leading-relaxed">
              Demo inventory — last updated for this prototype {item.lastUpdated || 'recently'}. Report real-world stock updates anytime to keep campus informed.
            </p>
          </div>
        </div>

        {/* Right Column: Information, Availability, Multiple Locations, Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <AvailabilityBadge status={item.availability} source={item.availabilitySource} />
              {item.lastUpdated && (
                <span className="text-xs text-campus-grey flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Updated {item.lastUpdated}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-campus-forest tracking-tight font-sans leading-tight">
              {item.name}
            </h1>

            <p className="text-sm sm:text-base text-campus-charcoal-muted mt-2 leading-relaxed">
              {item.shortDescription}
            </p>
          </div>

          {/* Price & Loan details badge */}
          <div className="p-4 rounded-2xl bg-white border border-campus-border flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-campus-grey block">
                Cost & Eligibility
              </span>
              <div className="text-lg font-bold text-campus-forest mt-0.5">
                {item.isFreeOrLoan ? 'Free of Charge' : `$${item.price?.toFixed(2)}`}
              </div>
            </div>
            {item.loanDuration && (
              <div className="text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-campus-grey block">
                  Loan Terms
                </span>
                <span className="text-xs font-semibold text-campus-charcoal">
                  {item.loanDuration}
                </span>
              </div>
            )}
          </div>

          {/* Full Item Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-campus-grey">
              Overview & Details
            </h3>
            <p className="text-sm text-campus-charcoal leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Primary Location with Map Action */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-campus-grey">
              Primary Location
            </h3>
            <div className="p-4 rounded-2xl bg-white border border-campus-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="font-bold text-sm text-campus-forest flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-campus-green" />
                  <span>{primaryLocation?.name}</span>
                </div>
                <div className="text-xs text-campus-grey">
                  {primaryLocation?.building} • {primaryLocation?.zone} Zone
                </div>
                <div className="text-xs text-campus-charcoal-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-campus-grey" />
                  <span>{primaryLocation?.openHours}</span>
                </div>
              </div>

              <button
                onClick={() => handleViewOnMap(item.locationId)}
                className="px-4 py-2 rounded-xl bg-campus-forest text-white text-xs font-bold hover:bg-campus-forest-dark transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-subtle"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>View on Map</span>
              </button>
            </div>
          </div>

          {/* Multiple Location Options (If item available in other campus buildings) */}
          {item.additionalLocations && item.additionalLocations.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-campus-grey">
                Also Available At Other Campus Points ({item.additionalLocations.length})
              </h3>
              <div className="space-y-2">
                {item.additionalLocations.map((altLoc, idx) => {
                  const altBuilding = CAMPUS_LOCATIONS.find((l) => l.id === altLoc.locationId);
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-campus-ivory border border-campus-border/80 flex items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <div className="font-bold text-campus-charcoal">
                          {altBuilding?.name || 'Campus Building'}
                        </div>
                        <div className="text-[11px] text-campus-grey">
                          {altLoc.floor || altBuilding?.building} • Approx {altLoc.stockCountApprox ?? 'several'} in stock
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AvailabilityBadge status={altLoc.availability} size="sm" />
                        <button
                          onClick={() => handleViewOnMap(altLoc.locationId)}
                          className="p-1.5 text-campus-forest hover:bg-white rounded-lg transition-colors"
                          title="Open on map"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action CTAs: Report Availability / Ask */}
          <div className="pt-4 border-t border-campus-border flex flex-wrap gap-3">
            <Link
              to={`/report?resource=${encodeURIComponent(item.name)}&location=${item.locationId}`}
              className="flex-1 px-4 py-3 rounded-xl bg-white text-campus-charcoal border border-campus-border hover:bg-campus-ivory font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <FilePlus2 className="w-4 h-4 text-campus-forest" />
              <span>Report Availability Update</span>
            </Link>

            <Link
              to={`/discover?category=${item.category}`}
              className="px-4 py-3 rounded-xl bg-campus-ivory text-campus-charcoal hover:bg-campus-mint font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Compass className="w-4 h-4 text-campus-forest" />
              <span>More in {item.category}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Essentials Section */}
      {relatedItems.length > 0 && (
        <section className="pt-8 border-t border-campus-border space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-campus-forest tracking-tight font-sans">
                Related Essentials
              </h2>
              <p className="text-xs text-campus-charcoal-muted mt-0.5">
                Other useful supplies in the same category across campus.
              </p>
            </div>
            <Link
              to={`/discover?category=${item.category}`}
              className="text-xs font-bold text-campus-forest hover:underline"
            >
              View category →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedItems.map((rel) => (
              <ResourceCard key={rel.id} resource={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Demo notice component */}
      <DemoNotice />
    </div>
  );
};

