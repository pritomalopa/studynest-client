export type UserRole = "student" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  university?: string;
  avatarUrl?: string;
  bio?: string;
  isTutor: boolean;
  tutorSubjects: string[];
  hourlyRate?: number;
}

export type ResourceType = "notes" | "book" | "slides" | "video";
export type PriceType = "free" | "paid";

export interface Resource {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  subject: string;
  resourceType: ResourceType;
  priceType: PriceType;
  price: number;
  coverImageUrl: string;
  fileUrl: string;
  uploader: { _id: string; name: string; avatarUrl?: string; university?: string } | string;
  avgRating: number;
  reviewCount: number;
  downloadCount: number;
  createdAt: string;
}

export interface Review {
  _id: string;
  resource: string;
  user: { _id: string; name: string; avatarUrl?: string };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface StudyGroup {
  _id: string;
  name: string;
  subject: string;
  description: string;
  coverImageUrl: string;
  creator: { _id: string; name: string; avatarUrl?: string; university?: string } | string;
  members: { _id: string; name: string; avatarUrl?: string }[] | string[];
  meetingSchedule: string;
  createdAt: string;
}

export interface Tutor {
  _id: string;
  name: string;
  avatarUrl?: string;
  university?: string;
  bio?: string;
  tutorSubjects: string[];
  hourlyRate: number;
}

export interface Booking {
  _id: string;
  tutor: { _id: string; name: string; avatarUrl?: string } | string;
  student: { _id: string; name: string; avatarUrl?: string } | string;
  subject: string;
  date: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface PaginatedResources {
  data: Resource[];
  page: number;
  totalPages: number;
  totalResults: number;
}
