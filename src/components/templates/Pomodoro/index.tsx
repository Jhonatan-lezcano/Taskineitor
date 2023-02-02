import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import AnimationView from '../../atoms/AnimationView';
import meditation from '../../../assets/LottieFiles/meditation.json';
import workTime from '../../../assets/LottieFiles/work-on-home.json';
import useTheme from '../../../hooks/useTheme';
import ButtonText from '../../atoms/ButtonText';
import {size} from '../../../theme/fonts';
import Title from '../../atoms/Title';
import {useAppDispatch, useAppSelector} from '../../../store/hooks/hooks';
import {
  changeTimerModeValue,
  changeTimerValue,
  handlerTimerInterval,
  setIsTimerRunning,
  startTimer,
} from '../../../store/slices/pomodoro/pomodoroSlice';
import HeaderTimers from '../../organisms/HeaderTimers';
import {formatDate} from '../../../utils/helpers';
import TimerToggleButtons from '../../molecules/TimerToggleButtons';

const {width} = Dimensions.get('screen');
const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;
const BREAK_TIME_MINUTES = 0.1 * 60 * 1000;
const TIMER_MODE_WORK = 'work';
const TIMER_MODE_BREAK = 'break';

const Pomodoro = () => {
  const {colors} = useTheme();
  const {timerCount, timerInterval, timerMode, isTimerRunning} = useAppSelector(
    state => state.pomodoro,
  );
  const dispatch = useAppDispatch();

  const handlerStartTimer = () => {
    const interval = setInterval(() => dispatch(startTimer()), 1000);
    dispatch(handlerTimerInterval(interval));
    dispatch(setIsTimerRunning());
  };

  const stopTimer = () => {
    clearInterval(timerInterval ?? 0);
    dispatch(setIsTimerRunning());
  };

  useEffect(() => {
    if (timerCount < 0) {
      if (timerMode === TIMER_MODE_WORK) {
        dispatch(changeTimerValue(BREAK_TIME_MINUTES));
        dispatch(changeTimerModeValue(TIMER_MODE_BREAK));
      } else {
        dispatch(changeTimerValue(FOCUS_TIME_MINUTES));
        dispatch(changeTimerModeValue(TIMER_MODE_WORK));
      }
    }
  }, [timerCount]);

  const timerDate = new Date(timerCount);

  return (
    <>
      <HeaderTimers timerMode={timerMode} />
      <View style={styles.center}>
        {timerMode === TIMER_MODE_WORK && (
          <AnimationView animation={workTime} size={width * 0.8} />
        )}
        {timerMode === TIMER_MODE_BREAK && (
          <AnimationView animation={meditation} size={width * 0.8} />
        )}
      </View>

      <View style={styles.timerAndActions}>
        <Title
          title={formatDate(new Date(timerCount))}
          fontSize={size.font48}
          customStyles={{fontWeight: '200', color: colors.onBackground}}
        />
        <TimerToggleButtons
          startTimer={handlerStartTimer}
          stopTimer={stopTimer}
          isTimerRunning={isTimerRunning}
        />

        <ButtonText
          title="Associate task"
          titleColor={colors.primary}
          onPress={stopTimer}
          fontSize={size.font16}
        />
      </View>
    </>
  );
};

export default Pomodoro;

const styles = StyleSheet.create({
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
});
