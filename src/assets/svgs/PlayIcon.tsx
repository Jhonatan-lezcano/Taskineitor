import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {PropsIcon} from '../../utils/Interfaces';

const PlayIcon = ({fillColor, size}: PropsIcon) => {
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
      <Path d="M7 4v16l13 -8z" />
    </Svg>
  );
};

export default PlayIcon;
