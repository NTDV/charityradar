import Svg, { G, Line } from 'react-native-svg';

export const IconExit = ({ size = 14.267, stroke = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 14.267 14.267">
    <G
      id="Group_3330"
      data-name="Group 3330"
      transform="translate(7.133 -5.719) rotate(45)"
      opacity="0.7"
    >
      <Line
        id="Line_15"
        data-name="Line 15"
        x2="18.176"
        transform="translate(0 9.088)"
        fill="none"
        stroke={stroke}
        stroke-width="2"
      />
      <Line
        id="Line_16"
        data-name="Line 16"
        x2="18.175"
        transform="translate(9.088 0) rotate(90)"
        fill="none"
        stroke={stroke}
        stroke-width="2"
      />
    </G>
  </Svg>
);
