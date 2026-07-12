import api from "./axios";
import { PaginatedResources, Resource, Review } from "../types";

export interface ResourceFilters {
  search?: string;
  subject?: string;
  priceType?: string;
  resourceType?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const getResourcesRequest = async (
  filters: ResourceFilters
): Promise<PaginatedResources> => {
  const { data } = await api.get("/resources", { params: filters });
  return data;
};

export const getResourceByIdRequest = async (
  id: string
): Promise<{ resource: Resource; related: Resource[]; reviews: Review[] }> => {
  const { data } = await api.get(`/resources/${id}`);
  return data;
};

export const getMyResourcesRequest = async (): Promise<Resource[]> => {
  const { data } = await api.get("/resources/mine");
  return data;
};

export const createResourceRequest = async (payload: Partial<Resource>): Promise<Resource> => {
  const { data } = await api.post("/resources", payload);
  return data;
};

export const deleteResourceRequest = async (id: string) => {
  const { data } = await api.delete(`/resources/${id}`);
  return data;
};

export const addReviewRequest = async (id: string, rating: number, comment: string) => {
  const { data } = await api.post(`/resources/${id}/reviews`, { rating, comment });
  return data;
};
