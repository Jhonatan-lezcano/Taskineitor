import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {
  changeTimerModeValue,
  changeTimerValue,
  handlerTimerInterval,
  setIsTimerRunning,
  startTimer,
} from '../store/slices/pomodoro/pomodoroSlice';
import {
  BREAK_TIME_MINUTES,
  FOCUS_TIME_MINUTES,
  TIMER_MODE_BREAK,
  TIMER_MODE_WORK,
} from '../utils/constants';

const usePomodoro = () => {
  const dispatch = useAppDispatch();
  const {timerCount, timerInterval, timerMode, isTimerRunning} = useAppSelector(
    state => state.pomodoro,
  );
  const handlerStartTimer = () => {
    const interval = setInterval(() => dispatch(startTimer()), 1000);
    dispatch(handlerTimerInterval(interval));
    dispatch(setIsTimerRunning());
  };

  const handlerStopTimer = () => {
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

  return {
    handlerStartTimer,
    handlerStopTimer,
    timerCount,
    timerMode,
    isTimerRunning,
  };
};

export default usePomodoro;
