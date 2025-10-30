import { SortIcon } from "@/assets/icons/SortIcon";
import { theme } from "@/constants/theme";
import { Typography } from "@/shared/ui/Typography";
import { Card } from "@/shared/ui/card";
import { SearchBar } from "@/shared/ui/search-bar";
import { Tabs as SegmentedTabs } from "@/shared/ui/tabs";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

const tabsItems = [
  { index: 0, label: "Цветы" },
  { index: 1, label: "Ягоды" },
  { index: 2, label: "Овощи" },
  { index: 3, label: "Деревья" },
];

const testFlowersList = ["Аглаонема", "Базалия", "Алоказия", "Яльстромерия"];

export default function BookScreen() {
  const [activeTab, setActiveTab] = useState(tabsItems[0].index);
  const [flowersList] = useState(testFlowersList);
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortFlowersList = () => {
    setSortBy((prevSort) => (prevSort === "asc" ? "desc" : "asc"));
  };

  const visibleFlowers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = flowersList.filter((name) =>
      name.toLowerCase().includes(normalizedQuery)
    );

    return filtered.sort((a, b) =>
      sortBy === "asc" ? a.localeCompare(b) : b.localeCompare(a)
    );
  }, [flowersList, searchQuery, sortBy]);

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

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredScroller}
        >
          <View style={styles.featuredCard}>
            <Card
              textColor={theme.color.background.default}
              backgroundColor={theme.color.background.usual}
              imageSrc={require("@/assets/images/react-logo.png")}
              title={"Эхеверия\nМикс"}
              label={"Суккулент\nСветолюбива и\nлюбит прямые\nсолнечные лучи."}
            />
          </View>
          <View style={styles.featuredCard}>
            <Card
              textColor={theme.color.background.default}
              backgroundColor={theme.color.background.usual}
              imageSrc={require("@/assets/images/react-logo.png")}
              title={"Эхеверия\nМикс"}
              label={"Суккулент\nСветолюбива и\nлюбит прямые\nсолнечные лучи."}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.searchRow}>
        <View style={{ flex: 1 }}>
          <SearchBar
            placeholder="Поиск"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Pressable onPress={handleSortFlowersList}>
          <SortIcon
            style={{
              transform: [{ rotate: sortBy === "desc" ? "180deg" : "0deg" }],
            }}
          />
        </Pressable>
      </View>

      <View style={styles.list}>
        {visibleFlowers.length > 0 ? (
          visibleFlowers.map((name) => (
            <Card
              key={name}
              imageSrc={require("@/assets/images/react-logo.png")}
              title={name}
              label={"Вечнозеленое"}
            />
          ))
        ) : (
          <Typography type="default" style={styles.emptyState}>
            Ничего не найдено
          </Typography>
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
  featuredCard: {
    width: 320,
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
