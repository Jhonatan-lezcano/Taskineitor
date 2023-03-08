import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {
  changeTimerModeValue,
  changeTimerValue,
  setAssociateTask,
  setIsTimerRunning,
  setModalStopFlowtime,
  startTimer,
} from '../store/slices/flowtime/flowtimeSlice';
import useTasks from './useTasks';
import BackgroundTimer from 'react-native-background-timer';
import {TodoList} from '../store/slices/todoList/todoListSlice';
import {TIMER_MODE_BREAK, TIMER_MODE_WORK} from '../utils/constants';

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

const useFlowtime = () => {
  const dispatch = useAppDispatch();
  const {
    timerCount,
    timerMode,
    isTimerRunning,
    associatedTask,
    preferences: {workingTime, breakTime},
    preferences,
    modalStopFlowtime,
    list,
  } = useAppSelector(state => state.flowtime);
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
    dispatch(setModalStopFlowtime());
    dispatch(setAssociateTask(initialStateAssociatedTask));
  };

  const taskNotCompleted = () => {
    dispatch(setModalStopFlowtime());
    dispatch(setAssociateTask(initialStateAssociatedTask));
  };

  const stopFlowtime = () => {
    if (isTimerRunning || timerCount !== workingTime) {
      isTimerRunning && dispatch(setIsTimerRunning());
      dispatch(changeTimerValue(workingTime));
      dispatch(changeTimerModeValue(TIMER_MODE_WORK));
      if (associatedTask.id.length) dispatch(setModalStopFlowtime());
    }
  };

  const alertFlowtime = () => {
    handleStartPauseTimer();
    console.log('desea continuar trabajando?');
    dispatch(changeTimerValue(workingTime));
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
      dispatch(changeTimerValue(breakTime));
    } else if (timerCount < 0 && timerMode === TIMER_MODE_BREAK) {
      dispatch(changeTimerValue(workingTime));
      dispatch(changeTimerModeValue(TIMER_MODE_WORK));
    }

    if (timerCount === 0) {
      alertFlowtime();
      console.log('alarma');
    }
  }, [timerCount]);

  return {
    handleStartPauseTimer,
    timerCount,
    timerMode,
    isTimerRunning,
    stopFlowtime,
    taskCompleted,
    taskNotCompleted,
    preferences,
    associatedTask,
    modalStopFlowtime,
    list,
  };
};

export default useFlowtime;
