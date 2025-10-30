import { Typography } from "@/shared/ui/Typography";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function HelpScreen() {
  return (
    <>
      <Stack.Screen
        options={buildDefaultHeaderOptions({ title: "Служба поддержки" })}
      />
      <View style={styles.wrapper}>
        <Typography style={styles.desc} type="default">
          Шото не работает
        </Typography>
        <Typography style={styles.desc} type="default">
          Не открывается аккаунт в гугле
        </Typography>
        <Typography style={styles.desc} type="default">
          Чето хотят от нас че не знаем
        </Typography>
        <View style={styles.write}>
          <Typography style={styles.desc} type="title">
            Нет нужного вопроса?
            <Typography style={styles.link} type="title">
              Напишите нам!
            </Typography>
          </Typography>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 32,
    flex: 1,
    flexDirection: "column",
  },
  desc: {
    marginTop: 32,
  },
  link: {
    color: "#5C83F7",
  },
  write: {
    left: 0,
    position: "absolute",
    bottom: 64,
  },
});
