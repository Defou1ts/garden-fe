import { CellKey, GardenCellsMap } from "../api/garden.types";

export const buildCellKey = (x: number, y: number): CellKey => `${x},${y}`;

export const parseCellKey = (key: CellKey) => {
  const [x, y] = key.split(",").map(Number);
  return { x, y };
};

/**
 * Для FlatList / FlashList
 */
export const cellsMapToArray = (cells: GardenCellsMap) => {
  return Object.entries(cells).map(([key, value]) => {
    const { x, y } = parseCellKey(key as CellKey);

    return {
      key,
      x,
      y,
      ...value,
    };
  });
};
