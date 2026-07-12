import api from "./axios";
import { StudyGroup } from "../types";

export const getStudyGroupsRequest = async (params?: {
  subject?: string;
  search?: string;
}): Promise<StudyGroup[]> => {
  const { data } = await api.get("/study-groups", { params });
  return data;
};

export const getStudyGroupByIdRequest = async (id: string): Promise<StudyGroup> => {
  const { data } = await api.get(`/study-groups/${id}`);
  return data;
};

export const createStudyGroupRequest = async (
  payload: Partial<StudyGroup>
): Promise<StudyGroup> => {
  const { data } = await api.post("/study-groups", payload);
  return data;
};

export const joinStudyGroupRequest = async (id: string) => {
  const { data } = await api.post(`/study-groups/${id}/join`);
  return data;
};

export const leaveStudyGroupRequest = async (id: string) => {
  const { data } = await api.post(`/study-groups/${id}/leave`);
  return data;
};
