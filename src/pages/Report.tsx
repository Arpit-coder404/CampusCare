import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FilePlus2,
  CheckCircle2,
  Upload,
  X,
  Info,
  Sparkles,
  MapPin,
  ArrowLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ESSENTIALS_RESOURCES } from '../data/resources';
import { CAMPUS_LOCATIONS } from '../data/locations';
import { useCampusCareStore } from '../store/campusCareStore';
import { UserReport } from '../types';

export const Report: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preResourceName = searchParams.get('resource') || '';
  const preLocationId = searchParams.get('location') || '';

  const { addReport, reports } = useCampusCareStore();

  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [resourceName, setResourceName] = useState(preResourceName);
  const [locationId, setLocationId] = useState(preLocationId);
  const [reportType, setReportType] = useState<UserReport['reportType']>('stock_available');
  const [statusReported, setStatusReported] = useState<string>('available');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reporterName, setReporterName] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Photo upload handler (local only, no network)
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, photo: 'Please upload an image file.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, photo: 'Image must be under 5MB.' }));
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      setPhotoPreview(evt.target?.result as string);
      setErrors((prev) => ({ ...prev, photo: '' }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!resourceName.trim()) errs.resourceName = 'Please enter the item or service name.';
    if (!locationId) errs.locationId = 'Please select a campus location.';
    if (!description.trim() || description.trim().length < 10)
      errs.description = 'Please add a brief description (at least 10 characters).';
    if (!isAnonymous && !reporterName.trim())
      errs.reporterName = 'Please enter your name, or choose anonymous reporting.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const selectedLocation = CAMPUS_LOCATIONS.find((l) => l.id === locationId);

    addReport({
      resourceId: ESSENTIALS_RESOURCES.find((r) => r.name.toLowerCase() === resourceName.toLowerCase())?.id,
      resourceName: resourceName.trim(),
      locationId,
      locationName: selectedLocation?.name || locationId,
      reportType,
      statusReported: statusReported as UserReport['statusReported'],
      description: description.trim(),
      photoUrl: photoPreview || undefined,
      isAnonymous,
      reporterName: isAnonymous ? undefined : reporterName.trim(),
    });

    setSubmitted(true);
  };

  const reportTypeOptions: { id: UserReport['reportType']; label: string; desc: string }[] = [
    { id: 'stock_available', label: 'Item back in stock', desc: 'An item you expected to be empty is now available.' },
    { id: 'stock_empty', label: 'Item out of stock', desc: 'A listed available item is now depleted or missing.' },
    { id: 'wrong_hours', label: 'Opening hours are incorrect', desc: 'The listed hours do not match the posted sign.' },
    { id: 'wrong_location', label: 'Incorrect location listed', desc: 'The item or service is in a different building or room.' },
    { id: 'broken_service', label: 'Service unavailable or broken', desc: 'A printer, kiosk, or service is non-functional.' },
    { id: 'new_suggestion', label: 'Suggest a new resource', desc: 'Report a supply point or service not yet listed.' },
  ];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-campus-mint flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-campus-forest" />
        </div>
        <h2 className="text-2xl font-extrabold text-campus-forest font-sans">
          Thanks for helping keep CampusCare accurate.
        </h2>
        <p className="text-sm text-campus-charcoal-muted leading-relaxed max-w-md mx-auto">
          Your report has been received and stored locally in this demo prototype. In a live campus deployment, it would be automatically forwarded to campus facilities staff.
        </p>
        <div className="p-4 rounded-2xl bg-campus-ivory border border-campus-border text-xs text-campus-charcoal-muted text-left space-y-1 max-w-sm mx-auto">
          <div className="font-bold text-campus-forest mb-1 text-sm">Your report summary:</div>
          <div><span className="font-semibold">Item/Service:</span> {resourceName}</div>
          <div><span className="font-semibold">Location:</span> {CAMPUS_LOCATIONS.find((l) => l.id === locationId)?.name}</div>
          <div><span className="font-semibold">Report type:</span> {reportTypeOptions.find((r) => r.id === reportType)?.label}</div>
          <div className="mt-2 p-2 rounded-lg bg-campus-mint/50 text-campus-charcoal-muted">
            <Info className="w-3.5 h-3.5 inline mr-1 text-campus-forest" />
            Stored in demo LocalStorage — not sent to campus staff.
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <button
            onClick={() => {
              setSubmitted(false);
              setResourceName('');
              setLocationId('');
              setReportType('stock_available');
              setDescription('');
              setIsAnonymous(false);
              setReporterName('');
              setPhotoPreview(null);
              setErrors({});
            }}
            className="px-5 py-2.5 rounded-xl bg-campus-forest text-white font-bold text-xs hover:bg-campus-forest-dark transition-all"
          >
            Submit Another Report
          </button>
          <Link
            to="/discover"
            className="px-5 py-2.5 rounded-xl bg-white border border-campus-border text-campus-charcoal font-bold text-xs hover:bg-campus-ivory transition-all"
          >
            Back to Discovery
          </Link>
        </div>

        {/* Recent Reports Preview */}
        {reports.length > 0 && (
          <div className="mt-8 text-left space-y-3 max-w-md mx-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-campus-grey">
              Your Recent Reports (Demo LocalStorage)
            </h3>
            {reports.slice(0, 3).map((rep) => (
              <div key={rep.id} className="p-3 rounded-xl bg-white border border-campus-border text-xs space-y-0.5">
                <div className="font-semibold text-campus-charcoal">{rep.resourceName}</div>
                <div className="text-campus-grey">{rep.locationName} • {rep.createdAt}</div>
                <div className="text-campus-forest font-medium">
                  {reportTypeOptions.find((r) => r.id === rep.reportType)?.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-campus-border space-y-2">
        <Link to="/discover" className="inline-flex items-center gap-1.5 text-xs font-bold text-campus-forest hover:underline mb-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Discovery
        </Link>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-campus-mint text-campus-forest border border-campus-green/20">
          <FilePlus2 className="w-3 h-3" />
          Community Availability Report
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-campus-forest tracking-tight font-sans">
          Report Availability
        </h1>
        <p className="text-sm text-campus-charcoal-muted">
          Help your fellow students by updating stock levels, correcting locations, and flagging unavailable services.
        </p>
      </div>

      {/* Demo Notice */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-campus-ivory border border-campus-border text-xs text-campus-charcoal-muted">
        <Info className="w-4 h-4 text-campus-forest shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-campus-charcoal">Prototype Mode: </span>
          Your report will be stored in your browser's LocalStorage for this demo session. In a live campus deployment, it would be routed to facilities management staff automatically.
        </div>
      </div>

      {/* Report Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Resource Name Field */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-campus-grey mb-1.5">
            Item, Supply, or Service Name <span className="text-campus-coral">*</span>
          </label>
          <input
            type="text"
            value={resourceName}
            onChange={(e) => {
              setResourceName(e.target.value);
              setErrors((prev) => ({ ...prev, resourceName: '' }));
            }}
            placeholder="e.g. USB-C Charger, Sanitary Pads, Print Kiosk #3..."
            className={`w-full px-4 py-3 bg-white rounded-xl border text-sm font-medium text-campus-charcoal placeholder-campus-grey focus:outline-none focus:ring-2 focus:ring-campus-mint transition-all ${
              errors.resourceName ? 'border-campus-coral focus:border-campus-coral' : 'border-campus-border focus:border-campus-forest'
            }`}
          />
          {/* Smart suggestions */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {ESSENTIALS_RESOURCES.filter((r) =>
              resourceName.trim().length > 1
                ? r.name.toLowerCase().includes(resourceName.toLowerCase())
                : r.urgentNeed
            ).slice(0, 4).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setResourceName(r.name)}
                className="text-[11px] px-2 py-0.5 rounded-full bg-campus-mint text-campus-forest border border-campus-green/20 font-semibold hover:bg-campus-green hover:text-white transition-colors"
              >
                {r.name}
              </button>
            ))}
          </div>
          {errors.resourceName && (
            <p className="text-xs text-campus-coral mt-1 font-medium">{errors.resourceName}</p>
          )}
        </div>

        {/* Campus Location */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-campus-grey mb-1.5">
            Campus Location <span className="text-campus-coral">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-campus-grey absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={locationId}
              onChange={(e) => {
                setLocationId(e.target.value);
                setErrors((prev) => ({ ...prev, locationId: '' }));
              }}
              className={`w-full pl-9 pr-4 py-3 bg-white rounded-xl border text-sm font-medium text-campus-charcoal focus:outline-none focus:ring-2 focus:ring-campus-mint transition-all appearance-none ${
                errors.locationId ? 'border-campus-coral' : 'border-campus-border focus:border-campus-forest'
              }`}
            >
              <option value="">— Select a campus building or zone —</option>
              {CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.zone} Zone)
                </option>
              ))}
            </select>
          </div>
          {errors.locationId && (
            <p className="text-xs text-campus-coral mt-1 font-medium">{errors.locationId}</p>
          )}
        </div>

        {/* Report Type */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-campus-grey mb-2">
            Report Type <span className="text-campus-coral">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {reportTypeOptions.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setReportType(opt.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  reportType === opt.id
                    ? 'border-campus-forest bg-campus-mint/50 ring-2 ring-campus-mint'
                    : 'border-campus-border bg-white hover:border-campus-green/50 hover:bg-campus-ivory'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    reportType === opt.id ? 'border-campus-forest bg-campus-forest' : 'border-campus-grey'
                  }`}>
                    {reportType === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs font-bold text-campus-charcoal">{opt.label}</span>
                </div>
                <p className="text-[11px] text-campus-grey mt-1 ml-5.5 leading-snug">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Status Update (for stock reports) */}
        {(reportType === 'stock_available' || reportType === 'stock_empty') && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-campus-grey mb-1.5">
              Current Status You Observed
            </label>
            <div className="flex gap-2">
              {[
                { id: 'available', label: 'Available', color: 'text-campus-forest bg-campus-mint' },
                { id: 'limited', label: 'Limited', color: 'text-[#9A6B1A] bg-campus-amber-light' },
                { id: 'unavailable', label: 'Empty / Out', color: 'text-campus-coral bg-campus-coral-light' },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStatusReported(st.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    statusReported === st.id
                      ? `${st.color} border-current opacity-100 ring-2 ring-campus-mint`
                      : 'bg-white text-campus-grey border-campus-border hover:bg-campus-ivory'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-campus-grey mb-1.5">
            Description <span className="text-campus-coral">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: '' }));
            }}
            rows={4}
            placeholder="Briefly describe what you observed. (e.g. 'The USB-C charger rack near the Library entrance was fully empty at 2pm on Friday.')"
            className={`w-full px-4 py-3 bg-white rounded-xl border text-sm font-medium text-campus-charcoal placeholder-campus-grey focus:outline-none focus:ring-2 focus:ring-campus-mint transition-all resize-none ${
              errors.description ? 'border-campus-coral' : 'border-campus-border focus:border-campus-forest'
            }`}
          />
          <div className="flex justify-between mt-1">
            {errors.description ? (
              <p className="text-xs text-campus-coral font-medium">{errors.description}</p>
            ) : (
              <span />
            )}
            <span className="text-[11px] text-campus-grey">{description.length} characters</span>
          </div>
        </div>

        {/* Optional Photo Upload */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-campus-grey mb-1.5">
            Photo Evidence (Optional)
          </label>
          {photoPreview ? (
            <div className="relative w-full max-w-sm">
              <img src={photoPreview} alt="Uploaded evidence" className="rounded-xl border border-campus-border object-cover max-h-48 w-full" />
              <button
                type="button"
                onClick={() => setPhotoPreview(null)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 border border-campus-border text-campus-grey hover:text-campus-coral"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <span className="block text-[10px] text-campus-grey mt-1 italic">Photo preview only — not transmitted to any server in this demo.</span>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full max-w-sm py-6 px-4 rounded-2xl border-2 border-dashed border-campus-border bg-campus-ivory hover:border-campus-green/50 hover:bg-campus-mint/20 cursor-pointer transition-colors">
              <Upload className="w-6 h-6 text-campus-grey mb-2" />
              <span className="text-xs font-semibold text-campus-charcoal">Click to upload a photo</span>
              <span className="text-[11px] text-campus-grey mt-0.5">JPG, PNG, WEBP — max 5MB</span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          )}
          {errors.photo && (
            <p className="text-xs text-campus-coral mt-1 font-medium">{errors.photo}</p>
          )}
        </div>

        {/* Anonymous Toggle */}
        <div className="p-4 rounded-2xl bg-white border border-campus-border space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => {
                setIsAnonymous(e.target.checked);
                if (e.target.checked) setErrors((prev) => ({ ...prev, reporterName: '' }));
              }}
              className="w-4 h-4 rounded accent-campus-forest"
            />
            <div>
              <span className="text-sm font-bold text-campus-charcoal">Submit anonymously</span>
              <p className="text-[11px] text-campus-grey mt-0.5">Your name will not be associated with this report.</p>
            </div>
          </label>

          {!isAnonymous && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-campus-grey mb-1">
                Your Name <span className="text-campus-coral">*</span>
              </label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => {
                  setReporterName(e.target.value);
                  setErrors((prev) => ({ ...prev, reporterName: '' }));
                }}
                placeholder="Your first name or preferred campus name..."
                className={`w-full px-4 py-2.5 bg-campus-ivory rounded-xl border text-sm font-medium text-campus-charcoal placeholder-campus-grey focus:outline-none transition-all ${
                  errors.reporterName ? 'border-campus-coral' : 'border-campus-border focus:border-campus-forest'
                }`}
              />
              {errors.reporterName && (
                <p className="text-xs text-campus-coral mt-1 font-medium">{errors.reporterName}</p>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-campus-forest text-white font-bold text-sm hover:bg-campus-forest-dark transition-all shadow-subtle hover:shadow-card flex items-center justify-center gap-2"
        >
          <FilePlus2 className="w-4 h-4 text-campus-mint" />
          <span>Submit Campus Report</span>
        </button>
      </form>
    </div>
  );
};

