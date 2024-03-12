import Axios from "axios";
import { IProfessor } from "../types";

const Client = Axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

type GetProfessorsParams = {
  page?: number;
};
type GetProfessorsResponse = {
  message: string;
  data: IProfessor[];
  meta: {
    limit: number;
    page: number;
    total: number;
  };
};
export const getProfessors = async ({ page = 1 }: GetProfessorsParams) => {
  const response = await Client.get(`/professors?page=${page}`);

  return response.data as GetProfessorsResponse;
};

export const postProfessor = async () => {
  // TODO
};

export const deleteProfessor = async () => {
  // TODO
};

export const updateProfessor = async () => {
  // TODO
};
