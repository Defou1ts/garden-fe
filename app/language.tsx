import { theme } from "@/constants/theme";
import { buildDefaultHeaderOptions } from "@/shared/ui/header";
import {
  RadioButtonGroup,
  RadioButtonItem,
} from "@/shared/ui/radio-button-group";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const LANGUAGES: RadioButtonItem[] = [
  { value: "en", label: "Английский" },
  { value: "ru", label: "Русский" },
  { value: "tm", label: "Туркменский" },
];

export default function LanguageScreen() {
  const [selected, setSelected] = useState(LANGUAGES[1]);

  return (
    <>
      <Stack.Screen options={buildDefaultHeaderOptions({ title: "Язык" })} />
      <View style={styles.wrapper}>
        <View style={styles.langs}>
          <RadioButtonGroup
            selected={selected}
            items={LANGUAGES}
            onChange={setSelected}
          />
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
  langs: {
    marginLeft: 7,
    marginTop: 3,
    gap: 18,
  },
});
