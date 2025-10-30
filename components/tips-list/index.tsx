import { Typography } from "@/shared/ui/Typography";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

const tips = [
  {
    imageSrc: require("@/assets/images/blueberry.png"),
    text: "Как правильно вырастить большую смородину?",
  },
  {
    imageSrc: require("@/assets/images/strawberry.png"),
    text: "Чем подкормить малину весной. 5 Проверенных удобрений",
  },
  {
    imageSrc: require("@/assets/images/sun.png"),
    text: "Подкормите весной малину и будет вам счастье",
  },
];

export const TipsList = () => {
  return (
    <View style={styles.wrapper}>
      {tips.map((tip) => (
        <View key={tip.text} style={styles.cardWrapper}>
          <Image style={styles.image} source={tip.imageSrc} />
          <Typography type="default">{tip.text}</Typography>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 32,
    flexDirection: "column",
    gap: 32,
  },
  cardWrapper: {
    flexDirection: "column",
    gap: 16,
  },
  image: {
    borderRadius: 20,
    width: "100%",
    height: 288,
    objectFit: "cover",
  },
});
