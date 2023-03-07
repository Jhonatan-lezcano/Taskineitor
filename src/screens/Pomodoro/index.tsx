import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import AnimationView from '../../components/atoms/AnimationView';
import meditation from '../../assets/LottieFiles/meditation.json';
import workTime from '../../assets/LottieFiles/work-on-home.json';
import useTheme from '../../hooks/useTheme';
import ButtonText from '../../components/atoms/ButtonText';
import ModalContainer from '../../components/organisms/ModalContainer/Index';
import {size} from '../../theme/fonts';
import Title from '../../components/atoms/Title';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {setModalStopPomodoro} from '../../store/slices/pomodoro/pomodoroSlice';
import HeaderTimers from '../../components/organisms/HeaderTimers';
import {formatDate} from '../../utils/helpers';
import TimerToggleButtons from '../../components/molecules/TimerToggleButtons';
import {
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {TIMER_MODE_BREAK, TIMER_MODE_WORK, WIDTH} from '../../utils/constants';
import BottomSheetModalBackground from '../../components/molecules/BottomSheetModalBackground';
import useBottomSheetModal from '../../hooks/useBottomSheetModal';
import AssociateTask from '../../components/organisms/AssociateTask';
import usePomodoro from '../../hooks/usePomodoro';
import StopModal from '../../components/organisms/StopModal';
import SettingsTimers from '../../components/organisms/SettingsTimers';

const Pomodoro = () => {
  const {colors, containerScreen} = useTheme();
  const dispatch = useAppDispatch();
  const {todoList} = useAppSelector(state => state.todoList);
  const {associatedTask, modalStopPomodoro, list} = useAppSelector(
    state => state.pomodoro,
  );
  const {
    showModal,
    handleCloseModalPress,
    handlePresentModalPress,
    handleSheetChanges,
  } = useBottomSheetModal();
  const customizePomodoro = useRef<BottomSheetModal>(null);
  const {
    handleStartPauseTimer,
    stopPomodoro,
    timerCount,
    timerMode,
    isTimerRunning,
  } = usePomodoro();
  const [associateTaskModal, setAssociateTaskModal] = useState(false);

  const snapPoints = Platform.OS === 'android' ? ['50%'] : ['95%'];

  return (
    <View style={containerScreen.container}>
      <BottomSheetModalProvider>
        <HeaderTimers
          timerMode={timerMode}
          settingsAction={() => handlePresentModalPress(customizePomodoro)}
        />
        <View style={styles.center}>
          {timerMode === TIMER_MODE_WORK && (
            <AnimationView animation={workTime} size={WIDTH * 0.8} />
          )}
          {timerMode === TIMER_MODE_BREAK && (
            <AnimationView animation={meditation} size={WIDTH * 0.8} />
          )}
        </View>

        <View style={styles.timerAndActions}>
          <Title
            title={formatDate(new Date(timerCount))}
            fontSize={size.font48}
            customStyles={{fontWeight: '200', color: colors.onBackground}}
          />
          <TimerToggleButtons
            startPauseTimer={handleStartPauseTimer}
            stopTimer={stopPomodoro}
            isTimerRunning={isTimerRunning}
          />
          <View style={{height: size.font18}}>
            {!associatedTask.id.length && !isTimerRunning ? (
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
        </View>
        <BottomSheetModalBackground
          refBottomSheet={customizePomodoro}
          indexSnapPoints={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleCloseModalPress={() => handleCloseModalPress(customizePomodoro)}
          showModalBackground={showModal}>
          <BottomSheetView style={styles.contentContainer}>
            <SettingsTimers />
          </BottomSheetView>
        </BottomSheetModalBackground>
        <ModalContainer
          visible={associateTaskModal}
          closeModal={() => setAssociateTaskModal(!associateTaskModal)}
          width={WIDTH * 0.95}>
          <AssociateTask
            todoList={todoList}
            closeModal={() => setAssociateTaskModal(!associateTaskModal)}
          />
        </ModalContainer>
        <ModalContainer
          visible={modalStopPomodoro}
          closeModal={() => dispatch(setModalStopPomodoro())}
          width={WIDTH * 0.95}>
          <StopModal associatedTask={associatedTask} list={list} />
        </ModalContainer>
      </BottomSheetModalProvider>
    </View>
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
  associatedTask: {
    fontSize: size.font16,
    fontWeight: '500',
  },
});
