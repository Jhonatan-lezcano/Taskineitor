import {StyleSheet, Text, View, Platform} from 'react-native';
import React, {useRef, useState} from 'react';
import useTheme from '../../hooks/useTheme';
import HeaderTimers from '../../components/organisms/HeaderTimers';
import {
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import AnimationView from '../../components/atoms/AnimationView';
import workTime from '../../assets/LottieFiles/man-working-on-laptop-in-office.json';
import breakTime from '../../assets/LottieFiles/girl-meditating.json';
import {TIMER_MODE_BREAK, TIMER_MODE_WORK, WIDTH} from '../../utils/constants';
import useBottomSheetModal from '../../hooks/useBottomSheetModal';
import Title from '../../components/atoms/Title';
import {formatDate} from '../../utils/helpers';
import useFlowtime from '../../hooks/useFlowtime';
import {size} from '../../theme/fonts';
import TimerToggleButtons from '../../components/molecules/TimerToggleButtons';
import ButtonText from '../../components/atoms/ButtonText';
import BottomSheetModalBackground from '../../components/molecules/BottomSheetModalBackground';
import ModalContainer from '../../components/organisms/ModalContainer/Index';
import {useAppSelector, useAppDispatch} from '../../store/hooks/hooks';
import AssociateTask, {
  StateRadio,
} from '../../components/organisms/AssociateTask';
import {
  setAssociateTask,
  setModalStopFlowtime,
} from '../../store/slices/flowtime/flowtimeSlice';
import StopModal from '../../components/organisms/StopModal';
import SettingsFlowtime from '../../components/organisms/SettingsFlowtime';

const FlowTime = () => {
  const {containerScreen, colors} = useTheme();
  const {todoList} = useAppSelector(state => state.todoList);
  const dispatch = useAppDispatch();
  const [associateTaskModal, setAssociateTaskModal] = useState(false);
  const settingsFlowtime = useRef<BottomSheetModal>(null);
  const {
    showModal,
    handleCloseModalPress,
    handlePresentModalPress,
    handleSheetChanges,
  } = useBottomSheetModal();
  const {
    timerCount,
    handleStartPauseTimer,
    stopFlowtime,
    isTimerRunning,
    preferences,
    associatedTask,
    modalStopFlowtime,
    list,
    taskCompleted,
    taskNotCompleted,
    timerMode,
  } = useFlowtime();

  const snapPoints = Platform.OS === 'android' ? ['40%'] : ['60%'];

  const associateTask = (select: StateRadio) =>
    dispatch(setAssociateTask(select));

  return (
    <View style={containerScreen.container}>
      <BottomSheetModalProvider>
        <HeaderTimers
          timerMode={timerMode}
          settingsAction={() => handlePresentModalPress(settingsFlowtime)}
        />
        <View style={styles.center}>
          {timerMode === TIMER_MODE_WORK && (
            <AnimationView animation={workTime} size={WIDTH * 0.8} />
          )}
          {timerMode === TIMER_MODE_BREAK && (
            <AnimationView animation={breakTime} size={WIDTH * 0.8} />
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
            stopTimer={stopFlowtime}
            isTimerRunning={isTimerRunning}
          />
          <View style={{height: size.font18}}>
            {timerCount === preferences.workingTime &&
            !associatedTask.id.length &&
            !isTimerRunning ? (
              <ButtonText
                title="Associate task"
                titleColor={colors.primary}
                onPress={() => setAssociateTaskModal(!associateTaskModal)}
                fontSize={size.font16}
              />
            ) : null}
            {associatedTask.id.length > 0 && (
              <Text style={[styles.associatedTask, {color: colors.primary}]}>
                {associatedTask.name}
              </Text>
            )}
          </View>
        </View>
        <BottomSheetModalBackground
          refBottomSheet={settingsFlowtime}
          indexSnapPoints={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleCloseModalPress={() => handleCloseModalPress(settingsFlowtime)}
          showModalBackground={showModal}>
          <BottomSheetView style={styles.contentContainer}>
            <SettingsFlowtime
              closeModal={() => handleCloseModalPress(settingsFlowtime)}
            />
          </BottomSheetView>
        </BottomSheetModalBackground>
        <ModalContainer
          visible={associateTaskModal}
          closeModal={() => setAssociateTaskModal(!associateTaskModal)}
          width={WIDTH * 0.95}>
          <AssociateTask
            todoList={todoList}
            closeModal={() => setAssociateTaskModal(!associateTaskModal)}
            dispatchAssociateTask={associateTask}
          />
        </ModalContainer>
        <ModalContainer
          visible={modalStopFlowtime}
          closeModal={() => dispatch(setModalStopFlowtime())}
          width={WIDTH * 0.95}>
          <StopModal
            associatedTask={associatedTask}
            list={list}
            taskCompleted={taskCompleted}
            taskNotCompleted={taskNotCompleted}
          />
        </ModalContainer>
      </BottomSheetModalProvider>
    </View>
  );
};

export default FlowTime;

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
  associatedTask: {
    fontSize: size.font16,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
  },
});
