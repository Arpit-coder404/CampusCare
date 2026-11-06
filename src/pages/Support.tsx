import React, { useState } from 'react';
import {
  LifeBuoy,
  Phone,
  Clock,
  MapPin,
  ShieldAlert,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  Settings,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';
import { SUPPORT_RESOURCES } from '../data/support';
import { SupportCategory, SupportContact } from '../types';
import { AvailabilityBadge } from '../components/ui/Badge';
import { useCampusCareStore } from '../store/campusCareStore';

export const Support: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSupportModal, setActiveSupportModal] = useState<SupportContact | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { addToast } = useCampusCareStore();

  const categories = [
    { id: 'all', label: 'All Support Resources' },
    { id: 'security', label: 'Campus Safety & Security' },
    { id: 'first-aid', label: 'First Aid & Medical' },
    { id: 'wellbeing', label: 'Mental Wellbeing' },
    { id: 'student-office', label: 'Student Relief & Advocacy' },
    { id: 'emergency', label: 'Hazards & Poison' },
  ];

  const filteredResources = SUPPORT_RESOURCES.filter((res) => {
    if (selectedCategory === 'all') return true;
    return res.category === selectedCategory;
  });

  const handleCopyPhone = (phone: string, id: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    addToast('Demo contact copied to clipboard', 'info');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-campus-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-campus-coral-light text-campus-coral border border-campus-coral/20 mb-2">
            <LifeBuoy className="w-3 h-3" />
            Verified Student Resources
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-campus-forest tracking-tight font-sans">
            Support when you need it.
          </h1>
          <p className="text-sm text-campus-charcoal-muted mt-1 max-w-xl">
            Find the right campus resource, quickly. CampusCare helps you locate trusted emergency escorts, first aid stations, and confidential counseling.
          </p>
        </div>

        {/* Administrator Configuration Button */}
        <button
          onClick={() => setAdminModalOpen(true)}
          className="self-start md:self-auto px-3.5 py-2 rounded-xl bg-white border border-campus-border text-campus-charcoal hover:bg-campus-ivory text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors"
        >
          <Settings className="w-3.5 h-3.5 text-campus-forest" />
          <span>Admin Data Integration</span>
        </button>
      </div>

      {/* 2. Urgent Immediate Safety Banner */}
      <div className="rounded-3xl bg-[#FFF6F5] border-2 border-campus-coral/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-subtle">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-campus-coral text-white flex items-center justify-center font-bold">
              !
            </div>
            <h2 className="text-lg font-bold text-campus-charcoal font-sans">
              Immediate Danger or Medical Emergency?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-campus-charcoal-muted leading-relaxed">
            If you are experiencing an acute life-threatening medical emergency or are in immediate physical danger, dial your local emergency services (e.g. 911 / 112) or the nearest verified campus security dispatch immediately.
          </p>
          <p className="text-[11px] text-campus-grey italic">
            * Note: All phone numbers shown in this student prototype are simulated placeholders (+1 555-019-XXXX).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
          <a
            href="tel:5550199911"
            className="px-5 py-3 rounded-2xl bg-campus-coral text-white font-bold text-xs hover:bg-[#C24E43] transition-all text-center flex items-center justify-center gap-2 shadow-subtle"
          >
            <Phone className="w-4 h-4" />
            <span>Call Campus Security [Demo]</span>
          </a>
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-campus-forest text-white shadow-subtle'
                : 'bg-white text-campus-charcoal border border-campus-border hover:bg-campus-mint/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 4. Support Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className={`bg-white rounded-3xl border transition-all p-6 flex flex-col justify-between ${
              res.isUrgent
                ? 'border-campus-coral/30 shadow-subtle hover:border-campus-coral'
                : 'border-campus-border shadow-2xs hover:shadow-card hover:border-campus-green/40'
            }`}
          >
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    res.isUrgent
                      ? 'bg-campus-coral-light text-campus-coral border border-campus-coral/20'
                      : 'bg-campus-mint text-campus-forest border border-campus-green/20'
                  }`}
                >
                  {res.category.replace('-', ' ')}
                </span>
                <span className="text-xs text-campus-grey flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {res.hours.split('|')[0]}
                </span>
              </div>

              {/* Name & Location */}
              <h3 className="text-lg font-bold text-campus-charcoal font-sans leading-snug">
                {res.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-campus-forest font-semibold mt-1.5">
                <MapPin className="w-3.5 h-3.5 text-campus-green shrink-0" />
                <span>{res.locationName}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-campus-charcoal-muted mt-2.5 leading-relaxed">
                {res.description}
              </p>

              {/* Immediate Action guidance */}
              <div className="mt-3.5 p-3 rounded-2xl bg-campus-ivory text-xs text-campus-charcoal border border-campus-border/60">
                <span className="font-bold text-campus-forest block mb-0.5">
                  Guidance:
                </span>
                {res.immediateAction}
              </div>
            </div>

            {/* Bottom Contact & Action */}
            <div className="mt-6 pt-4 border-t border-campus-border flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-campus-forest">
                  {res.phone}
                </span>
                <button
                  onClick={() => handleCopyPhone(res.phone, res.id)}
                  className="p-1 text-campus-grey hover:text-campus-charcoal rounded-md transition-colors"
                  title="Copy contact"
                >
                  {copiedId === res.id ? (
                    <Check className="w-3.5 h-3.5 text-campus-green" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <button
                onClick={() => setActiveSupportModal(res)}
                className="px-3.5 py-1.5 rounded-xl bg-campus-forest text-white font-bold text-xs hover:bg-campus-forest-dark transition-all"
              >
                View Protocol & Guidelines
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Support Detail Protocol Modal */}
      {activeSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-campus-border shadow-floating animate-in zoom-in-95">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-campus-border">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-campus-forest bg-campus-mint px-2 py-0.5 rounded-full">
                  {activeSupportModal.category}
                </span>
                <h3 className="text-xl font-bold text-campus-charcoal mt-1.5">
                  {activeSupportModal.name}
                </h3>
                <p className="text-xs text-campus-grey mt-0.5">{activeSupportModal.locationName}</p>
              </div>
              <button
                onClick={() => setActiveSupportModal(null)}
                className="p-1 rounded-xl text-campus-grey hover:text-campus-charcoal hover:bg-campus-ivory"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-campus-forest uppercase tracking-wider text-[11px] mb-1">
                  Immediate Operating Instructions
                </h4>
                <p className="text-campus-charcoal leading-relaxed bg-campus-ivory p-3 rounded-xl border border-campus-border">
                  {activeSupportModal.immediateAction}
                </p>
              </div>

              {activeSupportModal.guidelines && (
                <div>
                  <h4 className="font-bold text-campus-forest uppercase tracking-wider text-[11px] mb-1.5">
                    Campus Protocol & Access Notes
                  </h4>
                  <ul className="space-y-1.5 pl-1">
                    {activeSupportModal.guidelines.map((guide, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-campus-charcoal-muted leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-campus-green shrink-0 mt-0.5" />
                        <span>{guide}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-3 rounded-xl bg-campus-coral-light/60 border border-campus-coral/20 text-campus-charcoal">
                <span className="font-bold text-campus-coral block mb-0.5">
                  Simulated Demo Notice:
                </span>
                Contact: <strong className="font-mono">{activeSupportModal.phone}</strong>. This helpline is a prototype demonstration placeholder.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveSupportModal(null)}
                className="px-5 py-2.5 rounded-xl bg-campus-forest text-white text-xs font-bold hover:bg-campus-forest-dark"
              >
                Close Protocol
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Admin Data Integration Modal */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-campus-border shadow-floating animate-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-campus-border">
              <div>
                <h3 className="text-lg font-bold text-campus-forest">
                  Campus Administrator Data Integration
                </h3>
                <p className="text-xs text-campus-grey mt-0.5">
                  How university staff connect verified live resources.
                </p>
              </div>
              <button
                onClick={() => setAdminModalOpen(false)}
                className="p-1 rounded-xl text-campus-grey hover:text-campus-charcoal"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-3 text-campus-charcoal leading-relaxed">
              <p>
                <strong>CampusCare</strong> is designed to run self-contained without external API keys or cloud dependencies for secure prototype evaluation.
              </p>
              <div className="p-3 rounded-xl bg-campus-ivory border border-campus-border space-y-1.5 font-mono text-[11px]">
                <div className="text-campus-forest font-bold font-sans">Institutional Deployment Configuration:</div>
                <div>1. Connect your university directory via SAML / OAuth 2.0.</div>
                <div>2. Replace data/support.ts with your verified campus dispatch endpoints.</div>
                <div>3. Sync facilities inventory via university ERP or library circulation webhooks.</div>
              </div>
              <p className="text-campus-charcoal-muted">
                All mock contacts and stock numbers will instantly switch to <span className="font-semibold text-campus-green">"Verified Institutional Feeds"</span>.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setAdminModalOpen(false);
                  addToast('Administrator guidelines acknowledged', 'info');
                }}
                className="px-4 py-2 rounded-xl bg-campus-forest text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

