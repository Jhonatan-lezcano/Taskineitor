import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import Select from '../../atoms/Select';
import {TIME_SELECT} from '../../../utils/constants';
import useTheme from '../../../hooks/useTheme';
import Spacer from '../../atoms/Spacer';
import {useAppSelector, useAppDispatch} from '../../../store/hooks/hooks';
import {
  changeTimerValue,
  setBreakTimePreference,
  setLongBreakTimePreference,
  setWorkingTimePreference,
} from '../../../store/slices/pomodoro/pomodoroSlice';
import Button from '../../atoms/Button';

const SettingsTimers = () => {
  const {colors} = useTheme();
  const {
    preferences: {workingTime, breakTime, longBreakTime},
  } = useAppSelector(state => state.pomodoro);
  const dispatch = useAppDispatch();

  const onChangeWorkingTime = (value: number) =>
    dispatch(setWorkingTimePreference(value));

  const onChangeBreakTime = (value: number) =>
    dispatch(setBreakTimePreference(value));

  const onChangeLongBreakTime = (value: number) =>
    dispatch(setLongBreakTimePreference(value));

  const applyChanges = () => {
    dispatch(changeTimerValue(workingTime));
  };

  return (
    <View>
      <Title
        title="Customize the pomodoro"
        fontSize={size.font20}
        customStyles={{color: colors.onBackground, fontWeight: '500'}}
      />
      <Spacer vertical={20} />
      <View style={styles.containerOptions}>
        <View style={styles.options}>
          <Title
            title="Working time"
            fontSize={size.font16}
            customStyles={{color: colors.onBackground, fontWeight: '500'}}
          />
          <Select
            options={TIME_SELECT}
            onChange={onChangeWorkingTime}
            valueSelect={workingTime}
          />
        </View>
        <View style={styles.options}>
          <Title
            title="Break time"
            fontSize={size.font16}
            customStyles={{color: colors.onBackground, fontWeight: '500'}}
          />
          <Select
            options={TIME_SELECT}
            onChange={onChangeBreakTime}
            valueSelect={breakTime}
          />
        </View>
        <View style={styles.options}>
          <Title
            title="Long break time"
            fontSize={size.font16}
            customStyles={{color: colors.onBackground, fontWeight: '500'}}
          />
          <Select
            options={TIME_SELECT}
            onChange={onChangeLongBreakTime}
            valueSelect={longBreakTime}
          />
        </View>
      </View>
      <Button
        text="Apply"
        radius={10}
        backgroundColor={colors.primary}
        titleColor={colors.onPrimary}
        onPress={applyChanges}
      />
    </View>
  );
};

export default SettingsTimers;

const styles = StyleSheet.create({
  containerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  options: {
    width: '40%',
    paddingBottom: 10,
  },
});
