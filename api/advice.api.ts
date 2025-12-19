import { buildFormData } from "../utils/formData";
import {
  Advice,
  CreateAdviceRequest,
  UpdateAdviceRequest,
} from "./advice.types";
import { api } from "./axios";

export const adviceApi = {
  getAdvices: async (): Promise<Advice[]> => {
    const res = await api.get("/api/advices");
    return res.data;
  },

  getAdviceById: async (id: string): Promise<Advice> => {
    const res = await api.get(`/api/advices/${id}`);
    return res.data;
  },

  createAdvice: async (data: CreateAdviceRequest): Promise<Advice> => {
    const formData = buildFormData(data);

    const res = await api.post("/api/advices", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  updateAdvice: async (
    id: string,
    data: UpdateAdviceRequest
  ): Promise<Advice> => {
    const formData = buildFormData(data);

    const res = await api.put(`/api/advices/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  deleteAdvice: async (id: string): Promise<void> => {
    await api.delete(`/api/advices/${id}`);
  },

  // favorites
  addToFavorites: async (id: string): Promise<void> => {
    await api.post(`/api/advices/${id}/favorites`);
  },

  removeFromFavorites: async (id: string): Promise<void> => {
    await api.delete(`/api/advices/${id}/favorites`);
  },

  isFavorite: async (id: string): Promise<boolean> => {
    const res = await api.get(`/api/advices/${id}/favorite`);
    return res.data;
  },

  getFavorites: async (): Promise<Advice[]> => {
    const res = await api.get("/api/advices/favorites");
    return res.data;
  },
};
