import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type TextAlignTypes = 'auto' | 'center' | 'justify' | 'left' | 'right';

interface Props {
  title: string;
  fontSize: number;
  textAlign: TextAlignTypes;
  customStyles?: {};
  width?: string | number;
}

const Title = ({title, fontSize, textAlign, customStyles, width}: Props) => {
  return (
    <View style={[customStyles, {width}]}>
      <Text style={[customStyles, {fontSize, textAlign}]}>{title}</Text>
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
