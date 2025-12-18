import { useAddPlant } from "@/api/hooks/garden/useAddPlant";
import { useDeleteGarden } from "@/api/hooks/garden/useDeleteGarden";
import { useGarden } from "@/api/hooks/garden/useGarden";
import { useRemovePlant } from "@/api/hooks/garden/useRemovePlant";
import { usePlants } from "@/api/hooks/plant/usePlants";
import { PlantPickerModal } from "@/components/plant-picker-modal";
import { theme } from "@/constants/theme";
import { Typography } from "@/shared/ui/Typography";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { TextBox } from "@/shared/ui/text-box";
import { ThemedButton } from "@/shared/ui/themed-button";
import { buildCellKey } from "@/utils/gardenCells";
import { getPhotoUrl } from "@/utils/getPhotoUrl";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

type CellView = {
  id: string;
  x: number;
  y: number;
  plantId?: string;
};

export default function GardenEditScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const gardenId = String(params.id ?? "");

  const gardenQuery = useGarden(gardenId);
  const plantsQuery = usePlants();
  const addPlantMutation = useAddPlant();
  const removePlantMutation = useRemovePlant();
  const deleteGardenMutation = useDeleteGarden();

  const [title, setTitle] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pendingCell, setPendingCell] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const plantById = useMemo(() => {
    const map = new Map<
      string,
      { id: string; name: string; photoUrl: string }
    >();
    for (const p of plantsQuery.data ?? []) {
      map.set(p.id, { id: p.id, name: p.name, photoUrl: p.photoUrl });
    }
    return map;
  }, [plantsQuery.data]);

  const grid = useMemo(() => {
    const g = gardenQuery.data;
    if (!g) return { width: 0, height: 0, cells: [] as CellView[] };

    const items: CellView[] = [];
    for (let y = 0; y < g.height; y++) {
      for (let x = 0; x < g.width; x++) {
        const key = buildCellKey(x, y);
        const cell = g.cells[key];
        items.push({
          id: `cell-${x}-${y}`,
          x,
          y,
          plantId: cell?.plantId,
        });
      }
    }
    return { width: g.width, height: g.height, cells: items };
  }, [gardenQuery.data]);

  // синхронизируем название с сервером
  useEffect(() => {
    if (gardenQuery.data?.name) setTitle(gardenQuery.data.name);
  }, [gardenQuery.data?.name]);

  const cellSize = 56;

  const handlePressCell = (cell: CellView) => {
    if (!gardenId) return;

    if (cell.plantId) {
      removePlantMutation.mutate({ gardenId, x: cell.x, y: cell.y });
      return;
    }

    // пустая клетка — открываем пикер
    setPendingCell({ x: cell.x, y: cell.y });
    setPickerOpen(true);
  };

  const recentPlantIds = useMemo(() => {
    const ids = new Set<string>();
    const g = gardenQuery.data;
    if (!g) return [];
    for (const v of Object.values(g.cells)) {
      ids.add(v.plantId);
    }
    return Array.from(ids).slice(0, 6);
  }, [gardenQuery.data]);

  const gridStyle = useMemo(
    () => ({
      gap: 16,
    }),
    []
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={buildDefaultHeaderOptions({ title: "Редактирование" })}
      />

      <PlantPickerModal
        visible={pickerOpen}
        plants={plantsQuery.data ?? []}
        recentPlantIds={recentPlantIds}
        onClose={() => {
          setPickerOpen(false);
          setPendingCell(null);
        }}
        onSelectPlant={(plantId) => {
          if (!gardenId || !pendingCell) return;
          addPlantMutation.mutate(
            { gardenId, plantId, x: pendingCell.x, y: pendingCell.y },
            {
              onSuccess: () => {
                setPickerOpen(false);
                setPendingCell(null);
              },
            }
          );
        }}
      />

      <Typography type="default" style={styles.sectionLabel}>
        Введите наименование огорода:
      </Typography>
      <TextBox
        value={title}
        onChangeText={setTitle}
        placeholder="Название"
        editable={false}
      />
      <ThemedButton onPress={() => router.back()} textAlign="center">
        Назад
      </ThemedButton>

      <ThemedButton
        onPress={() => {
          if (!gardenId) return;
          deleteGardenMutation.mutate(gardenId, {
            onSuccess: () => router.back(),
          });
        }}
        textAlign="center"
        disabled={deleteGardenMutation.isPending || !gardenId}
      >
        {deleteGardenMutation.isPending ? "Удаляем..." : "Удалить огород"}
      </ThemedButton>

      <Typography type="default" style={styles.sectionLabelLarge}>
        Измените ваш огород:
      </Typography>

      <Typography type="default" style={styles.helper}>
        Нажмите на пустую клетку — чтобы посадить растение. Нажмите на занятую
        клетку — чтобы убрать растение.
      </Typography>

      <View style={[styles.grid, gridStyle]}>
        {grid.cells.map((cell) => {
          const plant = cell.plantId ? plantById.get(cell.plantId) : undefined;
          return (
            <Pressable
              key={cell.id}
              onPress={() => handlePressCell(cell)}
              style={[styles.cell, { width: cellSize, height: cellSize }]}
            >
              {plant ? (
                <Image
                  source={getPhotoUrl(plant.photoUrl)}
                  style={styles.cellImage}
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    width: 48,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "transparent",
  },
  headerTitle: {
    marginLeft: 8,
    flex: 1,
  },
  saveButton: {
    paddingHorizontal: 16,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: theme.color.background.usual,
  },
  sectionLabel: {
    marginTop: 8,
  },
  sectionLabelLarge: {
    marginTop: 24,
  },
  helper: {
    color: theme.color.text,
    opacity: 0.9,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    borderRadius: 12,
    backgroundColor: theme.color.background.disabled,
    overflow: "hidden",
  },
  cellImage: {
    width: "100%",
    height: "100%",
  },
});
