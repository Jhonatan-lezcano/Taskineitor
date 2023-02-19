import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {
  changeTimerModeValue,
  changeTimerValue,
  setIsTimerRunning,
  startTimer,
} from '../store/slices/pomodoro/pomodoroSlice';
import {
  BREAK_TIME_MINUTES,
  FOCUS_TIME_MINUTES,
  TIMER_MODE_BREAK,
  TIMER_MODE_WORK,
} from '../utils/constants';
import BackgroundTimer from 'react-native-background-timer';
import {Vibration} from 'react-native';

const usePomodoro = () => {
  const dispatch = useAppDispatch();
  const {timerCount, timerMode, isTimerRunning} = useAppSelector(
    state => state.pomodoro,
  );
  const handlerStartStopTimer = () => {
    dispatch(setIsTimerRunning());
  };

  const startTimerBackground = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      dispatch(startTimer());
    }, 1000);
  };

  useEffect(() => {
    console.log(isTimerRunning);
    if (isTimerRunning) startTimerBackground();
    else BackgroundTimer.stopBackgroundTimer;

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [isTimerRunning]);

  const startAlarm = () => Vibration.vibrate();

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

    if (timerCount === 0) {
      console.log('alarma');
    }
  }, [timerCount]);

  return {
    handlerStartStopTimer,
    timerCount,
    timerMode,
    isTimerRunning,
  };
};

export default usePomodoro;
