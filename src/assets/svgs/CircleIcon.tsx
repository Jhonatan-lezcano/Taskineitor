import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Path, Svg} from 'react-native-svg';
import {PropsIcon} from '../../utils/Interfaces';

const CircleIcon = ({fillColor, size}: PropsIcon) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={fillColor}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Circle cx="12" cy="12" r="9" />
    </Svg>
  );
};

export default CircleIcon;
