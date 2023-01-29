import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AnimationView from '../../../components/atoms/AnimationView';
import meditation from '../../../assets/LottieFiles/meditation.json';
import workTime from '../../../assets/LottieFiles/work-on-home.json';
import Button from '../../../components/atoms/Button';
import useTheme from '../../../hooks/useTheme';
import PlayIcon from '../../../assets/svgs/PlayIcon';
import ButtonText from '../../../components/atoms/ButtonText';
import {size} from '../../../theme/fonts';
import Title from '../../../components/atoms/Title';
import Spacer from '../../../components/atoms/Spacer';
import SettingsIcon from '../../../assets/svgs/SettingsIcon';
import MusicIcon from '../../../assets/svgs/MusicIcon';

const {width, height} = Dimensions.get('screen');

const Pomodoro = () => {
  const {colors} = useTheme();
  return (
    <>
      <View style={styles.header}>
        {Platform.OS === 'ios' && <Spacer vertical={45} />}
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
            onPress={() => {}}
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
              {
                backgroundColor: colors.secondaryContainer,
                borderRightColor: colors.outline,
                borderRightWidth: 1,
              },
            ]}>
            <Text
              style={[
                styles.indicatorText,
                {color: colors.OnSecondaryContainer},
              ]}>
              Work
            </Text>
          </View>
          <View style={styles.indicator}>
            <Text style={[styles.indicatorText, {color: colors.primary}]}>
              Break
            </Text>
          </View>
        </View>
        <Spacer vertical="15%" />
        <Title
          title="¡Stay focused!"
          fontSize={size.font18}
          customStyles={{color: colors.onBackground}}
        />
      </View>
      <View style={styles.center}>
        <AnimationView animation={workTime} size={width * 0.8} />
      </View>

      <View style={styles.timerAndActions}>
        <Title
          title="25:00"
          fontSize={size.font48}
          customStyles={{fontWeight: '200', color: colors.onBackground}}
        />
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
          onPress={() => {}}
        />
        <ButtonText
          title="Associate task"
          titleColor={colors.primary}
          onPress={() => {}}
          fontSize={size.font16}
        />
      </View>
    </>
  );
};

export default Pomodoro;

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
  indicator: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 15,
    textAlign: 'center',
    width: '50%',
  },
  indicatorText: {
    fontSize: size.font18,
    textAlign: 'center',
    width: '100%',
  },
  center: {
    alignItems: 'center',
    flex: 4,
    justifyContent: 'center',
    width: '100%',
  },
  timerAndActions: {
    alignItems: 'center',
    flex: 3,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  timer: {
    fontSize: size.font48,
    fontWeight: '200',
  },
});
