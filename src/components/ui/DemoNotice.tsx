import React, { useState } from 'react';
import { Info, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export const DemoNotice: React.FC<{ variant?: 'banner' | 'pill' | 'card'; className?: string }> = ({
  variant = 'banner',
  className = '',
}) => {
  const [expanded, setExpanded] = useState(false);

  if (variant === 'pill') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-campus-mint/70 text-campus-forest border border-campus-green/20 ${className}`}>
        <Sparkles className="w-3 h-3 text-campus-green" />
        <span>Prototype • Realistic Demo Dataset</span>
      </span>
    );
  }

  return (
    <aside aria-label="Demo Prototype Notice" className={`bg-campus-mint/50 border border-campus-green/20 rounded-xl overflow-hidden text-xs text-campus-charcoal transition-all ${className}`}>
      <div className="px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-campus-forest shrink-0" />
          <span className="font-semibold text-campus-forest">
            Prototype Notice:
          </span>
          <span className="text-campus-charcoal-muted hidden sm:inline">
            All stock levels, locations, and contacts are realistic simulated demo data.
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-campus-forest hover:text-campus-forest-dark font-medium flex items-center gap-1 text-[11px] shrink-0"
        >
          <span>{expanded ? 'Less info' : 'Prototype details'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
      {expanded && (
        <div className="px-4 pb-3 pt-1 border-t border-campus-green/10 text-campus-charcoal-muted leading-relaxed">
          <p className="mb-1.5">
            <strong>CampusCare</strong> is configured as a standalone frontend demonstration. Emergency numbers (such as 555-019-XXXX) and real-time inventory counts are fictional representations.
          </p>
          <p>
            When deployed on a live campus, administrators integrate verified university SSO, facilities management feeds, and institutional emergency escalation lines.
          </p>
        </div>
      )}
    </aside>
  );
};

