import {View, Text} from 'react-native';
import React from 'react';
import {Line, Path, Svg} from 'react-native-svg';

interface Props {
  size: number;
  fillColor: string;
}

const RefreshCircleIcon = ({size, fillColor}: Props) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={fillColor}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
      <Path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
      <Line x1="12" y1="9" x2="12" y2="12" />
      <Line x1="12" y1="15" x2="12.01" y2="15" />
    </Svg>
  );
};

export default RefreshCircleIcon;
