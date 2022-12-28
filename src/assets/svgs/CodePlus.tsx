import React from 'react';
import {Path, Svg} from 'react-native-svg';

interface Props {
  fillColor?: string;
  size?: number;
}

const CodePlus = ({fillColor, size}: Props) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={fillColor}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M9 12h6" />
      <Path d="M12 9v6" />
      <Path d="M6 19a2 2 0 0 1 -2 -2v-4l-1 -1l1 -1v-4a2 2 0 0 1 2 -2" />
      <Path d="M18 19a2 2 0 0 0 2 -2v-4l1 -1l-1 -1v-4a2 2 0 0 0 -2 -2" />
    </Svg>
  );
};

export default CodePlus;

CodePlus.defaultProps = {
  fillColor: '#000000',
  size: 24,
};
