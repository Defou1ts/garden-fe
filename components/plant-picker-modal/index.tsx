import { API_URL } from "@/api/axios";
import type { Plant } from "@/api/plant.types";
import { theme } from "@/constants/theme";
import { Typography } from "@/shared/ui/Typography";
import { getPhotoUrl } from "@/utils/getPhotoUrl";
import { Image } from "expo-image";
import { useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  plants: Plant[];
  recentPlantIds: string[];
  onClose: () => void;
  onSelectPlant: (plantId: string) => void;
};

export const PlantPickerModal = ({
  visible,
  plants,
  recentPlantIds,
  onClose,
  onSelectPlant,
}: Props) => {
  const [query, setQuery] = useState("");

  const plantById = useMemo(() => {
    const map = new Map<string, Plant>();
    for (const p of plants) map.set(p.id, p);
    return map;
  }, [plants]);

  const recentPlants = useMemo(() => {
    return recentPlantIds
      .map((id) => plantById.get(id))
      .filter((p): p is Plant => Boolean(p));
  }, [recentPlantIds, plantById]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? plants.filter((p) => p.name.toLowerCase().includes(q))
      : plants;
    return q ? base.slice(0, 12) : base;
  }, [plants, query]);

  const showSuggestions = filtered.length > 0;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Томат"
              placeholderTextColor={theme.color.background.usual}
              style={styles.input}
              autoCorrect={false}
            />
            <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={10}>
              <Typography type="default" style={styles.closeText}>
                ×
              </Typography>
            </Pressable>
          </View>

          {recentPlants.length > 0 ? (
            <>
              <Typography type="label" style={styles.sectionTitle}>
                Вы ранее сажали:
              </Typography>
              <View style={styles.grid2}>
                {recentPlants.slice(0, 2).map((p) => (
                  <Pressable
                    key={p.id}
                    onPress={() => onSelectPlant(p.id)}
                    style={styles.bigCard}
                  >
                    <Image
                      source={getPhotoUrl(p.photoUrl)}
                      style={styles.bigImage}
                    />
                    <Typography type="label" style={styles.cardLabel}>
                      {p.name} s
                    </Typography>
                  </Pressable>
                ))}
              </View>
            </>
          ) : null}

          <Typography type="label" style={styles.sectionTitle}>
            Возможно вы искали:
          </Typography>

          {showSuggestions ? (
            <View style={styles.grid3}>
              {filtered.map((p) => (
                <Pressable
                  key={p.id}
                  onPress={() => onSelectPlant(p.id)}
                  style={styles.smallCard}
                >
                  <Image
                    source={getPhotoUrl(p.photoUrl)}
                    style={styles.smallImage}
                  />
                  <Typography
                    type="label"
                    style={styles.smallLabel}
                    numberOfLines={1}
                  >
                    {p.name}
                  </Typography>
                </Pressable>
              ))}
            </View>
          ) : (
            <Typography type="default" style={styles.emptyText}>
              Начните вводить название растения…
            </Typography>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 28,
    backgroundColor: theme.color.background.default,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.color.background.usual,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: theme.color.text,
    fontFamily: "Raleway_400Regular",
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 22,
    lineHeight: 22,
    color: theme.color.text,
  },
  sectionTitle: {
    marginTop: 12,
    color: theme.color.text,
  },
  grid2: {
    marginTop: 10,
    flexDirection: "row",
    gap: 12,
  },
  bigCard: {
    flex: 1,
    gap: 8,
  },
  bigImage: {
    width: "100%",
    height: 110,
    borderRadius: 18,
  },
  cardLabel: {
    color: theme.color.text,
    opacity: 0.9,
  },
  grid3: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  smallCard: {
    width: 92,
    gap: 6,
  },
  smallImage: {
    width: 92,
    height: 76,
    borderRadius: 16,
  },
  smallLabel: {
    color: theme.color.text,
    opacity: 0.9,
  },
  emptyText: {
    marginTop: 8,
    color: theme.color.text,
    opacity: 0.7,
  },
});
