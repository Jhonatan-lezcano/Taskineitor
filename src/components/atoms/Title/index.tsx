import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {
  title: string;
  fontSize: number;
  textAlign: 'auto' | 'center' | 'justify' | 'left' | 'right';
  customStyles?: {};
}

const Title = ({title, fontSize, textAlign, customStyles}: Props) => {
  return (
    <View>
      <Text style={[customStyles, {fontSize, textAlign}]}>{title}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({});

Title.defaultProps = {
  textAlign: 'center',
};
