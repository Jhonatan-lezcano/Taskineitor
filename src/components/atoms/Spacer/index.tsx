import {View} from 'react-native';
import React from 'react';

interface Props {
  vertical: string | number;
  horizontal: string | number;
  background?: string;
}

const Spacer = ({horizontal, vertical, background}: Props) => {
  return (
    <View
      style={{
        height: vertical,
        width: horizontal,
        backgroundColor: background,
      }}
    />
  );
};

export default Spacer;

Spacer.defaultProps = {
  horizontal: '100%',
  vertical: 50,
};
