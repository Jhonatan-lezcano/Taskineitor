import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {
  changeTimerModeValue,
  changeTimerValue,
  setIsTimerRunning,
  setModalStopPomodoro,
  startTimer,
  setAssociateTask,
} from '../store/slices/pomodoro/pomodoroSlice';
import {
  BREAK_TIME_MINUTES,
  FOCUS_TIME_MINUTES,
  TIMER_MODE_BREAK,
  TIMER_MODE_WORK,
} from '../utils/constants';
import BackgroundTimer from 'react-native-background-timer';

const usePomodoro = () => {
  const dispatch = useAppDispatch();
  const {timerCount, timerMode, isTimerRunning, associatedTask} =
    useAppSelector(state => state.pomodoro);
  const handleStartPauseTimer = () => {
    dispatch(setIsTimerRunning());
  };

  const startTimerBackground = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      dispatch(startTimer());
    }, 1000);
  };

  const taskCompleted = () => {
    dispatch(setModalStopPomodoro());
    dispatch(setAssociateTask(null));
  };

  const stopPomodoro = () => {
    if (isTimerRunning) {
      dispatch(setIsTimerRunning());
      dispatch(changeTimerValue(FOCUS_TIME_MINUTES));
      dispatch(changeTimerModeValue(TIMER_MODE_WORK));
      if (associatedTask) dispatch(setModalStopPomodoro());
    }
  };

  useEffect(() => {
    console.log(isTimerRunning);
    if (isTimerRunning) startTimerBackground();
    else BackgroundTimer.stopBackgroundTimer();

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [isTimerRunning]);

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
    handleStartPauseTimer,
    timerCount,
    timerMode,
    isTimerRunning,
    stopPomodoro,
    taskCompleted,
  };
};

export default usePomodoro;
