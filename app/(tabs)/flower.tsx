import { useGardens } from "@/api/hooks/garden/useGardens";
import { usePlants } from "@/api/hooks/plant/usePlants";
import { SegmentHeadline } from "@/components/sgement-headline";
import { theme } from "@/constants/theme";
import { ThemedButton } from "@/shared/ui/themed-button";
import { cellsMapToArray } from "@/utils/gardenCells";
import { getPhotoUrl } from "@/utils/getPhotoUrl";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function FlowerScreen() {
  const router = useRouter();
  const gardensQuery = useGardens();
  const plantsQuery = usePlants();

  const plantPhotoById = new Map(
    (plantsQuery.data ?? []).map((p) => [p.id, p.photoUrl] as const)
  );

  return (
    <View style={{ flex: 1 }}>
      <ThemedButton
        onPress={() => router.push("/garden-create")}
        textAlign="center"
      >
        Добавить огород
      </ThemedButton>
      {(gardensQuery.data ?? []).map((garden, idx) => {
        const cells = cellsMapToArray(garden.cells);
        // показываем именно посаженные растения (если пусто — будет фолбэк)
        const preview = cells.filter((c) => Boolean(c.plantId)).slice(0, 12);

        const fallback =
          idx % 2 === 0
            ? require("../../assets/images/bed.png")
            : require("../../assets/images/child.png");

        return (
          <View key={garden.id} style={{ marginTop: idx === 0 ? 24 : 64 }}>
            <SegmentHeadline
              onPress={() =>
                router.push({
                  pathname: "/garden-edit",
                  params: { id: garden.id },
                } as any)
              }
              title={garden.name}
            />
            <ScrollView
              style={styles.scrollerWrapper}
              contentContainerStyle={styles.scroller}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {preview.length ? (
                preview.map((c) => (
                  <Image
                    key={c.key}
                    style={styles.previewImage}
                    source={getPhotoUrl(
                      plantPhotoById.get(c.plantId) ?? fallback
                    )}
                  />
                ))
              ) : (
                <Image style={styles.previewImage} source={fallback} />
              )}
            </ScrollView>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollerWrapper: {
    marginTop: 32,
  },
  scroller: {
    flexDirection: "row",
    gap: 16,
  },
  previewImage: {
    width: 110,
    height: 110,
    borderRadius: 18,
  },
  fab: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 16,
    bottom: 96,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.color.background.usual,
    alignItems: "center",
    justifyContent: "center",
  },
  fabInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.color.background.default,
  },
});
