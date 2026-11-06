import React from 'react';
import { AvailabilityStatus } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'available' | 'limited' | 'unavailable' | 'unknown' | 'neutral' | 'demo' | 'accent' | 'forest';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs tracking-wide';

  const variantStyles = {
    available: 'bg-campus-mint text-campus-forest font-semibold border border-campus-green/20',
    limited: 'bg-campus-amber-light text-[#9A6B1A] font-semibold border border-campus-amber/30',
    unavailable: 'bg-campus-coral-light text-campus-coral font-semibold border border-campus-coral/20',
    unknown: 'bg-gray-100 text-campus-grey font-medium border border-campus-border',
    neutral: 'bg-white text-campus-charcoal font-medium border border-campus-border',
    demo: 'bg-[#F2F4F1] text-campus-charcoal-muted font-medium border border-campus-border text-[11px]',
    accent: 'bg-campus-forest text-white font-semibold',
    forest: 'bg-campus-mint text-campus-forest font-semibold',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full uppercase tracking-wider font-sans transition-colors ${sizeStyles} ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};

export const AvailabilityBadge: React.FC<{ status: AvailabilityStatus; source?: string; size?: 'sm' | 'md'; className?: string }> = ({
  status,
  source = 'demo',
  size = 'md',
  className = '',
}) => {
  const dotColor = {
    available: 'bg-[#2E7D59]',
    limited: 'bg-[#D99A26]',
    unavailable: 'bg-[#D75D52]',
    unknown: 'bg-[#858A83]',
  }[status];

  const label = {
    available: 'Available Now',
    limited: 'Limited Stock',
    unavailable: 'Unavailable',
    unknown: 'Status Unknown',
  }[status];

  const variant = status as 'available' | 'limited' | 'unavailable' | 'unknown';

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <Badge variant={variant} size="sm">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
        <span>{label}</span>
      </Badge>
      {source === 'demo' && (
        <span className="text-[10px] text-campus-grey uppercase tracking-wider font-medium">
          Demo
        </span>
      )}
    </div>
  );
};

