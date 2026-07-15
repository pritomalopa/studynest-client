import api, { unwrapApiData } from "./axios";
import { Booking, Tutor } from "../types";

export const getTutorsRequest = async (params?: {
  subject?: string;
  maxRate?: number;
}): Promise<Tutor[]> => {
  const { data } = await api.get("/tutors", { params });
  return unwrapApiData<Tutor[]>(data);
};

export const getTutorByIdRequest = async (id: string): Promise<Tutor> => {
  const { data } = await api.get(`/tutors/${id}`);
  return unwrapApiData<Tutor>(data);
};

export const bookTutorRequest = async (
  id: string,
  payload: { subject: string; date: string; timeSlot: string }
): Promise<Booking> => {
  const { data } = await api.post(`/tutors/${id}/book`, payload);
  return unwrapApiData<Booking>(data);
};

export const getMyBookingsRequest = async (): Promise<{
  asStudent: Booking[];
  asTutor: Booking[];
}> => {
  const { data } = await api.get("/tutors/bookings/mine");
  return unwrapApiData<{ asStudent: Booking[]; asTutor: Booking[] }>(data);
};
