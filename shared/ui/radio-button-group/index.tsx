import { StyleSheet, View } from "react-native";
import { RadioButton } from "./radio-button";

export type RadioButtonItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

type Props = {
  selected: RadioButtonItem;
  items: RadioButtonItem[];
  onChange: (selected: RadioButtonItem) => void;
};

export const RadioButtonGroup = ({ selected, items, onChange }: Props) => {
  const handleRadioButtonClick = (item: RadioButtonItem) => () => {
    onChange(item);
  };

  return (
    <View style={styles.wrapper}>
      {items.map((item) => (
        <RadioButton
          key={item.value}
          disabled={item.disabled}
          onPress={handleRadioButtonClick(item)}
          checked={selected.value === item.value}
          label={item.label}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    gap: 18,
  },
});
