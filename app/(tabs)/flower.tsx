import { SegmentHeadline } from "@/components/sgement-headline";
import { theme } from "@/constants/theme";
import { ThemedButton } from "@/shared/ui/themed-button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function FlowerScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <ThemedButton
        onPress={() => router.push("/garden-create" as any)}
        textAlign="center"
      >
        Добавить огород
      </ThemedButton>
      <SegmentHeadline onPress={() => {}} title="Подоконник в спальне" />
      <ScrollView
        style={styles.scrollerWrapper}
        contentContainerStyle={styles.scroller}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {new Array(10).fill(0).map((item, index) => {
          return (
            <View>
              <Image
                style={styles.bedImage}
                key={index}
                source={require("../../assets/images/bed.png")}
              />
            </View>
          );
        })}
      </ScrollView>
      <SegmentHeadline
        style={{ marginTop: 64 }}
        onPress={() => {}}
        title="Подоконник в детской"
      />
      <ScrollView
        style={styles.scrollerWrapper}
        contentContainerStyle={styles.scroller}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {new Array(10).fill(0).map((item, index) => {
          return (
            <View>
              <Image
                style={styles.childImage}
                key={index}
                source={require("../../assets/images/child.png")}
              />
            </View>
          );
        })}
      </ScrollView>
      <SegmentHeadline
        style={{ marginTop: 64 }}
        onPress={() => router.push("/garden-edit" as any)}
        title="Дача"
      />
      <View style={styles.gardenGridContainer}>
        <View style={styles.gardenGridColumn}>
          <Image
            style={styles.gardenImageLarge}
            source={require("../../assets/images/sun.png")}
          />
          <Image
            style={styles.gardenImageSmall}
            source={require("../../assets/images/bed.png")}
          />
          <Image
            style={styles.gardenImageMedium}
            source={require("../../assets/images/child.png")}
          />
        </View>
        <View style={styles.gardenGridColumn}>
          <Image
            style={styles.gardenImageSmall}
            source={require("../../assets/images/child.png")}
          />
          <Image
            style={styles.gardenImageMedium}
            source={require("../../assets/images/sun.png")}
          />
          <Image
            style={styles.gardenImageLarge}
            source={require("../../assets/images/tip.png")}
          />
        </View>
        <View style={styles.gardenGridColumn}>
          <Image
            style={styles.gardenImageMedium}
            source={require("../../assets/images/tip.png")}
          />
          <Image
            style={styles.gardenImageSmall}
            source={require("../../assets/images/bed.png")}
          />
          <Image
            style={styles.gardenImageLarge}
            source={require("../../assets/images/child.png")}
          />
        </View>
      </View>
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
  bedImage: {
    width: 103,
    height: 103,
  },
  childImage: {
    width: 143,
    height: 143,
  },
  gardenGridContainer: {
    marginTop: 24,
    flexDirection: "row",
    gap: 16,
    marginBottom: 64,
  },
  gardenGridColumn: {
    flexDirection: "column",
    gap: 16,
  },
  gardenImageSmall: {
    width: 100,
    height: 50,
    borderRadius: 8,
  },
  gardenImageMedium: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  gardenImageLarge: {
    width: 100,
    height: 150,
    borderRadius: 16,
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
