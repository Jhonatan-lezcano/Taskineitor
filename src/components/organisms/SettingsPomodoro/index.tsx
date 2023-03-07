import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
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

interface Props {
  closeModal: () => void;
}

const SettingsPomodoro = ({closeModal}: Props) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {
    preferences: {workingTime, breakTime, longBreakTime},
  } = useAppSelector(state => state.pomodoro);
  const [selects, setSelects] = useState({
    workingTime,
    breakTime,
    longBreakTime,
  });

  const onChangeValue = (name: string, value: number) => {
    setSelects(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyChanges = () => {
    dispatch(changeTimerValue(selects.workingTime));
    dispatch(setWorkingTimePreference(selects.workingTime));
    dispatch(setBreakTimePreference(selects.breakTime));
    dispatch(setLongBreakTimePreference(selects.longBreakTime));
    closeModal();
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
            name="workingTime"
            options={TIME_SELECT}
            onChange={onChangeValue}
            valueSelect={selects.workingTime}
          />
        </View>
        <View style={styles.options}>
          <Title
            title="Break time"
            fontSize={size.font16}
            customStyles={{color: colors.onBackground, fontWeight: '500'}}
          />
          <Select
            name="breakTime"
            options={TIME_SELECT}
            onChange={onChangeValue}
            valueSelect={selects.breakTime}
          />
        </View>
        <View style={styles.options}>
          <Title
            title="Long break time"
            fontSize={size.font16}
            customStyles={{color: colors.onBackground, fontWeight: '500'}}
          />
          <Select
            name="longBreakTime"
            options={TIME_SELECT}
            onChange={onChangeValue}
            valueSelect={selects.longBreakTime}
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

export default SettingsPomodoro;

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
