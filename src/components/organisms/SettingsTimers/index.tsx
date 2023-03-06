import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import Select from '../../atoms/Select';
import {TIME_SELECT} from '../../../utils/constants';
import useTheme from '../../../hooks/useTheme';
import Spacer from '../../atoms/Spacer';

const SettingsTimers = () => {
  const {colors} = useTheme();
  const [first, setfirst] = useState(25);
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
            onChange={setfirst}
            valueSelect={first}
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
            onChange={setfirst}
            valueSelect={first}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingsTimers;

const styles = StyleSheet.create({
  containerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  options: {
    width: '40%',
  },
});
