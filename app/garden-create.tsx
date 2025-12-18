import { useCreateGarden } from "@/api/hooks/garden/useCreateGarden";
import { theme } from "@/constants/theme";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { Tabs as SegmentedTabs } from "@/shared/ui/tabs";
import { TextBox } from "@/shared/ui/text-box";
import { ThemedButton } from "@/shared/ui/themed-button";
import { Typography } from "@/shared/ui/Typography";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

const tabsItems = [
  { index: 0, label: "Участок" },
  { index: 1, label: "Подоконник" },
];

export default function GardenCreateScreen() {
  const router = useRouter();
  const createGardenMutation = useCreateGarden();

  const [activeTab, setActiveTab] = useState(0);
  const [title, setTitle] = useState("");

  const handleSave = () => {
    const name = title.trim();
    if (!name) return;

    // Пока в API поддерживается только "PLOT". Второй таб оставляем для UI,
    // но отправляем PLOT, чтобы не ломать создание.
    createGardenMutation.mutate(
      { name, type: "PLOT" },
      {
        onSuccess: (garden) => {
          router.replace({
            pathname: "/garden-edit",
            params: { id: garden.id },
          } as any);
        },
      }
    );
  };

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
      <ThemedButton
        onPress={handleSave}
        textAlign="center"
        disabled={createGardenMutation.isPending || !title.trim()}
      >
        {createGardenMutation.isPending ? "Сохраняем..." : "Сохранить"}
      </ThemedButton>
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
