import {View, Text} from 'react-native';
import React from 'react';
import {Line, Path, Svg} from 'react-native-svg';
import {PropsIcon} from '../../utils/Interfaces';

const MenuIcon = ({fillColor, size}: PropsIcon) => {
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
      <Line x1="4" y1="6" x2="20" y2="6" />
      <Line x1="4" y1="12" x2="20" y2="12" />
      <Line x1="4" y1="18" x2="20" y2="18" />
    </Svg>
  );
};

export default MenuIcon;
