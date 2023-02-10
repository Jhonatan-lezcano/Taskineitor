import {View, Text} from 'react-native';
import React from 'react';
import {Line, Path, Svg} from 'react-native-svg';
import {PropsIcon} from '../../utils/Interfaces';

const PlusIcon = ({size, fillColor}: PropsIcon) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      strokeWidth="2.5"
      stroke={fillColor}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Line x1="12" y1="5" x2="12" y2="19" />
      <Line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
  );
};

export default PlusIcon;

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-tabler icon-tabler-plus"
  width="44"
  height="44"
  viewBox="0 0 24 24"
  stroke-width="2.5"
  stroke="#ffffff"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <line x1="12" y1="5" x2="12" y2="19" />
  <line x1="5" y1="12" x2="19" y2="12" />
</svg>; */
}
