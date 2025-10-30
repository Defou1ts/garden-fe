import { SortIcon } from "@/assets/icons/SortIcon";
import { theme } from "@/constants/theme";
import { Card } from "@/shared/ui/card";
import { SearchBar } from "@/shared/ui/search-bar";
import { Typography } from "@/shared/ui/Typography";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

const testTipsList = [
  {
    name: "Как правильно вырастить клюкву",
    text: "Возьмите мышьяка грамм 300 и облейте свою смородку 5 раз по кругу после этого пошепчите под...",
  },
  {
    name: "Обрезка смородины весной",
    text: "Лучшее время для обрезки — начало апреля, когда сокодвижение только начинается.",
  },
  {
    name: "Удобрение для клубники",
    text: "Используйте компост или перегной для получения крупных и сладких ягод.",
  },
  {
    name: "Как бороться с тлёй на розах",
    text: "Обрабатывайте раствором мыла и золы ранним утром или вечером.",
  },
  {
    name: "Летний полив огурцов",
    text: "Поливайте огурцы вечером тёплой водой, не попадая на листья.",
  },
  {
    name: "Посадка чеснока под зиму",
    text: "Посадите зубчики чеснока в сентябре, чтобы получить крупный урожай летом.",
  },
  {
    name: "Организация грядок для моркови",
    text: "Почва должна быть рыхлой и глубокой: навоз, песок, торф по необходимости.",
  },
  {
    name: "Как защитить томаты от фитофторы",
    text: "Опрыскивайте растения раствором марганцовки или бордосской смесью каждую неделю.",
  },
  {
    name: "Правильный уход за малиной",
    text: "Обрезайте старые побеги и подкармливайте кусты компостом каждую весну.",
  },
  {
    name: "Полив комнатных растений летом",
    text: "Регулярно проветривайте помещение и опрыскивайте листья тёплой водой.",
  },
];

export default function AdminTipsPage() {
  const [tipsList] = useState(testTipsList);
  const router = useRouter();

  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortFlowersList = () => {
    setSortBy((prevSort) => (prevSort === "asc" ? "desc" : "asc"));
  };

  const visibleTips = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = tipsList.filter((item) =>
      item.name.toLowerCase().includes(normalizedQuery)
    );

    return filtered.sort((a, b) =>
      sortBy === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [tipsList, searchQuery, sortBy]);

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
        <Pressable onPress={handleSortFlowersList}>
          <SortIcon
            style={{
              transform: [{ rotate: sortBy === "desc" ? "180deg" : "0deg" }],
            }}
          />
        </Pressable>
      </View>

      <View style={styles.list}>
        {visibleTips.length > 0 ? (
          visibleTips.map((item) => (
            <Card
              key={item.name}
              imageSize={116}
              imageCornerRadius={30}
              imageSrc={require("@/assets/images/tip.png")}
              title={item.name}
              label={item.text}
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
