import { theme } from "@/constants/theme";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { Tabs as SegmentedTabs } from "@/shared/ui/tabs";
import { TextBox } from "@/shared/ui/text-box";
import { ThemedButton } from "@/shared/ui/themed-button";
import { Typography } from "@/shared/ui/Typography";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

type GridCell = { id: string; image?: any };

const tabsItems = [
  { index: 0, label: "Участок" },
  { index: 1, label: "Подоконник" },
];

const IMAGE_POOL = [
  require("@/assets/images/bed.png"),
  require("@/assets/images/child.png"),
  require("@/assets/images/sun.png"),
  require("@/assets/images/tip.png"),
];

const createGrid = (columns: number, rows: number): GridCell[] => {
  const total = columns * rows;
  return new Array(total).fill(null).map((_, i) => ({ id: `c-${i}` }));
};

const plotColumns = 7;
const plotRows = 10;
const windowsillColumns = 6;
const windowsillRows = 1;

export default function GardenCreateScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(0);
  const [title, setTitle] = useState("");

  const [plotCells, setPlotCells] = useState<GridCell[]>(() =>
    createGrid(plotColumns, plotRows)
  );
  const [windowCells, setWindowCells] = useState<GridCell[]>(() =>
    createGrid(windowsillColumns, windowsillRows)
  );

  const cellSize = 44;

  const gridStyle = useMemo(
    () => ({
      gap: 12,
    }),
    []
  );

  const toggleCell = (cells: GridCell[], index: number): GridCell[] => {
    const next = [...cells];
    const current = next[index];
    next[index] = {
      ...current,
      image: current.image ? undefined : IMAGE_POOL[index % IMAGE_POOL.length],
    };
    return next;
  };

  const handleTogglePlot = (index: number) =>
    setPlotCells((prev) => toggleCell(prev, index));
  const handleToggleWindow = (index: number) =>
    setWindowCells((prev) => toggleCell(prev, index));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={buildDefaultHeaderOptions({ title: "Новый огород" })}
      />

      <Typography type="default">Где будем размещать ваш огород?</Typography>
      <SegmentedTabs
        activeTabIndex={activeTab}
        tabsItems={tabsItems}
        onChange={setActiveTab}
      />

      <Typography type="default" style={styles.sectionLabel}>
        Введите наименование огорода:
      </Typography>
      <TextBox
        value={title}
        onChangeText={setTitle}
        placeholder="Наименование"
      />
      <ThemedButton onPress={() => router.back()} textAlign="center">
        Сохранить
      </ThemedButton>

      <Typography type="default" style={styles.sectionLabel}>
        Создайте ваш огород:
      </Typography>

      {activeTab === 0 ? (
        <View style={[styles.grid, gridStyle]}>
          {plotCells.map((cell, index) => (
            <Pressable
              key={cell.id}
              onPress={() => handleTogglePlot(index)}
              style={[styles.cell, { width: cellSize, height: cellSize }]}
            >
              {cell.image ? (
                <Image source={cell.image} style={styles.cellImage} />
              ) : null}
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={[styles.gridRow, gridStyle]}>
          {windowCells.map((cell, index) => (
            <Pressable
              key={cell.id}
              onPress={() => handleToggleWindow(index)}
              style={[styles.cell, { width: cellSize, height: cellSize }]}
            >
              {cell.image ? (
                <Image source={cell.image} style={styles.cellImage} />
              ) : null}
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    gap: 16,
  },
  sectionLabel: {
    marginTop: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  cell: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: theme.color.background.disabled,
  },
  cellImage: {
    width: "100%",
    height: "100%",
  },
  saveButton: {
    alignSelf: "flex-end",
    marginTop: 16,
    paddingHorizontal: 16,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: theme.color.background.usual,
  },
});
