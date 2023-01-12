import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useTheme from '../../../hooks/useTheme';
import CheckIcon from '../../../assets/svgs/CheckIcon';
import Spacer from '../../atoms/Spacer';
import {size} from '../../../theme/fonts';
import {useAppSelector} from '../../../store/hooks/hooks';
import AlertTriangleIcon from '../../../assets/svgs/AlertTriangleIcon';
import RefreshCircleIcon from '../../../assets/svgs/RefreshCircleIcon';
import AlertCircleIcon from '../../../assets/svgs/AlertCircleIcon';

const {width, height} = Dimensions.get('screen');

const SUCCESS_TYPE = 'Success';
const WARNING_TYPE = 'Warning';
const DANGER_TYPE = 'Danger';
const UPDATE_TYPE = 'Update';

const ToastNotification = () => {
  const {type, message} = useAppSelector(state => state.toastNotification);
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.toastContainer,
        {
          backgroundColor: colors.background,
          shadowColor: colors.onBackground,
        },
      ]}>
      {type === SUCCESS_TYPE && (
        <CheckIcon size={30} fillColor={colors.alertColors.success} />
      )}
      {type === WARNING_TYPE && (
        <AlertTriangleIcon size={30} fillColor={colors.alertColors.warning} />
      )}
      {type === UPDATE_TYPE && (
        <RefreshCircleIcon size={30} fillColor={colors.alertColors.update} />
      )}
      {type === DANGER_TYPE && (
        <AlertCircleIcon size={30} fillColor={colors.alertColors.danger} />
      )}
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
    bottom: height * 0.1,
    borderRadius: 10,
    flexDirection: 'row',
    height: height * 0.085,
    left: width * 0.02,
    paddingHorizontal: 10,
    position: 'absolute',
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
