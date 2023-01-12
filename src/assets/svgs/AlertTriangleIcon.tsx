import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

interface Props {
  size: number;
  fillColor: string;
}

const AlertTriangleIcon = ({size, fillColor}: Props) => {
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
      <Path d="M12 9v2m0 4v.01" />
      <Path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
    </Svg>
  );
};

export default AlertTriangleIcon;
