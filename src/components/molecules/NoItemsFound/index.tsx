import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AnimationView from '../../atoms/AnimationView';
import {AnimationObject} from 'lottie-react-native';
import {size} from '../../../theme/fonts';
import useTheme from '../../../hooks/useTheme';

interface Props {
  animation: AnimationObject;
  text: string;
  sizeAnimation: string | number;
  height: string | number;
  width: string | number;
}

const NoItemsFound = ({
  animation,
  text,
  sizeAnimation,
  height,
  width,
}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {height, width}]}>
      {animation && sizeAnimation && (
        <AnimationView animation={animation} size={sizeAnimation} />
      )}
      <Text style={[styles.text, {color: colors.onBackground}]}>{text}</Text>
    </View>
  );
};

export default NoItemsFound;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: size.font18,
    fontWeight: '500',
  },
});
