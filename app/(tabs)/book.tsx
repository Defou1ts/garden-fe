import { useVerifiedPlants } from "@/api/hooks/plant/useVerifiedPlants";
import { SortIcon } from "@/assets/icons/SortIcon";
import { theme } from "@/constants/theme";
import { Typography } from "@/shared/ui/Typography";
import { Card } from "@/shared/ui/card";
import { SearchBar } from "@/shared/ui/search-bar";
import { Tabs as SegmentedTabs } from "@/shared/ui/tabs";
import { getPhotoUrl } from "@/utils/getPhotoUrl";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

const tabsItems = [
  { index: 0, label: "Цветы", type: "Flower" },
  { index: 1, label: "Ягоды", type: "Berry" },
  { index: 2, label: "Овощи", type: "Vegetable" },
  { index: 3, label: "Деревья", type: "Tree" },
];

export default function BookScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabsItems[0].index);
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const plantsQuery = useVerifiedPlants(true);
  const plants = plantsQuery.data ?? [];

  const handleSort = () => {
    setSortBy((prevSort) => (prevSort === "asc" ? "desc" : "asc"));
  };

  const filteredPlants = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const activeType = tabsItems.find((t) => t.index === activeTab)?.type;

    const byType = activeType
      ? plants.filter((p) => p.type === activeType)
      : plants;

    const byQuery = normalizedQuery
      ? byType.filter((p) => p.name.toLowerCase().includes(normalizedQuery))
      : byType;

    return [...byQuery].sort((a, b) =>
      sortBy === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [activeTab, plants, searchQuery, sortBy]);

  const featured = filteredPlants.slice(0, 5);

  const renderCard = (
    id: string,
    title: string,
    label: string,
    photo: string
  ) => (
    <Pressable
      key={id}
      onPress={() =>
        router.push({
          pathname: "/plant/[id]",
          params: { id },
        } as any)
      }
    >
      <Card
        textColor={theme.color.background.default}
        backgroundColor={theme.color.background.usual}
        imageSrc={getPhotoUrl(photo)}
        title={title}
        label={label}
        imageCornerRadius={18}
        maxLabelLines={3}
      />
    </Pressable>
  );

  return (
    <ScrollView>
      <SegmentedTabs
        activeTabIndex={activeTab}
        tabsItems={tabsItems}
        onChange={setActiveTab}
      />

      <Typography style={styles.sectionTitle} type="label">
        Может вам понравится:
      </Typography>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredScroller}
      >
        {featured.length === 0 && plantsQuery.isLoading ? (
          <Typography type="default">Загружаем растения...</Typography>
        ) : null}

        {featured.length === 0 && !plantsQuery.isLoading ? (
          <Typography type="default" style={styles.emptyState}>
            Нет подходящих растений
          </Typography>
        ) : null}

        {featured.map((plant) =>
          renderCard(
            plant.id,
            plant.name,
            plant.sunHours || "Описание скоро появится",
            plant.photoUrl
          )
        )}
      </ScrollView>

      <View style={styles.searchRow}>
        <View style={{ flex: 1 }}>
          <SearchBar
            placeholder="Поиск"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Pressable onPress={handleSort}>
          <SortIcon
            style={{
              transform: [{ rotate: sortBy === "desc" ? "180deg" : "0deg" }],
            }}
          />
        </Pressable>
      </View>

      <View style={styles.list}>
        {plantsQuery.isLoading ? (
          <Typography type="default" style={styles.emptyState}>
            Загружаем растения...
          </Typography>
        ) : null}

        {plantsQuery.isError ? (
          <Typography type="default" style={styles.emptyState}>
            Не удалось загрузить растения
          </Typography>
        ) : null}

        {!plantsQuery.isLoading &&
        !plantsQuery.isError &&
        filteredPlants.length === 0 ? (
          <Typography type="default" style={styles.emptyState}>
            Ничего не найдено
          </Typography>
        ) : null}

        {filteredPlants.map((plant) =>
          renderCard(
            plant.id,
            plant.name,
            plant.sunHours || "Описание скоро появится",
            plant.photoUrl
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: 24,
    marginBottom: 16,
  },
  featuredScroller: {
    flexDirection: "row",
    gap: 16,
  },
  searchRow: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  list: {
    marginTop: 24,
    marginBottom: 24,
    gap: 24,
  },
  emptyState: {
    textAlign: "center",
    color: theme.color.text,
  },
});
