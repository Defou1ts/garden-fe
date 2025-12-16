import { api } from "./axios";
import { Garden } from "./garden.types";

export type CreateGardenRequest = {
  type: "PLOT";
  name: string;
};

export type AddPlantRequest = {
  plantId: string;
  x: number;
  y: number;
};

export const gardenApi = {
  getGardens: async (): Promise<Garden[]> => {
    const res = await api.get("/api/gardens");
    return res.data;
  },

  getGardenById: async (id: string): Promise<Garden> => {
    const res = await api.get(`/api/gardens/${id}`);
    return res.data;
  },

  createGarden: async (data: CreateGardenRequest): Promise<Garden> => {
    const res = await api.post("/api/gardens", data);
    return res.data;
  },

  deleteGarden: async (id: string): Promise<void> => {
    await api.delete(`/api/gardens/${id}`);
  },

  addPlant: async (gardenId: string, data: AddPlantRequest): Promise<void> => {
    await api.post(`/api/gardens/${gardenId}/plants`, data);
  },

  removePlant: async (
    gardenId: string,
    x: number,
    y: number
  ): Promise<void> => {
    await api.delete(`/api/gardens/${gardenId}/plants`, {
      params: { x, y },
    });
  },
};
