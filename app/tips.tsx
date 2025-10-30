import { TipsList } from "@/components/tips-list";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function TipsScreen() {
  return (
    <>
      <Stack.Screen options={buildDefaultHeaderOptions({ title: "Советы" })} />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <TipsList />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 12,
  },
});
