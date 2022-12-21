import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {size} from '../../../theme/fonts';
import {lightMode} from '../../../theme/colors';

interface Props {
  text: string;
  backgroundColor: string;
  titleColor: string;
  radius: number;
  onPress: () => void;
  shadow?: boolean;
  width: string | number;
}

const Button = ({
  text,
  backgroundColor,
  titleColor,
  radius,
  onPress,
  shadow,
  width,
}: Props) => {
  const shadowButton = {
    shadowColor: lightMode.colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  };
  return (
    <TouchableOpacity
      style={[
        styles.button,
        shadow && shadowButton,
        {backgroundColor, borderRadius: radius, width},
      ]}
      onPress={onPress}>
      <Text style={[styles.text, {color: titleColor}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: size.font14,
  },
});
