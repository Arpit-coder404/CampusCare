export type AvailabilityStatus = 'available' | 'limited' | 'unavailable' | 'unknown';
export type AvailabilitySource = 'demo' | 'verified' | 'live';
export type ResourceType = 'essential' | 'service' | 'support';

export type EssentialCategory =
  | 'chargers'
  | 'stationery'
  | 'hygiene'
  | 'first-aid'
  | 'tech'
  | 'personal-care'
  | 'weather'
  | 'academic';

export type ServiceCategory =
  | 'printing'
  | 'medical'
  | 'repairs'
  | 'help-desk'
  | 'supplies'
  | 'administrative';

export type SupportCategory =
  | 'first-aid'
  | 'security'
  | 'medical'
  | 'wellbeing'
  | 'student-office'
  | 'emergency';

export interface LocationDetail {
  locationId: string;
  floor?: string;
  room?: string;
  notes?: string;
  availability: AvailabilityStatus;
  stockCountApprox?: number;
}

export interface Resource {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: EssentialCategory;
  type: 'essential';
  locationId: string; // Primary location
  additionalLocations?: LocationDetail[];
  price?: number; // 0 for free/loan
  isFreeOrLoan?: boolean;
  loanDuration?: string;
  availability: AvailabilityStatus;
  availabilitySource: AvailabilitySource;
  lastUpdated?: string;
  image: string;
  tags: string[];
  popular?: boolean;
  urgentNeed?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  type: 'service';
  locationId: string;
  shortDescription: string;
  description: string;
  hours: string;
  isOpenNow: boolean;
  statusText: string;
  contactEmail?: string;
  contactPhone?: string; // Clearly demo
  servicesOffered: string[];
  image: string;
  tags: string[];
}

export interface SupportContact {
  id: string;
  name: string;
  category: SupportCategory;
  type: 'support';
  locationId: string;
  locationName: string;
  phone: string; // explicitly marked demo
  hours: string;
  availability: AvailabilityStatus;
  description: string;
  immediateAction: string;
  isUrgent: boolean;
  guidelines?: string[];
}

export interface CampusLocation {
  id: string;
  name: string;
  building: string;
  zone: 'North' | 'South' | 'Central' | 'East' | 'West';
  description: string;
  category: 'academic' | 'student-life' | 'health-safety' | 'services' | 'residence';
  x: number; // percentage coordinates 0-100 on interactive SVG campus map
  y: number; // percentage coordinates 0-100
  accessibleEntrance?: boolean;
  openHours: string;
}

export interface UserReport {
  id: string;
  resourceId?: string;
  resourceName: string;
  locationId: string;
  locationName: string;
  reportType: 'stock_empty' | 'stock_available' | 'wrong_hours' | 'wrong_location' | 'broken_service' | 'new_suggestion';
  statusReported?: AvailabilityStatus;
  description: string;
  photoUrl?: string;
  isAnonymous: boolean;
  reporterName?: string;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  studentId: string;
  preferredCampus: string;
  defaultBuilding: string;
  notifyOnRestock: boolean;
  highContrastMode: boolean;
}

