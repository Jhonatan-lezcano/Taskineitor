import {StyleSheet, View} from 'react-native';
import React from 'react';
import Button from '../../atoms/Button';
import useTheme from '../../../hooks/useTheme';
import PlayIcon from '../../../assets/svgs/PlayIcon';
import StopIcon from '../../../assets/svgs/StopIcon';
import PauseIcon from '../../../assets/svgs/PauseIcon';
import {WIDTH} from '../../../utils/constants';
import {PreferencesTimers} from '../../../store/slices/pomodoro/pomodoroSlice';

interface Props {
  startPauseTimer: () => void;
  stopTimer: () => void;
  isTimerRunning: boolean;
}

const TimerToggleButtons = ({
  startPauseTimer,
  stopTimer,
  isTimerRunning,
}: Props) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <Button
        backgroundColor={colors.primary}
        text={isTimerRunning ? 'Pause' : 'Start'}
        titleColor={colors.onPrimary}
        radius={20}
        width={WIDTH * 0.25}
        icon={isTimerRunning ? PauseIcon : PlayIcon}
        sizeIcon={15}
        colorIcon={colors.onPrimary}
        customStyle={{padding: 10}}
        onPress={startPauseTimer}
      />
      <Button
        backgroundColor={colors.primary}
        text="Stop"
        titleColor={colors.onPrimary}
        radius={20}
        width={WIDTH * 0.25}
        icon={StopIcon}
        sizeIcon={15}
        colorIcon={colors.onPrimary}
        customStyle={{padding: 10}}
        onPress={stopTimer}
      />
    </View>
  );
};

export default TimerToggleButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '70%',
  },
});
