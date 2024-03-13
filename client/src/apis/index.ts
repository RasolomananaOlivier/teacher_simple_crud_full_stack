import Axios from "axios";
import { IProfessor } from "../types";

const Client = Axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

/**
 * This is the API call to get all professors
 *
 */
export type GetProfessorsParams = {
  page?: number;
};
export type GetResponse<T> = {
  message: string;
  data: T;
  meta: {
    limit: number;
    page: number;
    total: number;
    max: number;
    min: number;
    totalSaleries: number;
  };
};
export const getProfessors = async ({ page = 1 }: GetProfessorsParams) => {
  const response = await Client.get(`/professors?page=${page}`);

  return response.data as GetResponse<IProfessor[]>;
};

/**
 * This is the API call to create a professor
 *
 */
export type PostProfessorParams = {
  name: string;
  hourlyRate: number;
  hours: number;
};
export type PostResponse<T> = {
  message: string;
  data: T;
};
export const postProfessor = async (params: PostProfessorParams) => {
  const response = await Client.post("/professors", params);

  return response.data as PostResponse<IProfessor>;
};

export type DeleteProfessorParams = {
  id: string;
};
export const deleteProfessor = async (params: DeleteProfessorParams) => {
  const response = await Client.delete(`/professors/${params.id}`);

  return response.data;
};

export type UpdateProfessorParams = {
  id: string;
  name?: string;
  hourlyRate?: number;
  hours?: number;
};
export const updateProfessor = async (params: UpdateProfessorParams) => {
  const response = await Client.put(`/professors/${params.id}`, params);

  return response.data;
};
