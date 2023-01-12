import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Line, Path, Svg} from 'react-native-svg';

interface Props {
  size: number;
  fillColor: string;
}

const AlertCircleIcon = ({size, fillColor}: Props) => {
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
      <Circle cx="12" cy="12" r="9" />
      <Line x1="12" y1="8" x2="12" y2="12" />
      <Line x1="12" y1="16" x2="12.01" y2="16" />
    </Svg>
  );
};

export default AlertCircleIcon;
