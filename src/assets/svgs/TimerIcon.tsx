import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Line, Path, Polyline, Svg} from 'react-native-svg';

interface Props {
  fillColor: string;
  size: number;
}

const TimerIcon = ({fillColor, size}: Props) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      strokeWidth="2"
      stroke={fillColor}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Circle cx="12" cy="13" r="7" />
      <Polyline points="12 10 12 13 14 13" />
      <Line x1="7" y1="4" x2="4.25" y2="6" />
      <Line x1="17" y1="4" x2="19.75" y2="6" />
    </Svg>
  );
};

export default TimerIcon;
