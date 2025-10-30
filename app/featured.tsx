import { TipsList } from "@/components/tips-list";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function FeaturedScreen() {
  return (
    <>
      <Stack.Screen
        options={buildDefaultHeaderOptions({ title: "Мои заметки" })}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <TipsList />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 32,
    paddingBottom: 32
  },
});
