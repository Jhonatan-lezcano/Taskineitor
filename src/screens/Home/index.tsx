import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useTheme from '../../hooks/useTheme';

const Home = () => {
  const {containerScreen} = useTheme();
  return (
    <View style={containerScreen.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
