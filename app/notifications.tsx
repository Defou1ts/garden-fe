import { theme } from "@/constants/theme";
import { Typography } from "@/shared/ui/Typography";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { Switch } from "@/shared/ui/switch";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function NotificationsScreen() {
  const [watering, setWatering] = useState(true);
  const [repot, setRepot] = useState(true);
  const [feed, setFeed] = useState(true);

  return (
    <>
      <Stack.Screen
        options={buildDefaultHeaderOptions({ title: "Уведомления" })}
      />
      <View style={styles.wrapper}>
        <View style={styles.listItem}>
          <Typography type="default">Уведомления о поливе</Typography>
          <Switch isActive={watering} onPress={() => setWatering((v) => !v)} />
        </View>
        <View style={styles.listItem}>
          <Typography type="default">Уведомления о пересадке</Typography>
          <Switch isActive={repot} onPress={() => setRepot((v) => !v)} />
        </View>
        <View style={styles.listItem}>
          <Typography type="default">Уведомления о подкормке</Typography>
          <Switch isActive={feed} onPress={() => setFeed((v) => !v)} />
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
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
});
