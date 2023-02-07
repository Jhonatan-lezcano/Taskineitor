import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useTheme from '../../../hooks/useTheme';
import Spacer from '../../atoms/Spacer';
import {size} from '../../../theme/fonts';

const {width} = Dimensions.get('screen');

interface Props {
  icon?: React.ElementType;
  message: string;
  borderLeftColor: string;
}

const ToastNotification = ({icon: Icon, message, borderLeftColor}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.toastContainer,
        {
          backgroundColor: colors.background,
          shadowColor: colors.onBackground,
          borderLeftColor,
        },
      ]}>
      {Icon && <Icon fillColor={borderLeftColor} size={size.font28} />}
      <Spacer vertical={30} horizontal={10} />
      <Text
        style={[
          styles.message,
          {
            color: colors.onBackground,
          },
        ]}>
        {message}
      </Text>
    </View>
  );
};

export default ToastNotification;

const styles = StyleSheet.create({
  toastContainer: {
    alignItems: 'center',
    borderRadius: 10,
    borderLeftWidth: 8,
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width * 0.8,
  },
  message: {
    width: '84%',
    textAlign: 'left',
    fontSize: size.font14,
    fontWeight: '500',
  },
});
