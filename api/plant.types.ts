export type PlantType = "Flower" | "Tree" | "Bush" | string;

export type Plant = {
  id: string;
  type: PlantType;
  name: string;
  photoUrl: string;
  sunHours: string;
  temperature: string;
  wateringDays: number;
  goodNeighbours: string;
  badNeighbours: string;
  description: string;
  verified: boolean;
};

export type CreatePlantRequest = {
  type: string;
  name: string;
  photo: {
    uri: string;
    name: string;
    type: string;
  };
  sunHours: string;
  temperature: string;
  wateringDays: number;
  goodNeighbours: string;
  badNeighbours: string;
  description?: string;
};

export type UpdatePlantRequest = Partial<Omit<CreatePlantRequest, "photo">> & {
  photo?: {
    uri: string;
    name: string;
    type: string;
  };
  isVerified?: boolean;
};
