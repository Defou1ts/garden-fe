import { theme } from "@/constants/theme";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import { Typography } from "@/shared/ui/Typography";
import { Stack } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type MonthGridProps = {
  baseDate: Date; // any day within the month to render
};

function getMonthMatrix(baseDate: Date) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  const startDay = (firstOfMonth.getDay() + 6) % 7; // make Monday=0
  const totalDays = lastOfMonth.getDate();

  const weeks: (number | null)[][] = [];
  let current = 1;

  // up to 6 weeks
  for (let w = 0; w < 6; w++) {
    const week: (number | null)[] = Array(7).fill(null);
    for (let d = 0; d < 7; d++) {
      if ((w === 0 && d < startDay) || current > totalDays) {
        // empty cell
      } else {
        week[d] = current++;
      }
    }
    weeks.push(week);
    if (current > totalDays) break;
  }
  return weeks;
}

const dayLabels = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const MonthGrid = ({ baseDate }: MonthGridProps) => {
  const today = new Date();
  const monthTitle = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("ru-RU", {
      month: "long",
      year: "numeric",
    });
    const text = formatter.format(baseDate);
    return text.charAt(0).toUpperCase() + text.slice(1);
  }, [baseDate]);

  const matrix = useMemo(() => getMonthMatrix(baseDate), [baseDate]);

  return (
    <View style={styles.monthSection}>
      <Typography type="default" style={styles.monthTitle}>
        {monthTitle}
      </Typography>

      <View style={styles.weekHeaderRow}>
        {dayLabels.map((label) => (
          <Typography key={label} style={styles.weekHeaderLabel}>
            {label}
          </Typography>
        ))}
      </View>

      {matrix.map((week, i) => (
        <View key={i} style={styles.weekRow}>
          {week.map((day, j) => {
            const isToday =
              day !== null &&
              today.getDate() === day &&
              today.getMonth() === baseDate.getMonth() &&
              today.getFullYear() === baseDate.getFullYear();
            return (
              <View
                key={j}
                style={[styles.dayCell, isToday && styles.dayCellActive]}
              >
                {day !== null ? (
                  <>
                    <Typography
                      style={[
                        styles.dayNumber,
                        isToday && styles.dayNumberActive,
                      ]}
                    >
                      {day}
                    </Typography>
                    <View style={[styles.dot, isToday && styles.dotActive]} />
                  </>
                ) : (
                  <View />
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default function CalendarScreen() {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const next2 = new Date(now.getFullYear(), now.getMonth() + 2, 1);

  return (
    <>
      <Stack.Screen
        options={buildDefaultHeaderOptions({ title: "Календарь" })}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <MonthGrid baseDate={now} />
        <MonthGrid baseDate={next} />
        <MonthGrid baseDate={next2} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 48,
  },
  monthSection: {
    paddingHorizontal: 12,
    marginTop: 12,
  },
  monthTitle: {
    textAlign: "center",
    marginBottom: 8,
  },
  weekHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  weekHeaderLabel: {
    color: theme.color.background.usual,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  dayCell: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.color.background.usual,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCellActive: {
    backgroundColor: theme.color.background.usual,
    borderColor: theme.color.background.usual,
  },
  dayNumber: {
    color: theme.color.background.usual,
  },
  dayNumberActive: {
    color: theme.color.background.default,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    marginTop: 6,
    backgroundColor: theme.color.background.usual,
  },
  dotActive: {
    backgroundColor: theme.color.background.default,
  },
});
