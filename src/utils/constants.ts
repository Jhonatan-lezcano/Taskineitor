import {Dimensions} from 'react-native';

//Timers Constants
export const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;
export const BREAK_TIME_MINUTES = 0.1 * 60 * 1000;
export const TIMER_MODE_WORK = 'work';
export const TIMER_MODE_BREAK = 'break';

//Tags Constans
export const PENDING = 0;
export const IN_PROCESS = 1;
export const COMPLETE = 2;

//screen measurements
export const WIDTH = Dimensions.get('screen').width;
export const HEIGHT = Dimensions.get('screen').height;
