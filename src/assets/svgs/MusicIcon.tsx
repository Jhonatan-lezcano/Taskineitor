import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Line, Path, Polyline, Svg} from 'react-native-svg';
import {PropsIcon} from '../../utils/Interfaces';

const MusicIcon = ({fillColor, size}: PropsIcon) => {
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
      <Circle cx="6" cy="17" r="3" />
      <Circle cx="16" cy="17" r="3" />
      <Polyline points="9 17 9 4 19 4 19 17" />
      <Line x1="9" y1="8" x2="19" y2="8" />
    </Svg>
  );
};

export default MusicIcon;
