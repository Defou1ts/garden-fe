import { ScrollView, StyleSheet, View } from "react-native";

import { CurrentDayOfWeek } from "@/components/current-day-of-week";
import { SegmentHeadline } from "@/components/sgement-headline";
import { TipsList } from "@/components/tips-list";
import { TodayDeals } from "@/components/today-deals";
import { RadioButtonItem } from "@/shared/ui/radio-button-group";
import { Typography } from "@/shared/ui/Typography";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";

const radios: RadioButtonItem[] = [
  {
    value: "1",
    label: "Вариант 1",
  },
  {
    value: "2",
    label: "Вариант 2",
  },
  {
    value: "disabled",
    label: "Недоступный вариант",
    disabled: true,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCheckBox, setSelectedCheckBox] = useState(radios[0]);
  const [switchActive, setSwitchActive] = useState(false);

  return (
    <ScrollView style={styles.wrapper}>
      <Typography type="title">Добро пожаловать!</Typography>

      <View style={styles.weather}>
        <Image
          style={styles.weatherImage}
          source={require("../../assets/images/sun.png")}
        />
      </View>

      <View style={styles.week}>
        <CurrentDayOfWeek />
      </View>
      <View style={styles.deals}>
        <TodayDeals />
      </View>
      <SegmentHeadline
        style={styles.tips}
        title="Советы"
        onPress={() => router.push("/tips")}
      />
      <TipsList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 64,
  },
  weather: {
    height: 123,
    borderRadius: 30,
    marginTop: 64,
  },
  weatherImage: {
    borderRadius: 30,
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },

  week: {
    marginTop: 32,
  },
  deals: {
    marginTop: 32,
  },

  tips: {
    marginTop: 64,
  },
});
