import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type TextAlignTypes = 'auto' | 'center' | 'justify' | 'left' | 'right';

interface Props {
  title: string;
  fontSize: number;
  textAlign: TextAlignTypes;
  customStyles?: {};
  width?: string | number;
  lines?: number;
}

const Title = ({
  title,
  fontSize,
  textAlign,
  customStyles,
  width,
  lines,
}: Props) => {
  return (
    <View style={[customStyles, {width}]}>
      <Text style={[customStyles, {fontSize, textAlign}]} numberOfLines={lines}>
        {title}
      </Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({});

Title.defaultProps = {
  textAlign: 'center',
  width: '100%',
  fontSize: 20,
};
