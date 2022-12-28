import {View, Text} from 'react-native';
import React from 'react';
import {Line, Path, Rect, Svg} from 'react-native-svg';

interface Props {
  fillColor: string;
  size: number;
}

const ClipboardListIcon = ({fillColor, size}: Props) => {
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
      <Path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <Rect x="9" y="3" width="6" height="4" rx="2" />
      <Line x1="9" y1="12" x2="9.01" y2="12" />
      <Line x1="13" y1="12" x2="15" y2="12" />
      <Line x1="9" y1="16" x2="9.01" y2="16" />
      <Line x1="13" y1="16" x2="15" y2="16" />
    </Svg>
  );
};

export default ClipboardListIcon;
