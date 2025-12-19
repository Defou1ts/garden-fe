import { useAdvices } from "@/api/hooks/advice/useAdvices";
import { SortIcon } from "@/assets/icons/SortIcon";
import { theme } from "@/constants/theme";
import { Card } from "@/shared/ui/card";
import { SearchBar } from "@/shared/ui/search-bar";
import { Typography } from "@/shared/ui/Typography";
import { getPhotoUrl } from "@/utils/getPhotoUrl";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
export default function AdminTipsPage() {
  const router = useRouter();
  const advicesQuery = useAdvices();

  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortTipsList = () => {
    setSortBy((prevSort) => (prevSort === "asc" ? "desc" : "asc"));
  };

  const visibleTips = useMemo(() => {
    const tips = advicesQuery.data ?? [];
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = normalizedQuery
      ? tips.filter((item) =>
          item.title.toLowerCase().includes(normalizedQuery)
        )
      : tips;

    return [...filtered].sort((a, b) =>
      sortBy === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }, [advicesQuery.data, searchQuery, sortBy]);

  return (
    <ScrollView>
      <View style={styles.searchRow}>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/new-tip")}
        >
          <Typography style={styles.addButtonText}>+</Typography>
        </Pressable>
        <View style={{ flex: 1 }}>
          <SearchBar
            placeholder="Поиск"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Pressable onPress={handleSortTipsList}>
          <SortIcon
            style={{
              transform: [{ rotate: sortBy === "desc" ? "180deg" : "0deg" }],
            }}
          />
        </Pressable>
      </View>

      <View style={styles.list}>
        {advicesQuery.isLoading ? (
          <Typography type="default" style={styles.emptyState}>
            Загружаем советы...
          </Typography>
        ) : advicesQuery.isError ? (
          <Typography type="default" style={styles.emptyState}>
            Не удалось загрузить советы
          </Typography>
        ) : visibleTips.length > 0 ? (
          visibleTips.map((item) => (
            <Pressable
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "/new-tip",
                  params: {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    photoUrl: item.photoUrl,
                  },
                } as any)
              }
            >
              <Card
                imageSize={116}
                imageCornerRadius={30}
                imageSrc={
                  item.photoUrl
                    ? getPhotoUrl(item.photoUrl)
                    : require("@/assets/images/tip.png")
                }
                title={item.title}
                label={item.description}
                maxLabelLines={3}
              />
            </Pressable>
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
    backgroundColor: theme.color.background.usual, // Зелёный
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
