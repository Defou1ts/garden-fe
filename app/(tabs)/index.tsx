import { ScrollView, StyleSheet, View } from "react-native";

import { useAdvices } from "@/api/hooks/advice/useAdvices";
import { useCalendarToday } from "@/api/hooks/calendar/useCalendarToday";
import { useWeather } from "@/api/hooks/weather/useWeather";
import { CurrentDayOfWeek } from "@/components/current-day-of-week";
import { SegmentHeadline } from "@/components/sgement-headline";
import { TipsList } from "@/components/tips-list";
import { TodayDeals } from "@/components/today-deals";
import { RadioButtonItem } from "@/shared/ui/radio-button-group";
import { Typography } from "@/shared/ui/Typography";
import { getPhotoUrl } from "@/utils/getPhotoUrl";
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

  // TODO: заменить на реальную геолокацию/профиль пользователя
  const DEFAULT_COORDS = { lat: 55.7558, lon: 37.6173 }; // Москва

  const weatherQuery = useWeather(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon);
  const todayQuery = useCalendarToday();
  const advicesQuery = useAdvices();

  return (
    <ScrollView style={styles.wrapper}>
      <Typography type="title">Добро пожаловать!</Typography>

      <View style={styles.weather}>
        <Image
          style={styles.weatherImage}
          source={
            getPhotoUrl(weatherQuery.data?.photoUrl ?? "") ??
            require("../../assets/images/sun.png")
          }
        />
        {weatherQuery.data ? (
          <View style={styles.weatherTextContainer}>
            <Typography style={styles.weatherText}>18 сентября</Typography>
            <Typography style={styles.weatherText}>
              {weatherQuery.data.dayTemperature}° /{" "}
              {weatherQuery.data.nightTemperature}°{" "}
              {weatherQuery.data.weatherName}
            </Typography>
          </View>
        ) : null}
      </View>

      <View style={styles.week}>
        <CurrentDayOfWeek />
      </View>
      <View style={styles.deals}>
        <TodayDeals tasks={todayQuery.data} isLoading={todayQuery.isLoading} />
      </View>
      <SegmentHeadline
        style={styles.tips}
        title="Советы"
        onPress={() => router.push("/tips")}
      />
      <TipsList
        advices={advicesQuery.data}
        isLoading={advicesQuery.isLoading}
      />
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
  weatherTextContainer: {
    color: "white",
    marginTop: 48,
    paddingHorizontal: 24,
    position: "absolute",
  },
  weatherText: {
    color: "white",
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
