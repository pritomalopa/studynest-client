import api from "./axios";
import { User } from "../types";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  university?: string;
  isTutor?: boolean;
  tutorSubjects?: string[];
  hourlyRate?: number;
}

export const registerRequest = async (payload: RegisterPayload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const loginRequest = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const googleLoginRequest = async (idToken: string) => {
  const { data } = await api.post("/auth/google", { idToken });
  return data;
};

export const logoutRequest = async () => {
  await api.post("/auth/logout");
};

export const getMeRequest = async (): Promise<User> => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const updateProfileRequest = async (payload: Partial<User>): Promise<User> => {
  const { data } = await api.put("/auth/profile", payload);
  return data;
};
