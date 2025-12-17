import { useFavoriteAdvices } from "@/api/hooks/advice/useFavoriteAdvices";
import { TipsList } from "@/components/tips-list";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function FeaturedScreen() {
  const favoriteAdvicesQuery = useFavoriteAdvices();

  return (
    <>
      <Stack.Screen
        options={buildDefaultHeaderOptions({ title: "Избранные советы" })}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <TipsList
          advices={favoriteAdvicesQuery.data}
          isLoading={favoriteAdvicesQuery.isLoading}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
});
