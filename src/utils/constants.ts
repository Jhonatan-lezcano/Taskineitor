import {Dimensions, Platform} from 'react-native';

//Timers Constants
export const DEFAULT_FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;
export const DEFAULT_BREAK_TIME_MINUTES = 0.1 * 60 * 1000;
export const LONG_BREAK_TIME_MINUTES = 0.15 * 60 * 1000;
export const TIMER_MODE_WORK = 'work';
export const TIMER_MODE_BREAK = 'break';
export const TIMER_POMODORO = 'pomodoro';
export const TIMER_FLOWTIME = 'flowTime';
export const TIME_SELECT = [
  {label: '5', value: 5 * 60 * 1000},
  {label: '10', value: 10 * 60 * 1000},
  {label: '15', value: 15 * 60 * 1000},
  {label: '20', value: 20 * 60 * 1000},
  {label: '25', value: 25 * 60 * 1000},
  {label: '30', value: 30 * 60 * 1000},
  {label: '35', value: 35 * 60 * 1000},
  {label: '40', value: 40 * 60 * 1000},
  {label: '45', value: 45 * 60 * 1000},
  {label: '50', value: 50 * 60 * 1000},
  {label: '55', value: 55 * 60 * 1000},
  {label: '60', value: 60 * 60 * 1000},
];

//Tags Constans
export const PENDING = 0;
export const IN_PROCESS = 1;
export const COMPLETE = 2;

//screen measurements
export const WIDTH = Dimensions.get('screen').width;
export const HEIGHT = Dimensions.get('screen').height;

//topOffset Toast
export const TOPOFFSET = Platform.OS === 'android' ? 50 : 50;

//Default values create task
export const DEFAULT_LABEL = 0;
export const DEFAULT_COMPLETED = false;
export const DEFAULT_CREATEAT = Date.now();

export const dateNow = () => {
  return Date.now();
};
