import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  MapPin,
  Bell,
  Eye,
  Heart,
  Clock,
  CheckCircle2,
  Sparkles,
  Edit3,
  Save,
  RotateCcw,
  Compass,
  ArrowRight,
  FilePlus2,
} from 'lucide-react';
import { useCampusCareStore } from '../store/campusCareStore';
import { ESSENTIALS_RESOURCES } from '../data/resources';
import { CAMPUS_LOCATIONS } from '../data/locations';
import { DemoNotice } from '../components/ui/DemoNotice';
import { AvailabilityBadge } from '../components/ui/Badge';

export const Profile: React.FC = () => {
  const { profile, updateProfile, favorites, recentlyViewedIds, reports, addToast } = useCampusCareStore();
  const [editing, setEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState(profile);

  const savedItems = ESSENTIALS_RESOURCES.filter((r) => favorites.includes(r.id)).slice(0, 4);
  const recentItems = ESSENTIALS_RESOURCES.filter((r) => recentlyViewedIds.includes(r.id)).slice(0, 4);

  const handleSave = () => {
    updateProfile(localProfile);
    setEditing(false);
  };

  const handleCancel = () => {
    setLocalProfile(profile);
    setEditing(false);
  };

  const campusBuildings = CAMPUS_LOCATIONS.map((l) => l.name);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-campus-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-campus-mint text-campus-forest border border-campus-green/20 mb-2">
            <User className="w-3 h-3" />
            Student Profile — Local Demo Mode
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-campus-forest tracking-tight font-sans">
            Your Profile
          </h1>
          <p className="text-sm text-campus-charcoal-muted mt-1">
            Personalize your CampusCare experience. All data is stored locally in your browser.
          </p>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-white border border-campus-border text-xs font-bold text-campus-charcoal hover:bg-campus-ivory flex items-center gap-2 shadow-2xs transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-campus-forest" />
            Edit Preferences
          </button>
        ) : (
          <div className="flex gap-2 self-start md:self-auto">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl bg-campus-ivory border border-campus-border text-xs font-bold text-campus-charcoal hover:bg-white flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-campus-forest text-white text-xs font-bold hover:bg-campus-forest-dark flex items-center gap-1.5 shadow-subtle transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Identity Card */}
      <div className="bg-white rounded-3xl border border-campus-border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-2xl bg-campus-forest text-white text-2xl font-black flex items-center justify-center shrink-0 shadow-card">
          {profile.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
        </div>

        {/* Identity Fields */}
        <div className="flex-1 space-y-3 w-full">
          {editing ? (
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-campus-grey block mb-1">
                  Display Name
                </label>
                <input
                  value={localProfile.name}
                  onChange={(e) => setLocalProfile({ ...localProfile, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-campus-ivory rounded-xl border border-campus-border text-sm font-semibold text-campus-charcoal focus:outline-none focus:border-campus-forest"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-campus-grey block mb-1">
                  Preferred Campus Zone
                </label>
                <input
                  value={localProfile.preferredCampus}
                  onChange={(e) => setLocalProfile({ ...localProfile, preferredCampus: e.target.value })}
                  className="w-full px-4 py-2.5 bg-campus-ivory rounded-xl border border-campus-border text-sm font-medium text-campus-charcoal focus:outline-none focus:border-campus-forest"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-campus-grey block mb-1">
                  Default Building
                </label>
                <select
                  value={localProfile.defaultBuilding}
                  onChange={(e) => setLocalProfile({ ...localProfile, defaultBuilding: e.target.value })}
                  className="w-full px-4 py-2.5 bg-campus-ivory rounded-xl border border-campus-border text-sm font-medium text-campus-charcoal focus:outline-none focus:border-campus-forest"
                >
                  {campusBuildings.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-campus-grey">Name</div>
                <div className="text-base font-bold text-campus-charcoal mt-0.5">{profile.name}</div>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-campus-grey">Student ID</div>
                <div className="text-sm font-mono font-bold text-campus-forest mt-0.5">{profile.studentId}</div>
                <div className="text-[10px] text-campus-grey italic">Demo identifier</div>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-campus-grey">Default Building</div>
                <div className="text-sm font-semibold text-campus-charcoal mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-campus-green shrink-0" />
                  <span>{profile.defaultBuilding}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-3xl border border-campus-border p-6 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-campus-forest flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-campus-green" />
          Notification & Display Preferences
        </h2>

        <div className="space-y-3">
          <label className="flex items-center justify-between gap-4 cursor-pointer p-3 rounded-xl hover:bg-campus-ivory transition-colors">
            <div>
              <span className="text-sm font-semibold text-campus-charcoal flex items-center gap-2">
                <Bell className="w-4 h-4 text-campus-forest" />
                Notify when items restock
              </span>
              <span className="text-xs text-campus-grey block mt-0.5 ml-6">Get alerts when saved items become available again (simulated demo).</span>
            </div>
            <button
              onClick={() => {
                const updated = { ...localProfile, notifyOnRestock: !localProfile.notifyOnRestock };
                setLocalProfile(updated);
                if (!editing) {
                  updateProfile({ notifyOnRestock: updated.notifyOnRestock });
                }
              }}
              className={`w-11 h-6 rounded-full transition-all shrink-0 relative ${
                localProfile.notifyOnRestock ? 'bg-campus-forest' : 'bg-campus-grey-light'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-subtle transition-all ${
                  localProfile.notifyOnRestock ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between gap-4 cursor-pointer p-3 rounded-xl hover:bg-campus-ivory transition-colors">
            <div>
              <span className="text-sm font-semibold text-campus-charcoal flex items-center gap-2">
                <Eye className="w-4 h-4 text-campus-forest" />
                High contrast display mode
              </span>
              <span className="text-xs text-campus-grey block mt-0.5 ml-6">Improves text legibility and UI borders (prototype accessibility preference).</span>
            </div>
            <button
              onClick={() => {
                const updated = { ...localProfile, highContrastMode: !localProfile.highContrastMode };
                setLocalProfile(updated);
                if (!editing) {
                  updateProfile({ highContrastMode: updated.highContrastMode });
                }
              }}
              className={`w-11 h-6 rounded-full transition-all shrink-0 relative ${
                localProfile.highContrastMode ? 'bg-campus-forest' : 'bg-campus-grey-light'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-subtle transition-all ${
                  localProfile.highContrastMode ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Saved Essentials', value: favorites.length, icon: Heart, color: 'text-campus-coral', link: '/favorites' },
          { label: 'Recently Viewed', value: recentlyViewedIds.length, icon: Clock, color: 'text-campus-forest', link: '/discover' },
          { label: 'Reports Submitted', value: reports.length, icon: FilePlus2, color: 'text-campus-green', link: '/report' },
          { label: 'Campus Buildings', value: CAMPUS_LOCATIONS.length, icon: MapPin, color: 'text-campus-amber', link: '/map' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              to={stat.link}
              className="bg-white rounded-2xl border border-campus-border p-4 text-center hover:shadow-card hover:border-campus-green/40 transition-all group"
            >
              <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-extrabold text-campus-forest">{stat.value}</div>
              <div className="text-[11px] font-semibold text-campus-grey mt-0.5 leading-tight">{stat.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Saved Items Preview */}
      {savedItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-campus-forest flex items-center gap-2 uppercase tracking-wider">
              <Heart className="w-4 h-4 text-campus-coral" />
              Saved Essentials
            </h2>
            <Link to="/favorites" className="text-xs font-bold text-campus-forest hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {savedItems.map((item) => (
              <Link
                key={item.id}
                to={`/essentials/${item.id}`}
                className="bg-white rounded-2xl border border-campus-border p-3 hover:shadow-card hover:border-campus-green/40 transition-all group"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-campus-ivory">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="text-xs font-bold text-campus-charcoal line-clamp-1 group-hover:text-campus-forest">{item.name}</div>
                <AvailabilityBadge status={item.availability} size="sm" className="mt-1" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recentItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-campus-forest flex items-center gap-2 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-campus-forest" />
              Recently Viewed
            </h2>
            <Link to="/discover" className="text-xs font-bold text-campus-forest hover:underline flex items-center gap-1">
              Browse catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {recentItems.map((item) => (
              <Link
                key={item.id}
                to={`/essentials/${item.id}`}
                className="bg-white rounded-2xl border border-campus-border p-3 hover:shadow-card hover:border-campus-green/40 transition-all group"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-campus-ivory">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="text-xs font-bold text-campus-charcoal line-clamp-1 group-hover:text-campus-forest">{item.name}</div>
                <div className="text-[10px] text-campus-grey mt-0.5">{item.category}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Reports Log */}
      {reports.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-campus-forest flex items-center gap-2 uppercase tracking-wider">
              <FilePlus2 className="w-4 h-4 text-campus-green" />
              Your Availability Reports (Demo)
            </h2>
          </div>
          <div className="space-y-2">
            {reports.slice(0, 3).map((rep) => (
              <div key={rep.id} className="p-3.5 bg-white rounded-2xl border border-campus-border flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-campus-charcoal">{rep.resourceName}</div>
                  <div className="text-campus-grey mt-0.5">{rep.locationName} • {rep.createdAt}</div>
                </div>
                <div className="text-campus-forest font-semibold capitalize shrink-0">
                  {rep.reportType.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
          <Link to="/report" className="inline-flex items-center gap-1.5 text-xs font-bold text-campus-forest hover:underline">
            <FilePlus2 className="w-3.5 h-3.5" />
            Submit a new availability report
          </Link>
        </div>
      )}

      <DemoNotice />
    </div>
  );
};

