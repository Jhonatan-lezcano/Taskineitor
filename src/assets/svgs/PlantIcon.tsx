import {View, Text} from 'react-native';
import React from 'react';
import {PropsIcon} from '../../utils/Interfaces';
import {Path, Svg} from 'react-native-svg';

const PlantIcon = ({fillColor, size}: PropsIcon) => {
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
      <Path d="M2 9a10 10 0 1 0 20 0" />
      <Path d="M12 19a10 10 0 0 1 10 -10" />
      <Path d="M2 9a10 10 0 0 1 10 10" />
      <Path d="M12 4a9.7 9.7 0 0 1 2.99 7.5" />
      <Path d="M9.01 11.5a9.7 9.7 0 0 1 2.99 -7.5" />
    </Svg>
  );
};

export default PlantIcon;
