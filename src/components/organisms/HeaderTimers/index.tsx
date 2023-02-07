import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Spacer from '../../atoms/Spacer';
import Button from '../../atoms/Button';
import useTheme from '../../../hooks/useTheme';
import MusicIcon from '../../../assets/svgs/MusicIcon';
import SettingsIcon from '../../../assets/svgs/SettingsIcon';
import {size} from '../../../theme/fonts';
import Title from '../../atoms/Title';

const {width} = Dimensions.get('screen');
const TIMER_MODE_WORK = 'work';
const TIMER_MODE_BREAK = 'break';

interface Props {
  timerMode: 'work' | 'break';
  settingsAction: () => void;
}

const HeaderTimers = ({timerMode, settingsAction}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={styles.header}>
      <Spacer vertical={45} />
      <View style={styles.btnHeader}>
        <Button
          backgroundColor={colors.background}
          radius={20}
          width={32}
          icon={MusicIcon}
          sizeIcon={size.font22}
          colorIcon={colors.primary}
          onPress={() => {}}
          customStyle={{
            padding: 0,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          shadow
        />
        <Button
          backgroundColor={colors.background}
          radius={20}
          width={32}
          icon={SettingsIcon}
          sizeIcon={size.font22}
          colorIcon={colors.primary}
          onPress={settingsAction}
          customStyle={{
            padding: 0,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          shadow
        />
      </View>
      <View style={[styles.indicators, {borderColor: colors.outline}]}>
        <View
          style={[
            styles.indicator,
            styles.radiusIndicatorLeft,
            {
              backgroundColor:
                timerMode === TIMER_MODE_WORK
                  ? colors.secondaryContainer
                  : colors.background,
              borderRightColor: colors.outline,
              borderRightWidth: 1,
            },
          ]}>
          <Text
            style={[
              styles.indicatorText,
              {
                color:
                  timerMode === TIMER_MODE_WORK
                    ? colors.OnSecondaryContainer
                    : colors.primary,
              },
            ]}>
            Work
          </Text>
        </View>
        <View
          style={[
            styles.indicator,
            styles.radiusIndicatorRight,
            {
              backgroundColor:
                timerMode === TIMER_MODE_BREAK
                  ? colors.secondaryContainer
                  : colors.background,
            },
          ]}>
          <Text
            style={[
              styles.indicatorText,
              {
                color:
                  timerMode === TIMER_MODE_BREAK
                    ? colors.OnSecondaryContainer
                    : colors.primary,
              },
            ]}>
            Break
          </Text>
        </View>
      </View>
      <Spacer vertical="15%" />
      <Title
        title={
          timerMode === TIMER_MODE_WORK
            ? '¡Stay focused! 👨‍💻'
            : '!Take a break! 💆'
        }
        fontSize={size.font18}
        customStyles={{color: colors.onBackground}}
      />
    </View>
  );
};

export default HeaderTimers;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flex: 3,
    width: '100%',
  },
  btnHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
  indicators: {
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.5,
  },
  radiusIndicatorLeft: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  radiusIndicatorRight: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  indicator: {
    paddingVertical: 15,
    textAlign: 'center',
    width: '50%',
  },
  indicatorText: {
    fontSize: size.font18,
    textAlign: 'center',
    width: '100%',
  },
});
