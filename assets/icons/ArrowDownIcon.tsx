import Svg, { Path, SvgProps } from "react-native-svg";
export const ArrowDownIcon = (props: SvgProps) => {
  return (
    <Svg width="30" height="17" viewBox="0 0 30 17" {...props} fill="none">
      <Path
        d="M-1.12511e-07 2.57394L2.67635 -1.19435e-06L15 11.8521L27.3237 -1.16987e-07L30 2.57394L15 17L-1.12511e-07 2.57394Z"
        fill={props.fill ? props.fill : "#FFF5F1"}
      />
    </Svg>
  );
};
