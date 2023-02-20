import React from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {TOPOFFSET} from './constants';

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (date: Date) => {
  const MM = date.getMinutes();
  const SS = date.getSeconds();

  return `${MM.toString().padStart(2, '0')}:${SS.toString().padStart(2, '0')}`;
};

export const showToastMessage = (
  color: string,
  icon: React.ElementType,
  message: string,
) => {
  Toast.show({
    type: 'customToast',
    topOffset: TOPOFFSET,
    props: {
      message,
      borderLeftColor: color,
      icon,
    },
  });
};
