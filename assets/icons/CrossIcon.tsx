import { theme } from "@/constants/theme";
import Svg, { Path, SvgProps } from "react-native-svg";
export const CrossIcon = (props: SvgProps) => {
  return (
    <Svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill={theme.color.background.usual}
      {...props}
    >
      <Path
        d="M33 3L3 33M3.00006 3L33 33"
        stroke="#F75C71"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
