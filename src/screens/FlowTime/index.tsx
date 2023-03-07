import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useTheme from '../../hooks/useTheme';
import HeaderTimers from '../../components/organisms/HeaderTimers';
import {
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import AnimationView from '../../components/atoms/AnimationView';
import workTime from '../../assets/LottieFiles/work-on-home.json';
import {WIDTH} from '../../utils/constants';

const FlowTime = () => {
  const {containerScreen} = useTheme();
  return (
    <View style={containerScreen.container}>
      <BottomSheetModalProvider>
        <HeaderTimers timerMode="work" settingsAction={() => {}} />
        <View style={styles.center}>
          <AnimationView animation={workTime} size={WIDTH * 0.8} />
        </View>
      </BottomSheetModalProvider>
    </View>
  );
};

export default FlowTime;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 4,
    justifyContent: 'center',
    width: '100%',
  },
});
