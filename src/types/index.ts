/**
 * Healthcare app types and interfaces
 */

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phone?: string;
  address?: Address;
  medicalHistory?: MedicalHistory;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Medical types
export interface MedicalHistory {
  allergies: string[];
  conditions: string[];
  medications: Medication[];
  surgeries: Surgery[];
  vaccinations: Vaccination[];
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  prescribedBy: string;
}

export interface Surgery {
  id: string;
  name: string;
  date: Date;
  location: string;
  notes?: string;
}

export interface Vaccination {
  id: string;
  name: string;
  date: Date;
  location: string;
  provider: string;
}

// Appointment types
export interface Appointment {
  id: string;
  userId: string;
  providerId: string;
  date: Date;
  duration: number; // in minutes
  type: 'in-person' | 'telemedicine' | 'phone';
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Healthcare provider types
export interface HealthcareProvider {
  id: string;
  name: string;
  license: string;
  specialties: string[];
  phone: string;
  email: string;
  address: Address;
  availableHours: AvailableHours;
  acceptsInsurance: string[];
  languages: string[];
  bio?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AvailableHours {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string; // HH:mm format
}

// Health record types
export interface HealthRecord {
  id: string;
  userId: string;
  recordType: 'lab' | 'imaging' | 'consultation' | 'prescription';
  date: Date;
  title: string;
  description: string;
  provider: string;
  attachments?: Attachment[];
  createdAt: Date;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  type: string;
  size: number;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Auth types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface Session {
  user: User;
  token: AuthToken;
  expiresAt: Date;
}
