import { SortIcon } from "@/assets/icons/SortIcon";
import { theme } from "@/constants/theme";
import { Card } from "@/shared/ui/card";
import { SearchBar } from "@/shared/ui/search-bar";
import { Typography } from "@/shared/ui/Typography";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

const testFlowersList = [
  {
    name: "Аглаонема",
    type: "Вечнозеленое",
    image: require("@/assets/images/bed.png"),
  },
  {
    name: "Азалия",
    type: "Листопадные",
    image: require("@/assets/images/child.png"),
  },
  {
    name: "Алоказия",
    type: "Вечнозеленые",
    image: require("@/assets/images/sun.png"),
  },
  {
    name: "Альстромерия",
    type: "Цветущие",
    image: require("@/assets/images/tip.png"),
  },
  {
    name: "Анемона",
    type: "Цветущие",
    image: require("@/assets/images/bed.png"),
  },
  {
    name: "Ареке",
    type: "Вечнозеленые",
    image: require("@/assets/images/child.png"),
  },
  {
    name: "Астра",
    type: "Цветущие",
    image: require("@/assets/images/sun.png"),
  },
];

export default function AdminFlowersPage() {
  const [flowersList] = useState(testFlowersList);
  const router = useRouter();

  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortFlowersList = () => {
    setSortBy((prevSort) => (prevSort === "asc" ? "desc" : "asc"));
  };

  const visibleFlowers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filtered = flowersList.filter((item) =>
      item.name.toLowerCase().includes(normalizedQuery)
    );
    return filtered.sort((a, b) =>
      sortBy === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [flowersList, searchQuery, sortBy]);

  return (
    <ScrollView>
      <View style={styles.searchRow}>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/new-flower")}
        >
          <Typography style={styles.addButtonText}>+</Typography>
        </Pressable>
        <View style={{ flex: 1 }}>
          <SearchBar
            placeholder="Что бы вы хотели найти?"
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
          visibleFlowers.map((item) => (
            <Card
              key={item.name}
              imageSize={116}
              imageCornerRadius={30}
              imageSrc={item.image}
              title={item.name}
              label={item.type}
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.color.background.usual,
    marginRight: 4,
    elevation: 2,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 32,
    marginTop: -2,
  },
  list: {
    gap: 16,
  },
  emptyState: {
    textAlign: "center",
    color: theme.color.text,
  },
});
