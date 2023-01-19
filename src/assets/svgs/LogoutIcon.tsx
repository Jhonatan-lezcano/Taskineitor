import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {PropsIcon} from '../../utils/Interfaces';

const LogoutIcon = ({fillColor, size}: PropsIcon) => {
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
      <Path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <Path d="M7 12h14l-3 -3m0 6l3 -3" />
    </Svg>
  );
};

export default LogoutIcon;
