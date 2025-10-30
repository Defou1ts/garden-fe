import { theme } from "@/constants/theme";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { Typography } from "@/shared/ui/Typography";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function PrivacyScreen() {
  return (
    <>
      <Stack.Screen
        options={buildDefaultHeaderOptions({ title: "Конфиденциальность" })}
      />
      <View style={styles.wrapper}>
        <View style={styles.listItem}>
          <Typography type="default">Поменять пароль</Typography>
        </View>
        <View style={styles.listItem}>
          <Typography type="default">Привязать учетную запись</Typography>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.color.background.default,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    marginBottom: 22,
  },
  listItem: {
    marginBottom: 22,
  },
});
