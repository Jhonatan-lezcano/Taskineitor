import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {
  changeTimerModeValue,
  changeTimerValue,
  setIsTimerRunning,
  setModalStopPomodoro,
  startTimer,
  setAssociateTask,
  setNumberOfTimersCompleted,
} from '../store/slices/pomodoro/pomodoroSlice';
import {TIMER_MODE_BREAK, TIMER_MODE_WORK} from '../utils/constants';
import BackgroundTimer from 'react-native-background-timer';
import useTasks from './useTasks';
import {TodoList} from '../store/slices/todoList/todoListSlice';

const initialStateAssociatedTask = {
  associatedTask: {
    id: '',
    completed: false,
    createAt: 0,
    description: '',
    label: 0,
    name: '',
  },
  list: {
    id: '',
    color: '',
    createAt: 0,
    name: '',
    todos: [],
    userId: 'string',
  },
};

const usePomodoro = () => {
  const dispatch = useAppDispatch();
  const {
    timerCount,
    timerMode,
    isTimerRunning,
    associatedTask,
    numberOfTimersCompleted,
    preferences: {workingTime, breakTime, longBreakTime},
  } = useAppSelector(state => state.pomodoro);
  const {todoComplete} = useTasks();

  const handleStartPauseTimer = () => {
    dispatch(setIsTimerRunning());
  };

  const startTimerBackground = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      dispatch(startTimer());
    }, 1000);
  };

  const taskCompleted = (list: TodoList, idItem: string) => {
    todoComplete(list, idItem);
    dispatch(setModalStopPomodoro());
    dispatch(setAssociateTask(initialStateAssociatedTask));
  };

  const taskNotCompleted = () => {
    dispatch(setModalStopPomodoro());
    dispatch(setAssociateTask(initialStateAssociatedTask));
  };

  const stopPomodoro = () => {
    if (isTimerRunning || timerCount !== workingTime) {
      isTimerRunning && dispatch(setIsTimerRunning());
      dispatch(changeTimerValue(workingTime));
      dispatch(changeTimerModeValue(TIMER_MODE_WORK));
      dispatch(setNumberOfTimersCompleted(0));
      if (associatedTask.id.length) dispatch(setModalStopPomodoro());
    }
  };

  useEffect(() => {
    if (isTimerRunning) startTimerBackground();
    else BackgroundTimer.stopBackgroundTimer();

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [isTimerRunning]);

  useEffect(() => {
    if (timerCount < 0 && timerMode === TIMER_MODE_WORK) {
      dispatch(changeTimerModeValue(TIMER_MODE_BREAK));
      dispatch(
        changeTimerValue(
          numberOfTimersCompleted === 4 ? longBreakTime : breakTime,
        ),
      );
    } else if (timerCount < 0 && timerMode === TIMER_MODE_BREAK) {
      dispatch(changeTimerValue(workingTime));
      dispatch(changeTimerModeValue(TIMER_MODE_WORK));
    }

    if (numberOfTimersCompleted === 4 && timerMode === TIMER_MODE_BREAK)
      dispatch(setNumberOfTimersCompleted(0));

    if (timerCount === 0 && timerMode === TIMER_MODE_WORK)
      dispatch(setNumberOfTimersCompleted(numberOfTimersCompleted + 1));

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
    taskNotCompleted,
  };
};

export default usePomodoro;
