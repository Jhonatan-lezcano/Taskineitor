import React from 'react';
import {Path, Rect, Svg} from 'react-native-svg';
import {PropsIcon} from '../../utils/Interfaces';

const PauseIcon = ({fillColor, size}: PropsIcon) => {
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
      <Rect x="6" y="5" width="4" height="14" rx="1" />
      <Rect x="14" y="5" width="4" height="14" rx="1" />
    </Svg>
  );
};

export default PauseIcon;
