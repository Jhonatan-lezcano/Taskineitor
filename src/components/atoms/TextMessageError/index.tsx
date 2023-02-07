import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {alertColors} from '../../../theme/colors';
import {size} from '../../../theme/fonts';

interface Props {
  message: any;
}

const TextMessageError = ({message}: Props) => {
  return (
    <Text style={[styles.textStyle, {color: alertColors.danger}]}>
      {message}
    </Text>
  );
};

export default TextMessageError;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: size.font12,
    height: 16,
  },
});
