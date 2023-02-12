import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useRef} from 'react';
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
import {
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {
  BREAK_TIME_MINUTES,
  FOCUS_TIME_MINUTES,
  TIMER_MODE_BREAK,
  TIMER_MODE_WORK,
} from '../../../utils/constants';
import BottomSheetModalBackground from '../../molecules/BottomSheetModalBackground';
import useBottomSheetModal from '../../../hooks/useBottomSheetModal';

const {width, height} = Dimensions.get('screen');

const Pomodoro = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {timerCount, timerInterval, timerMode, isTimerRunning} = useAppSelector(
    state => state.pomodoro,
  );
  const {
    showModal,
    handleCloseModalPress,
    handlePresentModalPress,
    handleSheetChanges,
  } = useBottomSheetModal();
  const customizePomodoro = useRef<BottomSheetModal>(null);
  const associateTaskRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const snapPointsAT = useMemo(() => ['40%', '70%'], []);

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

  return (
    <>
      <BottomSheetModalProvider>
        <HeaderTimers
          timerMode={timerMode}
          settingsAction={() => handlePresentModalPress(customizePomodoro)}
        />
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
            onPress={() => handlePresentModalPress(associateTaskRef)}
            fontSize={size.font16}
          />
        </View>
        <BottomSheetModalBackground
          refBottomSheet={customizePomodoro}
          indexSnapPoints={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleCloseModalPress={() => handleCloseModalPress(customizePomodoro)}
          showModalBackground={showModal}>
          <BottomSheetView style={styles.contentContainer}>
            <Title
              title="Customize the pomodoro"
              fontSize={size.font18}
              customStyles={{color: colors.onBackground, fontWeight: '500'}}
            />
          </BottomSheetView>
        </BottomSheetModalBackground>
        <BottomSheetModalBackground
          refBottomSheet={associateTaskRef}
          indexSnapPoints={1}
          snapPoints={snapPointsAT}
          onChange={handleSheetChanges}
          handleCloseModalPress={() => handleCloseModalPress(associateTaskRef)}
          showModalBackground={showModal}>
          <BottomSheetView style={styles.contentContainer}>
            <Title
              title="Asociar tarea"
              fontSize={size.font18}
              customStyles={{color: colors.onBackground, fontWeight: '500'}}
            />
          </BottomSheetView>
        </BottomSheetModalBackground>
      </BottomSheetModalProvider>
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
  contentContainer: {
    flex: 1,
    paddingVertical: 30,
  },
  backgoundModal: {
    height,
    left: 0,
    position: 'absolute',
    top: 0,
    width,
  },
});
