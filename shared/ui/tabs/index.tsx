import { theme } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { TabItem } from "./tab-item";
import { TabItemType } from "./types";

type Props = {
  activeTabIndex: number;
  tabsItems: TabItemType[];
  onChange: (tabIndex: number) => void;
};

export const Tabs = ({ activeTabIndex, tabsItems, onChange }: Props) => {

const handleTabClick = (tabIndex:number) => () => {
    onChange(tabIndex)
}

  return (
    <View style={styles.wrapper}>
      {tabsItems.map(({ index, label }) => (
        <TabItem onClick={handleTabClick(index)} isActive={index === activeTabIndex} label={label} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: 'space-between',
    borderRadius: 22,
    backgroundColor: theme.color.background.usual,
    paddingVertical: 8,
    paddingHorizontal: 6
  },
});
