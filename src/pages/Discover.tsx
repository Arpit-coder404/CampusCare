import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Filter,
  Search,
  X,
  SlidersHorizontal,
  RotateCcw,
  MapPin,
  Sparkles,
  ArrowUpDown,
  Compass,
} from 'lucide-react';
import { ESSENTIALS_RESOURCES } from '../data/resources';
import { CAMPUS_LOCATIONS } from '../data/locations';
import { ResourceCard } from '../components/resources/ResourceCard';
import { EssentialCategory, AvailabilityStatus } from '../types';
import { DemoNotice } from '../components/ui/DemoNotice';

export const Discover: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL params
  const paramQuery = searchParams.get('q') || '';
  const paramCategory = searchParams.get('category') || 'all';
  const paramLocation = searchParams.get('location') || 'all';
  const paramAvailability = searchParams.get('availability') || 'all';
  const paramPrice = searchParams.get('price') || 'all';
  const paramSort = searchParams.get('sort') || 'available';
  const paramUrgent = searchParams.get('urgent') === 'true';

  // Local filter states
  const [searchQuery, setSearchQuery] = useState(paramQuery);
  const [selectedCategory, setSelectedCategory] = useState(paramCategory);
  const [selectedLocation, setSelectedLocation] = useState(paramLocation);
  const [selectedAvailability, setSelectedAvailability] = useState(paramAvailability);
  const [selectedPrice, setSelectedPrice] = useState(paramPrice);
  const [sortBy, setSortBy] = useState(paramSort);
  const [urgentOnly, setUrgentOnly] = useState(paramUrgent);

  // Mobile drawer filter toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    setSearchQuery(paramQuery);
    setSelectedCategory(paramCategory);
    setSelectedLocation(paramLocation);
    setSelectedAvailability(paramAvailability);
    setSelectedPrice(paramPrice);
    setSortBy(paramSort);
    setUrgentOnly(paramUrgent);
  }, [paramQuery, paramCategory, paramLocation, paramAvailability, paramPrice, paramSort, paramUrgent]);

  // Update URL params on filter change
  const updateUrlParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === 'all' || val === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, val);
      }
    });
    setSearchParams(newParams);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    updateUrlParams({ category: cat });
  };

  const handleLocationChange = (loc: string) => {
    setSelectedLocation(loc);
    updateUrlParams({ location: loc });
  };

  const handleAvailabilityChange = (avail: string) => {
    setSelectedAvailability(avail);
    updateUrlParams({ availability: avail });
  };

  const handlePriceChange = (price: string) => {
    setSelectedPrice(price);
    updateUrlParams({ price });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateUrlParams({ sort });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedAvailability('all');
    setSelectedPrice('all');
    setSortBy('available');
    setUrgentOnly(false);
    setSearchParams(new URLSearchParams());
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return ESSENTIALS_RESOURCES.filter((item) => {
      // 1. Search text (name, tags, description, category)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesTags = item.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Location (check primary location or additional locations)
      if (selectedLocation !== 'all') {
        const matchesPrimary = item.locationId === selectedLocation;
        const matchesAdditional = item.additionalLocations?.some((l) => l.locationId === selectedLocation);
        if (!matchesPrimary && !matchesAdditional) {
          return false;
        }
      }

      // 4. Availability
      if (selectedAvailability !== 'all' && item.availability !== selectedAvailability) {
        return false;
      }

      // 5. Price filter
      if (selectedPrice === 'free') {
        if (!item.isFreeOrLoan) return false;
      } else if (selectedPrice === 'under-5') {
        if (item.price !== undefined && item.price > 5) return false;
      }

      // 6. Urgent filter
      if (urgentOnly && !item.urgentNeed) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'available') {
        // available first, then limited, then unavailable
        const order = { available: 0, limited: 1, unknown: 2, unavailable: 3 };
        return order[a.availability] - order[b.availability];
      }
      if (sortBy === 'price-asc') {
        const priceA = a.isFreeOrLoan ? 0 : (a.price ?? 999);
        const priceB = b.isFreeOrLoan ? 0 : (b.price ?? 999);
        return priceA - priceB;
      }
      if (sortBy === 'popular') {
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      }
      // closest default
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedLocation, selectedAvailability, selectedPrice, sortBy, urgentOnly]);

  const categoriesList: { id: string; label: string }[] = [
    { id: 'all', label: 'All Essentials' },
    { id: 'chargers', label: 'Chargers & Cables' },
    { id: 'stationery', label: 'Stationery & Pens' },
    { id: 'hygiene', label: 'Hygiene & Sanitary' },
    { id: 'first-aid', label: 'First Aid & Medicine' },
    { id: 'academic', label: 'Calculators & STEM' },
    { id: 'tech', label: 'Tech & Audio' },
    { id: 'weather', label: 'Umbrellas & Weather' },
    { id: 'personal-care', label: 'Personal Care' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-campus-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-campus-mint text-campus-forest border border-campus-green/20 mb-2">
            <Compass className="w-3 h-3" />
            Everyday Supplies Catalog
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-campus-forest tracking-tight font-sans">
            Find what you need.
          </h1>
          <p className="text-sm text-campus-charcoal-muted mt-1 max-w-xl">
            Everyday essentials, made easier to find. Real-time simulated stock across university libraries, dorms, and student centers.
          </p>
        </div>

        {/* Prototype notice badge */}
        <DemoNotice variant="pill" />
      </div>

      {/* Search Bar & Mobile Filter Trigger */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-campus-grey absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateUrlParams({ q: e.target.value });
            }}
            placeholder="Search by item name, tag, or need (e.g., charger, pads, TI-84, umbrella)..."
            className="w-full pl-10 pr-9 py-2.5 bg-white rounded-xl border border-campus-border text-sm font-medium text-campus-charcoal placeholder-campus-grey focus:outline-none focus:border-campus-forest focus:ring-2 focus:ring-campus-mint transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                updateUrlParams({ q: null });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-campus-grey hover:text-campus-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden px-3.5 py-2.5 bg-white rounded-xl border border-campus-border text-xs font-bold text-campus-charcoal hover:bg-campus-ivory flex items-center gap-1.5 shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4 text-campus-forest" />
          <span>Filters</span>
          {(selectedCategory !== 'all' || selectedLocation !== 'all' || selectedAvailability !== 'all') && (
            <span className="w-2 h-2 rounded-full bg-campus-forest" />
          )}
        </button>
      </div>

      {/* Main Grid: Sidebar + Items */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-6 bg-white p-5 rounded-2xl border border-campus-border h-fit sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-campus-border">
            <span className="text-xs font-bold uppercase tracking-wider text-campus-forest flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-campus-green" />
              Filter Catalog
            </span>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-semibold text-campus-grey hover:text-campus-coral flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-campus-grey mb-2.5">
              Category
            </label>
            <div className="space-y-1">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-campus-mint text-campus-forest font-bold'
                      : 'text-campus-charcoal hover:bg-campus-ivory'
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-campus-forest" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-campus-grey mb-2.5">
              Availability Status
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'all', label: 'All' },
                { id: 'available', label: 'Available' },
                { id: 'limited', label: 'Limited' },
                { id: 'unavailable', label: 'Out of Stock' },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => handleAvailabilityChange(st.id)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                    selectedAvailability === st.id
                      ? 'bg-campus-forest text-white'
                      : 'bg-campus-ivory text-campus-charcoal hover:bg-campus-mint/50'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Campus Location Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-campus-grey mb-2.5">
              Campus Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full p-2 bg-campus-ivory rounded-xl text-xs font-medium text-campus-charcoal border border-campus-border focus:outline-none focus:border-campus-forest"
            >
              <option value="all">All Campus Buildings</option>
              {CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.zone})
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-campus-grey mb-2.5">
              Cost & Access
            </label>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'free', label: 'Free Student Loans & Dispensers' },
                { id: 'under-5', label: 'Under $5.00' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePriceChange(p.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    selectedPrice === p.id
                      ? 'bg-campus-mint text-campus-forest font-bold'
                      : 'text-campus-charcoal hover:bg-campus-ivory'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Urgent Need Toggle */}
          <div className="pt-2 border-t border-campus-border">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={urgentOnly}
                onChange={(e) => {
                  setUrgentOnly(e.target.checked);
                  updateUrlParams({ urgent: e.target.checked ? 'true' : null });
                }}
                className="w-4 h-4 rounded text-campus-forest focus:ring-campus-mint accent-campus-forest"
              />
              <span className="text-xs font-semibold text-campus-charcoal">
                High demand / urgent items only
              </span>
            </label>
          </div>
        </aside>

        {/* Product/Resource Grid Area */}
        <main className="lg:col-span-3 space-y-5">
          {/* Active Filter Bar & Results Count */}
          <div className="bg-white p-3 sm:px-4 sm:py-2.5 rounded-2xl border border-campus-border flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="font-semibold text-campus-charcoal">
              Showing <span className="font-bold text-campus-forest">{filteredItems.length}</span> campus essentials
              {searchQuery && (
                <span className="text-campus-grey ml-1 font-normal">
                  matching "{searchQuery}"
                </span>
              )}
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2">
              <span className="text-campus-grey font-medium flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-campus-ivory px-2 py-1 rounded-lg text-xs font-bold text-campus-charcoal border border-campus-border focus:outline-none focus:border-campus-forest"
              >
                <option value="available">Available First</option>
                <option value="popular">Most Popular</option>
                <option value="price-asc">Lowest Price / Free First</option>
                <option value="closest">Closest (Central Quad)</option>
              </select>
            </div>
          </div>

          {/* Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-campus-border p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-campus-mint text-campus-forest flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-bold text-campus-forest">
                  No essentials found
                </h3>
                <p className="text-xs text-campus-charcoal-muted mt-1 leading-relaxed">
                  We couldn't find any campus items matching your current filters. Try relaxing the category, location, or price filters.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-campus-forest text-white text-xs font-bold hover:bg-campus-forest-dark transition-all inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom-sheet Filters */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 space-y-5 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-campus-border">
              <span className="font-bold text-sm text-campus-forest flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filter Essentials
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-campus-grey hover:text-campus-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-campus-grey block mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`p-2 rounded-xl text-xs font-semibold text-left ${
                      selectedCategory === cat.id
                        ? 'bg-campus-forest text-white'
                        : 'bg-campus-ivory text-campus-charcoal'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Location */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-campus-grey block mb-2">
                Campus Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full p-2.5 bg-campus-ivory rounded-xl text-xs font-semibold text-campus-charcoal border border-campus-border"
              >
                <option value="all">All Campus Locations</option>
                {CAMPUS_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Availability */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-campus-grey block mb-2">
                Availability
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['all', 'available', 'limited'].map((avail) => (
                  <button
                    key={avail}
                    onClick={() => handleAvailabilityChange(avail)}
                    className={`py-2 rounded-xl text-xs font-semibold capitalize ${
                      selectedAvailability === avail
                        ? 'bg-campus-forest text-white'
                        : 'bg-campus-ivory text-campus-charcoal'
                    }`}
                  >
                    {avail}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 rounded-xl bg-campus-ivory text-campus-charcoal font-bold text-xs"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-campus-forest text-white font-bold text-xs"
              >
                Apply & View ({filteredItems.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

