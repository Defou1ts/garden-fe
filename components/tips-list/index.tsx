import type { Advice } from "@/api/advice.types";
import { Typography } from "@/shared/ui/Typography";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

type TipsListProps = {
  advices?: Advice[];
  isLoading?: boolean;
};

export const TipsList = ({ advices = [], isLoading }: TipsListProps) => {
  return (
    <View style={styles.wrapper}>
      {isLoading ? (
        <Typography type="default">Загружаем советы...</Typography>
      ) : (
        advices.map((advice) => (
          <View key={advice.id} style={styles.cardWrapper}>
            <Image style={styles.image} source={advice.photoUrl} />
            <Typography type="default">{advice.title}</Typography>
          </View>
        ))
      )}
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
