import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AnimationView from '../../../components/atoms/AnimationView';
import meditation from '../../../assets/LottieFiles/meditation.json';

const {width} = Dimensions.get('screen');

const Pomodoro = () => {
  return (
    <View>
      <Text>Pomodoro</Text>
      <AnimationView animation={meditation} size={width * 0.8} />
    </View>
  );
};

export default Pomodoro;

const styles = StyleSheet.create({});
