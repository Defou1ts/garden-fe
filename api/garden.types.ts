export type CellKey = `${number},${number}`;

export type GardenCell = {
  plantId: string;
  plantName: string;
  plantedDate: string; // YYYY-MM-DD
};

export type GardenCellsMap = Record<CellKey, GardenCell>;

export type Garden = {
  id: string;
  type: "PLOT";
  name: string;
  width: number;
  height: number;
  cells: GardenCellsMap;
};
