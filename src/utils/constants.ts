import {Dimensions, Platform} from 'react-native';

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

//topOffset Toast
export const TOPOFFSET = Platform.OS === 'android' ? 50 : 50;

//Default values create task
export const DEFAULT_LABEL = 0;
export const DEFAULT_COMPLETED = false;
export const DEFAULT_CREATEAT = Date.now();
