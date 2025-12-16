import { buildFormData } from "../utils/formData";
import { api } from "./axios";
import { CreatePlantRequest, Plant, UpdatePlantRequest } from "./plant.types";

export const plantApi = {
  getPlants: async (): Promise<Plant[]> => {
    const res = await api.get("/api/plants");
    return res.data;
  },

  getPlantById: async (id: string): Promise<Plant> => {
    const res = await api.get(`/api/plants/${id}`);
    return res.data;
  },

  getVerifiedPlants: async (isVerified: boolean): Promise<Plant[]> => {
    const res = await api.get(`/api/plants/verified/${isVerified}`);
    return res.data;
  },

  createPlant: async (data: CreatePlantRequest): Promise<Plant> => {
    const formData = buildFormData(data);

    const res = await api.post("/api/plants", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  updatePlant: async (id: string, data: UpdatePlantRequest): Promise<Plant> => {
    const formData = buildFormData(data);

    const res = await api.put(`/api/plants/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },
};
