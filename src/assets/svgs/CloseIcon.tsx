import React from 'react';
import {Line, Path, Svg} from 'react-native-svg';
import {PropsIcon} from '../../utils/Interfaces';

const CloseIcon = ({size, fillColor}: PropsIcon) => {
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
      <Line x1="18" y1="6" x2="6" y2="18" />
      <Line x1="6" y1="6" x2="18" y2="18" />
    </Svg>
  );
};

export default CloseIcon;
