import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import Button from '../../atoms/Button';
import useTheme from '../../../hooks/useTheme';
import PlayIcon from '../../../assets/svgs/PlayIcon';
import StopIcon from '../../../assets/svgs/StopIcon';
import PauseIcon from '../../../assets/svgs/PauseIcon';

const {width, height} = Dimensions.get('screen');

interface Props {
  startTimer: () => void;
  stopTimer: () => void;
  isTimerRunning: boolean;
}

const TimerToggleButtons = ({startTimer, stopTimer, isTimerRunning}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      {isTimerRunning ? (
        <Button
          backgroundColor={colors.primary}
          text="Pause"
          titleColor={colors.onPrimary}
          radius={20}
          width={width * 0.25}
          icon={PauseIcon}
          sizeIcon={15}
          colorIcon={colors.onPrimary}
          customStyle={{padding: 10}}
          onPress={stopTimer}
        />
      ) : (
        <Button
          backgroundColor={colors.primary}
          text="Start"
          titleColor={colors.onPrimary}
          radius={20}
          width={width * 0.25}
          icon={PlayIcon}
          sizeIcon={15}
          colorIcon={colors.onPrimary}
          customStyle={{padding: 10}}
          onPress={startTimer}
        />
      )}
      <Button
        backgroundColor={colors.primary}
        text="Stop"
        titleColor={colors.onPrimary}
        radius={20}
        width={width * 0.25}
        icon={StopIcon}
        sizeIcon={15}
        colorIcon={colors.onPrimary}
        customStyle={{padding: 10}}
        onPress={startTimer}
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
