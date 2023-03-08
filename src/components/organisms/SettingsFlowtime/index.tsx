import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import useTheme from '../../../hooks/useTheme';
import Spacer from '../../atoms/Spacer';
import Select from '../../atoms/Select';
import {TIME_SELECT, TIME_SELECT_LONG} from '../../../utils/constants';
import {useAppDispatch, useAppSelector} from '../../../store/hooks/hooks';
import {
  changeTimerValue,
  setBreakTimePreference,
  setWorkingTimePreference,
} from '../../../store/slices/flowtime/flowtimeSlice';
import Button from '../../atoms/Button';

interface Props {
  closeModal: () => void;
}

const SettingsFlowtime = ({closeModal}: Props) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {
    preferences: {workingTime, breakTime},
  } = useAppSelector(state => state.pomodoro);
  const [selects, setSelects] = useState({
    workingTime,
    breakTime,
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
    closeModal();
  };

  return (
    <View>
      <Title
        title="Customize the flowtime"
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
            options={TIME_SELECT_LONG}
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
      </View>
      <Spacer vertical={10} />
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

export default SettingsFlowtime;

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
