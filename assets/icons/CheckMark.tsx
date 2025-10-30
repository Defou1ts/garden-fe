import Svg, { Path, SvgProps } from "react-native-svg";
export const CheckMarkIcon = (props: SvgProps) => {
  return (
    <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" {...props}>
      <Path
        d="M3 19.5638L12.2804 33.0002L33 3.00024"
        stroke="#799A8E"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
