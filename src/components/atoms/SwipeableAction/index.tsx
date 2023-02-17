import {Animated, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../Button';

const SwipeableAction = (
  handlerAction: (index: number) => void,
  progress: ReturnType<Animated.Value['interpolate']>,
  background: string,
  textColor: string,
  index: number,
  interpolateValue: any,
  textButton: string,
  direction: 'left' | 'right',
) => {
  const opacity = progress.interpolate(interpolateValue);

  const margin = direction === 'left' ? {marginLeft: 4} : {marginRight: 4};
  return (
    <Animated.View style={[margin, {opacity}]}>
      <Button
        text={textButton}
        backgroundColor={background}
        radius={5}
        onPress={() => handlerAction(index)}
        titleColor={textColor}
        width="auto"
      />
    </Animated.View>
  );
};

export default SwipeableAction;

const styles = StyleSheet.create({});
