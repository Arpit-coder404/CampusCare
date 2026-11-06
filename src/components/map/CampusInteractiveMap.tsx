import React, { useState, useEffect } from 'react';
import { CAMPUS_LOCATIONS } from '../../data/locations';
import { CampusLocation } from '../../types';
import { LocationPanel } from './LocationPanel';
import { useCampusCareStore } from '../../store/campusCareStore';
import {
  MapPin,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Info,
  Navigation,
  CheckCircle2,
} from 'lucide-react';

interface CampusInteractiveMapProps {
  className?: string;
  initialLocationId?: string | null;
}

export const CampusInteractiveMap: React.FC<CampusInteractiveMapProps> = ({
  className = '',
  initialLocationId,
}) => {
  const { selectedMapLocationId, setSelectedMapLocationId } = useCampusCareStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLocation, setActiveLocation] = useState<CampusLocation | null>(null);

  // Sync external selectedMapLocationId or prop
  useEffect(() => {
    const targetId = initialLocationId || selectedMapLocationId;
    if (targetId) {
      const match = CAMPUS_LOCATIONS.find((l) => l.id === targetId);
      if (match) {
        setActiveLocation(match);
      }
    }
  }, [initialLocationId, selectedMapLocationId]);

  // Handle marker selection
  const handleSelectLocation = (loc: CampusLocation) => {
    setActiveLocation(loc);
    setSelectedMapLocationId(loc.id);
  };

  const filteredLocations = CAMPUS_LOCATIONS.filter((loc) => {
    const matchesCategory = selectedCategory === 'all' || loc.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.zone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryPills = [
    { id: 'all', label: 'All Buildings' },
    { id: 'academic', label: 'Academic Hubs' },
    { id: 'student-life', label: 'Student Life' },
    { id: 'health-safety', label: 'Health & First Aid' },
    { id: 'services', label: 'Services & Print' },
    { id: 'residence', label: 'Residential Quads' },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health-safety':
        return '#D75D52'; // Alert Coral
      case 'student-life':
        return '#3D8B68'; // Fresh green
      case 'services':
        return '#173F35'; // Deep forest
      case 'residence':
        return '#F2C66D'; // Amber
      default:
        return '#1E4E42';
    }
  };

  return (
    <div className={`relative bg-[#F4F6F2] rounded-3xl border border-campus-border overflow-hidden flex flex-col ${className}`}>
      {/* Top Map Control Bar */}
      <div className="p-3 sm:p-4 bg-white/90 backdrop-blur-md border-b border-campus-border z-20 flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-campus-grey absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campus building or hall..."
            className="w-full pl-9 pr-3 py-1.5 bg-campus-ivory rounded-xl text-xs font-medium text-campus-charcoal placeholder-campus-grey border border-campus-border focus:outline-none focus:border-campus-forest"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {categoryPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedCategory(pill.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === pill.id
                  ? 'bg-campus-forest text-white shadow-subtle'
                  : 'bg-campus-ivory text-campus-charcoal hover:bg-campus-mint/50'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="hidden sm:flex items-center gap-1 bg-campus-ivory p-1 rounded-xl border border-campus-border">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
            className="p-1 text-campus-forest hover:bg-white rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-bold text-campus-charcoal px-1.5">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="p-1 text-campus-forest hover:bg-white rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1 text-campus-forest hover:bg-white rounded-lg transition-colors"
            title="Reset Map"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Map Graphic Canvas Area */}
      <div className="relative flex-1 min-h-[500px] lg:min-h-[620px] overflow-hidden bg-[#EFF2EB] flex items-center justify-center p-4">
        {/* Scalable Vector Campus Map */}
        <div
          className="relative w-full max-w-5xl aspect-16/10 transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox="0 0 1000 625"
            className="w-full h-full select-none"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(23,63,53,0.06))' }}
          >
            {/* Background Campus Terrain */}
            <rect width="1000" height="625" rx="30" fill="#E8ECE4" />

            {/* University Central Lawn / Quad Greens */}
            <path
              d="M 280 200 C 400 180, 600 190, 720 220 C 750 350, 700 480, 580 500 C 420 520, 260 460, 240 340 Z"
              fill="#DCE8DC"
              stroke="#CFDEC9"
              strokeWidth="3"
            />
            {/* North Green Quad */}
            <circle cx="360" cy="120" r="90" fill="#E0EBE0" stroke="#CFDEC9" strokeWidth="2" />
            {/* East Athletic Fields */}
            <rect x="750" y="320" width="180" height="240" rx="20" fill="#D5E5D5" stroke="#C3D9C3" strokeWidth="2" />
            <ellipse cx="840" cy="440" rx="60" ry="80" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6,4" />

            {/* Campus Ring Roads & Pathways */}
            {/* Outer Perimeter Road */}
            <path
              d="M 80 80 Q 500 40 920 80 Q 960 320 920 560 Q 500 600 80 560 Q 40 320 80 80 Z"
              fill="none"
              stroke="#D4D9D0"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 80 80 Q 500 40 920 80 Q 960 320 920 560 Q 500 600 80 560 Q 40 320 80 80 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Internal Walkway Network */}
            <path
              d="M 480 80 L 480 340 L 250 360 L 180 500 M 480 340 L 780 250 M 480 340 L 400 560 M 350 180 L 580 180 M 620 520 L 780 500"
              fill="none"
              stroke="#F6F7F3"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Campus Lake / Pond */}
            <path
              d="M 120 220 C 180 200, 220 250, 190 310 C 160 360, 90 340, 80 280 Z"
              fill="#D4E7EA"
              stroke="#BCD9DC"
              strokeWidth="3"
            />
            <text x="135" y="275" fill="#588D96" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Campus Lake
            </text>

            {/* Zone Labels (Subtle Watermarks) */}
            <text x="450" y="50" fill="#9DA39B" fontSize="14" fontWeight="800" letterSpacing="4" fontFamily="sans-serif">
              NORTH ZONE
            </text>
            <text x="450" y="605" fill="#9DA39B" fontSize="14" fontWeight="800" letterSpacing="4" fontFamily="sans-serif">
              SOUTH COMMONS
            </text>
            <text x="30" y="320" fill="#9DA39B" fontSize="14" fontWeight="800" letterSpacing="4" fontFamily="sans-serif">
              WEST
            </text>
            <text x="910" y="320" fill="#9DA39B" fontSize="14" fontWeight="800" letterSpacing="4" fontFamily="sans-serif">
              EAST
            </text>

            {/* Decorative Trees */}
            {[
              [240, 160], [300, 140], [420, 110], [520, 110], [640, 140],
              [710, 170], [220, 420], [290, 480], [670, 480], [710, 540],
              [490, 450], [540, 240], [330, 310], [150, 140], [130, 420],
            ].map(([tx, ty], i) => (
              <circle key={i} cx={tx} cy={ty} r="7" fill="#B7CEB5" />
            ))}

            {/* Render 3D Stylized Building Footprints */}
            {CAMPUS_LOCATIONS.map((loc) => {
              const cx = loc.x * 10;
              const cy = loc.y * 6.25;
              const isSelected = activeLocation?.id === loc.id;
              const isFiltered = filteredLocations.some((fl) => fl.id === loc.id);

              return (
                <g key={`building-${loc.id}`} opacity={isFiltered ? 1 : 0.25} className="transition-opacity duration-300">
                  {/* Building Base Shadow */}
                  <rect
                    x={cx - 36}
                    y={cy - 22 + 6}
                    width="72"
                    height="44"
                    rx="10"
                    fill="rgba(23,63,53,0.12)"
                  />
                  {/* Building Structure */}
                  <rect
                    x={cx - 36}
                    y={cy - 22}
                    width="72"
                    height="44"
                    rx="10"
                    fill={isSelected ? '#173F35' : '#FFFFFF'}
                    stroke={isSelected ? '#3D8B68' : '#D6DCD3'}
                    strokeWidth={isSelected ? '3' : '2'}
                    className="cursor-pointer transition-colors duration-200"
                    onClick={() => handleSelectLocation(loc)}
                  />
                  {/* Building Label snippet */}
                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    fill={isSelected ? '#FFFFFF' : '#202722'}
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="sans-serif"
                    className="pointer-events-none select-none"
                  >
                    {loc.building.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Marker Pins (HTML overlay for maximum crispness and accessibility) */}
          {CAMPUS_LOCATIONS.map((loc) => {
            const isSelected = activeLocation?.id === loc.id;
            const isFiltered = filteredLocations.some((fl) => fl.id === loc.id);
            const color = getCategoryColor(loc.category);

            if (!isFiltered) return null;

            return (
              <div
                key={loc.id}
                style={{
                  left: `${loc.x}%`,
                  top: `${loc.y}%`,
                  transform: 'translate(-50%, -100%)',
                }}
                className={`absolute z-10 transition-all duration-300 cursor-pointer ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
                onClick={() => handleSelectLocation(loc)}
              >
                {/* Active Halo Ping */}
                {isSelected && (
                  <span
                    className="absolute -inset-2 rounded-full animate-ping opacity-60 pointer-events-none"
                    style={{ backgroundColor: color }}
                  />
                )}

                {/* Marker Body */}
                <div
                  className="relative px-2 py-1 rounded-xl shadow-floating flex items-center gap-1 font-bold text-[10px] text-white border-2 border-white transition-all whitespace-nowrap"
                  style={{ backgroundColor: isSelected ? '#173F35' : color }}
                >
                  <MapPin className="w-3 h-3 text-white shrink-0" />
                  <span>{loc.name.split(' ')[0]}</span>
                </div>

                {/* Pin pointer tip */}
                <div
                  className="w-2 h-2 mx-auto rotate-45 -mt-1 shadow-2xs"
                  style={{ backgroundColor: isSelected ? '#173F35' : color }}
                />
              </div>
            );
          })}
        </div>

        {/* Legend Overlay (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-20 hidden md:block bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-campus-border shadow-subtle text-[11px] space-y-1.5">
          <div className="font-bold text-campus-forest uppercase tracking-wider text-[10px] pb-1 border-b border-campus-border">
            Interactive Campus Key
          </div>
          <div className="flex items-center gap-2 text-campus-charcoal">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D75D52]" />
            <span>Health & First Aid Center</span>
          </div>
          <div className="flex items-center gap-2 text-campus-charcoal">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3D8B68]" />
            <span>Student Life Hub & Pantry</span>
          </div>
          <div className="flex items-center gap-2 text-campus-charcoal">
            <span className="w-2.5 h-2.5 rounded-full bg-[#173F35]" />
            <span>Academic & Print Services</span>
          </div>
          <div className="flex items-center gap-2 text-campus-charcoal">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2C66D]" />
            <span>Residential Quads</span>
          </div>
        </div>

        {/* Selected Location Details Panel Drawer (Overlay) */}
        {activeLocation && (
          <div className="absolute top-4 right-4 z-30 animate-in fade-in slide-in-from-right-4 duration-200">
            <LocationPanel
              location={activeLocation}
              onClose={() => {
                setActiveLocation(null);
                setSelectedMapLocationId(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

