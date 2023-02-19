import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import AnimationView from '../../atoms/AnimationView';
import meditation from '../../../assets/LottieFiles/meditation.json';
import workTime from '../../../assets/LottieFiles/work-on-home.json';
import useTheme from '../../../hooks/useTheme';
import ButtonText from '../../atoms/ButtonText';
import ModalContainer from '../../organisms/ModalContainer/Index';
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
import {TIMER_MODE_BREAK, TIMER_MODE_WORK} from '../../../utils/constants';
import BottomSheetModalBackground from '../../molecules/BottomSheetModalBackground';
import useBottomSheetModal from '../../../hooks/useBottomSheetModal';
import AssociateTask from '../../organisms/AssociateTask';
import usePomodoro from '../../../hooks/usePomodoro';

const {width, height} = Dimensions.get('screen');

const Pomodoro = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {todoList} = useAppSelector(state => state.todoList);
  const {associatedTask} = useAppSelector(state => state.pomodoro);
  const {
    showModal,
    handleCloseModalPress,
    handlePresentModalPress,
    handleSheetChanges,
  } = useBottomSheetModal();
  const customizePomodoro = useRef<BottomSheetModal>(null);
  const {handlerStartStopTimer, timerCount, timerMode, isTimerRunning} =
    usePomodoro();
  const [associateTaskModal, setAssociateTaskModal] = useState(false);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

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
            startTimer={handlerStartStopTimer}
            stopTimer={handlerStartStopTimer}
            isTimerRunning={isTimerRunning}
          />
          {!associatedTask ? (
            <ButtonText
              title="Associate task"
              titleColor={colors.primary}
              onPress={() => setAssociateTaskModal(!associateTaskModal)}
              fontSize={size.font16}
            />
          ) : (
            <Text style={[styles.associatedTask, {color: colors.primary}]}>
              {associatedTask.name}
            </Text>
          )}
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
        <ModalContainer
          visible={associateTaskModal}
          closeModal={() => setAssociateTaskModal(!associateTaskModal)}
          width={width * 0.95}>
          <AssociateTask
            todoList={todoList}
            closeModal={() => setAssociateTaskModal(!associateTaskModal)}
          />
        </ModalContainer>
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
    paddingVertical: 20,
  },
  backgoundModal: {
    height,
    left: 0,
    position: 'absolute',
    top: 0,
    width,
  },
  associatedTask: {
    fontSize: size.font16,
    fontWeight: '500',
  },
});
