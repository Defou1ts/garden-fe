import { Typography } from "@/shared/ui/Typography";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function NotificationsScreen() {
  return (
    <>
      <Stack.Screen options={buildDefaultHeaderOptions({ title: "О нас" })} />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Typography style={styles.desc} type="default">
          Мы самые крутые разработчики этого приложения с 3 курса, лютые
          огородники, мы чето там сделали, работает - не трогай, долго грузит -
          подожди
        </Typography>
        <View style={styles.listWrapper}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("@/assets/images/yoon.png")}
              contentFit="cover"
            />
          </View>
          <View style={styles.imageContainer}>
            {" "}
            <Image
              style={styles.image}
              source={require("@/assets/images/shved.png")}
              contentFit="cover"
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("@/assets/images/max.png")}
              contentFit="cover"
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 32,
  },
  desc: {
    marginTop: 32,
  },
  listWrapper: {
    marginTop: 32,
    flexDirection: "column",
    gap: 32,
  },
  image: {
    borderRadius: 30,
    height: 200,
  },
  imageContainer: {
    flex: 1,
  },
});
