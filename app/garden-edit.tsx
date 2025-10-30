import { theme } from "@/constants/theme";
import { Typography } from "@/shared/ui/Typography";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { TextBox } from "@/shared/ui/text-box";
import { ThemedButton } from "@/shared/ui/themed-button";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

type GridCell = {
  id: string;
  image?: any;
};

const IMAGE_POOL = [
  require("@/assets/images/bed.png"),
  require("@/assets/images/child.png"),
  require("@/assets/images/sun.png"),
  require("@/assets/images/tip.png"),
];

const createInitialGrid = (
  columns: number,
  rows: number,
  filled: number
): GridCell[] => {
  const total = columns * rows;
  const cells: GridCell[] = [];
  for (let i = 0; i < total; i++) {
    const hasImage = i < filled;
    const img = hasImage ? IMAGE_POOL[i % IMAGE_POOL.length] : undefined;
    cells.push({ id: `cell-${i}`, image: img });
  }
  return cells;
};

export default function GardenEditScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("Дача");

  const columns = 7;
  const rows = 10;

  const [cells, setCells] = useState<GridCell[]>(() =>
    createInitialGrid(columns, rows, 22)
  );

  const cellSize = 56; // tuned to fit padding + gaps similar to mock

  const handleToggleCell = (index: number) => {
    setCells((prev) => {
      const next = [...prev];
      const current = next[index];
      next[index] = {
        ...current,
        image: current.image
          ? undefined
          : IMAGE_POOL[index % IMAGE_POOL.length],
      };
      return next;
    });
  };

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

      <Typography type="default" style={styles.sectionLabel}>
        Введите наименование огорода:
      </Typography>
      <TextBox value={title} onChangeText={setTitle} placeholder="Название" />
      <ThemedButton onPress={() => router.back()} textAlign="center">
        Сохранить
      </ThemedButton>
      <Typography type="default" style={styles.sectionLabelLarge}>
        Измените ваш огород:
      </Typography>

      <View style={[styles.grid, gridStyle]}>
        {cells.map((cell, index) => (
          <Pressable
            key={cell.id}
            onPress={() => handleToggleCell(index)}
            style={[styles.cell, { width: cellSize, height: cellSize }]}
          >
            {cell.image ? (
              <Image source={cell.image} style={styles.cellImage} />
            ) : null}
          </Pressable>
        ))}
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
