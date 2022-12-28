import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useTheme from '../../hooks/useTheme';

const AddList = () => {
  const {containerScreen} = useTheme();
  return (
    <View style={containerScreen.container}>
      <Text>AddList</Text>
    </View>
  );
};

export default AddList;

const styles = StyleSheet.create({});
