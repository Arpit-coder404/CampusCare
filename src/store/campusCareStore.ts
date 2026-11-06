import { create } from 'zustand';
import { UserProfile, UserReport, AvailabilityStatus } from '../types';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'alert';
}

interface CampusCareState {
  // Favorites
  favorites: string[];
  toggleFavorite: (id: string, name?: string) => void;
  isFavorite: (id: string) => boolean;

  // Search & Navigation
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Discovery Filters
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedAvailability: string;
  setSelectedAvailability: (availability: string) => void;
  selectedLocation: string;
  setSelectedLocation: (locationId: string) => void;
  sortBy: 'closest' | 'available' | 'price-asc' | 'popular';
  setSortBy: (sort: 'closest' | 'available' | 'price-asc' | 'popular') => void;

  // Map state
  selectedMapLocationId: string | null;
  setSelectedMapLocationId: (locationId: string | null) => void;

  // Reports
  reports: UserReport[];
  addReport: (report: Omit<UserReport, 'id' | 'createdAt'>) => void;

  // Profile
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;

  // Recently Viewed Items
  recentlyViewedIds: string[];
  addRecentlyViewed: (id: string) => void;

  // Dynamic Toast Notifications
  toasts: ToastState[];
  addToast: (message: string, type?: 'success' | 'info' | 'alert') => void;
  removeToast: (id: string) => void;
}

const STORAGE_KEY_FAVORITES = 'campuscare_favorites_v1';
const STORAGE_KEY_REPORTS = 'campuscare_reports_v1';
const STORAGE_KEY_PROFILE = 'campuscare_profile_v1';
const STORAGE_KEY_RECENTS = 'campuscare_recents_v1';
const STORAGE_KEY_RECENT_VIEWED = 'campuscare_viewed_v1';

const getInitialFavorites = (): string[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEY_FAVORITES);
    return item ? JSON.parse(item) : ['ess-usb-c-65w', 'ess-sanitary-pads', 'ess-first-aid-kit'];
  } catch {
    return ['ess-usb-c-65w', 'ess-sanitary-pads'];
  }
};

const getInitialReports = (): UserReport[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEY_REPORTS);
    if (item) return JSON.parse(item);
  } catch {
    // fallback
  }
  return [
    {
      id: 'rep-demo-1',
      resourceId: 'ess-umbrella',
      resourceName: 'Windproof Compact Campus Umbrella',
      locationId: 'loc-main-library',
      locationName: 'W.E.B. Du Bois Main Library',
      reportType: 'stock_available',
      statusReported: 'available',
      description: 'Restocked at front entrance umbrella stand near security barrier.',
      isAnonymous: false,
      reporterName: 'Jordan K.',
      createdAt: 'Today, 10:15 AM',
    },
    {
      id: 'rep-demo-2',
      resourceId: 'ess-graphing-calc',
      resourceName: 'TI-84 Plus CE Color Graphing Calculator',
      locationId: 'loc-engineering-quad',
      locationName: 'Engineering & Innovation Hall',
      reportType: 'stock_empty',
      statusReported: 'limited',
      description: 'Only 1 calculator left at desk; 2 other units returned for charging.',
      isAnonymous: true,
      createdAt: 'Today, 09:30 AM',
    },
  ];
};

const getInitialProfile = (): UserProfile => {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (item) return JSON.parse(item);
  } catch {
    // fallback
  }
  return {
    name: 'Alex Rivera',
    studentId: 'ST-948201',
    preferredCampus: 'Central Academic Campus',
    defaultBuilding: 'W.E.B. Du Bois Main Library',
    notifyOnRestock: true,
    highContrastMode: false,
  };
};

const getInitialRecents = (): string[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEY_RECENTS);
    return item ? JSON.parse(item) : ['charger', 'first aid', 'umbrella', 'notebook'];
  } catch {
    return ['charger', 'first aid'];
  }
};

const getInitialViewed = (): string[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEY_RECENT_VIEWED);
    return item ? JSON.parse(item) : ['ess-usb-c-65w', 'ess-first-aid-kit', 'ess-sanitary-pads'];
  } catch {
    return [];
  }
};

export const useCampusCareStore = create<CampusCareState>((set, get) => ({
  favorites: getInitialFavorites(),
  toggleFavorite: (id: string, name?: string) => {
    const current = get().favorites;
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(updated));
    } catch {
      // ignore
    }
    set({ favorites: updated });

    const toastMessage = exists
      ? `Removed ${name || 'item'} from your favorites`
      : `Saved ${name || 'item'} to favorites`;
    get().addToast(toastMessage, 'info');
  },
  isFavorite: (id: string) => get().favorites.includes(id),

  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  recentSearches: getInitialRecents(),
  addRecentSearch: (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const current = get().recentSearches.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...current].slice(0, 8);
    try {
      localStorage.setItem(STORAGE_KEY_RECENTS, JSON.stringify(updated));
    } catch {
      // ignore
    }
    set({ recentSearches: updated });
  },
  clearRecentSearches: () => {
    try {
      localStorage.removeItem(STORAGE_KEY_RECENTS);
    } catch {
      // ignore
    }
    set({ recentSearches: [] });
  },

  selectedCategory: 'all',
  setSelectedCategory: (category: string) => set({ selectedCategory: category }),
  selectedAvailability: 'all',
  setSelectedAvailability: (availability: string) => set({ selectedAvailability: availability }),
  selectedLocation: 'all',
  setSelectedLocation: (locationId: string) => set({ selectedLocation: locationId }),
  sortBy: 'closest',
  setSortBy: (sort) => set({ sortBy: sort }),

  selectedMapLocationId: null,
  setSelectedMapLocationId: (locationId: string | null) => set({ selectedMapLocationId: locationId }),

  reports: getInitialReports(),
  addReport: (reportData) => {
    const newReport: UserReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      createdAt: 'Just now',
    };
    const updated = [newReport, ...get().reports];
    try {
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(updated));
    } catch {
      // ignore
    }
    set({ reports: updated });
    get().addToast('Thanks for helping keep CampusCare accurate! (Stored in local demo)', 'success');
  },

  profile: getInitialProfile(),
  updateProfile: (updatedData) => {
    const updated = { ...get().profile, ...updatedData };
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updated));
    } catch {
      // ignore
    }
    set({ profile: updated });
    get().addToast('Profile preferences updated', 'success');
  },

  recentlyViewedIds: getInitialViewed(),
  addRecentlyViewed: (id: string) => {
    const current = get().recentlyViewedIds.filter((item) => item !== id);
    const updated = [id, ...current].slice(0, 10);
    try {
      localStorage.setItem(STORAGE_KEY_RECENT_VIEWED, JSON.stringify(updated));
    } catch {
      // ignore
    }
    set({ recentlyViewedIds: updated });
  },

  toasts: [],
  addToast: (message: string, type: 'success' | 'info' | 'alert' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },
  removeToast: (id: string) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));

