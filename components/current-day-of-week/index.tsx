import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const CurrentDayOfWeek = () => {
  const router = useRouter();
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sunday, 1=Monday, ...

  // Преобразуем, чтобы неделя начиналась с понедельника
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  // Получаем все дни текущей недели
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });

  // Сокращенные обозначения дней недели
  const dayNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push("/calendar")}
    >
      {weekDays.map((date, index) => {
        const isToday =
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth();

        return (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayLabel}>{dayNames[index]}</Text>
            <View style={[styles.dateCircle, isToday && styles.todayCircle]}>
              <Text style={[styles.dateText, isToday && styles.todayText]}>
                {date.getDate()}
              </Text>
            </View>
          </View>
        );
      })}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  dayContainer: {
    alignItems: "center",
    width: 40,
  },
  dayLabel: {
    color: theme.color.background.usual,
    marginBottom: 6,
    fontSize: 14,
  },
  dateCircle: {
    width: 45,
    height: 45,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  todayCircle: {
    backgroundColor: theme.color.background.usual,
  },
  dateText: {
    fontSize: 16,
    color: theme.color.background.usual,
  },
  todayText: {
    color: theme.color.background.default,
  },
});
