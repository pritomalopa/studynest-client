import api from "./axios";
import { Resource, User } from "../types";

export interface AdminStats {
  totals: {
    totalUsers: number;
    totalTutors: number;
    totalResources: number;
    totalGroups: number;
    totalBookings: number;
  };
  bySubject: { subject: string; count: number }[];
  byMonth: { month: string; count: number }[];
}

export const getAdminStatsRequest = async (): Promise<AdminStats> => {
  const { data } = await api.get("/admin/stats");
  return data;
};

export const getAdminResourcesRequest = async (): Promise<Resource[]> => {
  const { data } = await api.get("/admin/resources");
  return data;
};

export const getAdminUsersRequest = async (): Promise<User[]> => {
  const { data } = await api.get("/admin/users");
  return data;
};
