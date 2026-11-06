import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, Clock, MapPin, Tag } from 'lucide-react';
import { useCampusCareStore } from '../../store/campusCareStore';
import { ESSENTIALS_RESOURCES } from '../../data/resources';
import { CAMPUS_SERVICES } from '../../data/services';
import { CAMPUS_LOCATIONS } from '../../data/locations';
import { AvailabilityBadge } from '../ui/Badge';

interface GlobalSearchProps {
  placeholder?: string;
  autoFocus?: boolean;
  largeHero?: boolean;
  className?: string;
  onSelectResult?: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  placeholder = 'What do you need right now?',
  autoFocus = false,
  largeHero = false,
  className = '',
  onSelectResult,
}) => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, recentSearches, addRecentSearch } = useCampusCareStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal state with store
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const query = inputValue.trim().toLowerCase();

  // Filter matching essentials
  const matchingEssentials = query
    ? ESSENTIALS_RESOURCES.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.category.toLowerCase().includes(query) ||
          r.tags.some((t) => t.toLowerCase().includes(query)) ||
          r.description.toLowerCase().includes(query)
      ).slice(0, 4)
    : [];

  // Filter matching services
  const matchingServices = query
    ? CAMPUS_SERVICES.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query) ||
          s.tags.some((t) => t.toLowerCase().includes(query)) ||
          s.servicesOffered.some((offer) => offer.toLowerCase().includes(query))
      ).slice(0, 3)
    : [];

  const hasResults = matchingEssentials.length > 0 || matchingServices.length > 0;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim()) {
      addRecentSearch(inputValue.trim());
      setSearchQuery(inputValue.trim());
      setIsOpen(false);
      if (onSelectResult) onSelectResult();
      navigate(`/discover?q=${encodeURIComponent(inputValue.trim())}`);
    } else {
      navigate('/discover');
    }
  };

  const handleSelectQuery = (selectedText: string) => {
    setInputValue(selectedText);
    setSearchQuery(selectedText);
    addRecentSearch(selectedText);
    setIsOpen(false);
    if (onSelectResult) onSelectResult();
    navigate(`/discover?q=${encodeURIComponent(selectedText)}`);
  };

  const getLocationName = (locationId: string) => {
    return CAMPUS_LOCATIONS.find((l) => l.id === locationId)?.name || 'Campus Building';
  };

  const quickPills = [
    'Phone charger',
    'First aid',
    'Printing',
    'Umbrella',
    'Stationery',
    'Hygiene essentials',
  ];

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`} ref={dropdownRef}>
      {/* Search Input Bar */}
      <form
        onSubmit={handleSubmit}
        className={`flex items-center bg-white rounded-2xl border transition-all ${
          isOpen
            ? 'border-campus-forest ring-4 ring-campus-mint shadow-floating'
            : 'border-campus-border shadow-card hover:border-campus-green/50'
        } ${largeHero ? 'p-2 sm:p-2.5' : 'p-1.5'}`}
      >
        <div className="pl-3.5 pr-2 text-campus-forest flex items-center justify-center">
          <Search className={`${largeHero ? 'w-6 h-6' : 'w-5 h-5'} text-campus-forest`} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full bg-transparent border-none focus:outline-none text-campus-charcoal placeholder-campus-grey font-medium ${
            largeHero ? 'text-base sm:text-lg py-2' : 'text-sm py-1.5'
          }`}
        />

        {inputValue && (
          <button
            type="button"
            onClick={() => {
              setInputValue('');
              setSearchQuery('');
              inputRef.current?.focus();
            }}
            className="p-1.5 text-campus-grey hover:text-campus-charcoal rounded-lg transition-colors mr-1"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className={`flex items-center gap-1.5 rounded-xl font-bold font-sans tracking-wide transition-all shrink-0 ${
            largeHero
              ? 'px-5 py-3 text-sm bg-campus-forest text-white hover:bg-campus-forest-dark hover:shadow-subtle'
              : 'px-3.5 py-2 text-xs bg-campus-forest text-white hover:bg-campus-forest-dark'
          }`}
        >
          <span>Find it</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Quick Search Pills (shown when empty or hero) */}
      {largeHero && (
        <div className="flex flex-wrap items-center gap-2 mt-3.5 px-1">
          <span className="text-xs font-semibold text-campus-charcoal-muted flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-campus-green" />
            Quick search:
          </span>
          {quickPills.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => handleSelectQuery(pill)}
              className="text-xs px-2.5 py-1 rounded-full bg-white hover:bg-campus-mint text-campus-charcoal hover:text-campus-forest border border-campus-border hover:border-campus-green/40 transition-all font-medium shadow-2xs"
            >
              {pill}
            </button>
          ))}
        </div>
      )}

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-campus-border shadow-floating overflow-hidden z-50 divide-y divide-campus-border/60 animate-in fade-in zoom-in-95 duration-150 max-h-[480px] overflow-y-auto">
          {/* Query Results */}
          {query ? (
            <>
              {hasResults ? (
                <>
                  {/* Essentials Results */}
                  {matchingEssentials.length > 0 && (
                    <div className="p-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-campus-grey px-2 pb-2">
                        Matching Campus Essentials
                      </div>
                      <div className="space-y-1">
                        {matchingEssentials.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              addRecentSearch(item.name);
                              setIsOpen(false);
                              if (onSelectResult) onSelectResult();
                              navigate(`/essentials/${item.id}`);
                            }}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-campus-mint/50 cursor-pointer transition-colors group"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-lg object-cover border border-campus-border shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-campus-charcoal group-hover:text-campus-forest truncate">
                                {item.name}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-campus-grey mt-0.5">
                                <span className="flex items-center gap-1 truncate">
                                  <MapPin className="w-3 h-3 text-campus-forest" />
                                  {getLocationName(item.locationId)}
                                </span>
                                <span>•</span>
                                <span>{item.isFreeOrLoan ? 'Free Loan' : `$${item.price?.toFixed(2)}`}</span>
                              </div>
                            </div>
                            <AvailabilityBadge status={item.availability} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Services Results */}
                  {matchingServices.length > 0 && (
                    <div className="p-3 bg-campus-ivory/50">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-campus-grey px-2 pb-2">
                        Matching Campus Services
                      </div>
                      <div className="space-y-1">
                        {matchingServices.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => {
                              addRecentSearch(service.name);
                              setIsOpen(false);
                              if (onSelectResult) onSelectResult();
                              navigate(`/services?id=${service.id}`);
                            }}
                            className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-white cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-campus-mint text-campus-forest flex items-center justify-center font-bold text-xs shrink-0">
                                {service.category[0].toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-campus-charcoal group-hover:text-campus-forest">
                                  {service.name}
                                </div>
                                <div className="text-xs text-campus-grey flex items-center gap-1.5">
                                  <span>{getLocationName(service.locationId)}</span>
                                  <span>•</span>
                                  <span className="text-campus-green font-medium">{service.statusText}</span>
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-campus-grey group-hover:text-campus-forest shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View all button */}
                  <div className="p-2.5 bg-white text-center">
                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      className="text-xs font-bold text-campus-forest hover:text-campus-forest-dark flex items-center justify-center gap-1.5 w-full py-1"
                    >
                      <span>View all results for "{inputValue}"</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center text-campus-grey">
                  <p className="text-sm font-medium text-campus-charcoal mb-1">
                    No exact items found for "{inputValue}"
                  </p>
                  <p className="text-xs text-campus-grey mb-3">
                    Try searching for common campus items like "charger", "notebook", "first aid", or "printing".
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/discover');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-campus-forest hover:underline"
                  >
                    <span>Browse all essentials catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* When input is empty, show recent searches and top popular essentials */
            <div className="p-3">
              {recentSearches.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-campus-grey px-2 pb-1.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Recent Searches
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {recentSearches.map((rec) => (
                      <button
                        key={rec}
                        type="button"
                        onClick={() => handleSelectQuery(rec)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-campus-ivory hover:bg-campus-mint text-campus-charcoal transition-colors flex items-center gap-1.5"
                      >
                        <span>{rec}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-campus-grey px-2 pb-1.5">
                  Top Campus Categories
                </div>
                <div className="grid grid-cols-2 gap-1.5 px-1">
                  {[
                    { label: 'Laptop Chargers', cat: 'chargers' },
                    { label: 'First Aid & Meds', cat: 'first-aid' },
                    { label: 'Sanitary & Hygiene', cat: 'hygiene' },
                    { label: 'Calculators & STEM', cat: 'academic' },
                    { label: 'Stationery & Pens', cat: 'stationery' },
                    { label: 'Printing Hubs', cat: 'printing' },
                  ].map((item) => (
                    <button
                      key={item.cat}
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        navigate(`/discover?category=${item.cat}`);
                      }}
                      className="text-left p-2 rounded-xl hover:bg-campus-mint/50 transition-colors flex items-center gap-2 text-xs font-semibold text-campus-charcoal"
                    >
                      <Tag className="w-3.5 h-3.5 text-campus-forest" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

