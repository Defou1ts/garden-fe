import { usePlant } from "@/api/hooks/plant/usePlant";
import { theme } from "@/constants/theme";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { Typography } from "@/shared/ui/Typography";
import { getPhotoUrl } from "@/utils/getPhotoUrl";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function PlantScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const plantId = params.id ? String(params.id) : undefined;

  const plantQuery = usePlant(plantId);
  const plant = plantQuery.data;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={buildDefaultHeaderOptions({
          title: plant?.name ?? "Растение",
        })}
      />

      {plant ? (
        <>
          <Image source={getPhotoUrl(plant.photoUrl)} style={styles.hero} />

          <View style={styles.panel}>
            <View style={styles.badgeRow}>
              <Typography type="label" style={styles.badgeText}>
                ☀️ {plant.sunHours || "—"}
              </Typography>
              <Typography type="label" style={styles.badgeText}>
                🌡️ {plant.temperature || "—"}
              </Typography>
            </View>

            <Typography type="default" style={styles.watering}>
              💧 Полив:{" "}
              {plant.wateringDays
                ? `${plant.wateringDays} раз(а) в неделю`
                : "данные уточняются"}
            </Typography>

            <Typography type="default" style={styles.absentNote}>
              У вас пока нет {plant.name.toLowerCase()}
            </Typography>

            <Typography type="label" style={styles.sectionHeading}>
              Хорошо сочетается:{" "}
              {plant.goodNeighbours || "Информация уточняется"}
            </Typography>
            <Typography type="label" style={styles.sectionHeading}>
              Стоит избегать: {plant.badNeighbours || "Информация уточняется"}
            </Typography>

            <Typography type="default" style={styles.body}>
              {plant.description || "Описание появится скоро."}
            </Typography>
          </View>
        </>
      ) : (
        <Typography type="default" style={styles.emptyState}>
          {plantQuery.isLoading
            ? "Загружаем растение..."
            : "Растение не найдено"}
        </Typography>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backIcon: {
    color: theme.color.text,
    paddingHorizontal: 4,
  },
  title: {
    flex: 1,
  },
  hero: {
    width: "100%",
    aspectRatio: 3 / 4,
    backgroundColor: theme.color.background.usual,
  },
  panel: {
    marginTop: 8,
    padding: 16,
    borderRadius: 20,
    gap: 10,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 16,
  },
  badgeText: {
    color: theme.color.text,
  },
  watering: {
    color: theme.color.text,
  },
  absentNote: {
    marginTop: 4,
    color: "#E86D7C",
  },
  sectionHeading: {
    marginTop: 10,
    color: theme.color.text,
  },
  body: {
    color: theme.color.text,
  },
  emptyState: {
    textAlign: "center",
    marginTop: 48,
    color: theme.color.text,
  },
});
