import {View, Text} from 'react-native';
import React from 'react';
import {Path, Rect, Svg} from 'react-native-svg';
import {PropsIcon} from '../../utils/Interfaces';

const StopIcon = ({fillColor, size}: PropsIcon) => {
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
      <Rect x="5" y="5" width="14" height="14" rx="2" />
    </Svg>
  );
};

export default StopIcon;
