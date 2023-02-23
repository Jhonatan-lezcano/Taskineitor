import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackTodosParams} from '../../navigation/StackTodosNavigation';
import Title from '../../components/atoms/Title';
import {capitalizeFirstLetter} from '../../utils/helpers';
import {size} from '../../theme/fonts';
import useTheme from '../../hooks/useTheme';
import TodoItem from '../../components/molecules/TodoItem';
import PlusIcon from '../../assets/svgs/PlusIcon';
import AddTodoForm from '../../components/organisms/AddTodoForm';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NoItemsFound from '../../components/molecules/NoItemsFound';
import noTasksFound from '../../assets/LottieFiles/checklist.json';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import BottomSheetModalBackground from '../../components/molecules/BottomSheetModalBackground';
import useBottomSheetModal from '../../hooks/useBottomSheetModal';
import Button from '../../components/atoms/Button';
import useTasks from '../../hooks/useTasks';
import {setTaskPreview, Todo} from '../../store/slices/todoList/todoListSlice';
import ModalContainer from '../../components/organisms/ModalContainer/Index';
import TaskPreview from '../../components/organisms/TaskPreview';
import {HEIGHT} from '../../utils/constants';

interface Props
  extends NativeStackScreenProps<RootStackTodosParams, 'TodosScreen'> {}

const Todos = ({navigation: {navigate}}: Props) => {
  const {colors, containerScreen} = useTheme();
  const {todoComplete, todoInProcess, deleteTodo} = useTasks();
  const {currentTodos} = useAppSelector(state => state.todoList);
  const dispatch = useAppDispatch();
  const {name, todos, color} = currentTodos;
  const tasks = todos.length;
  const tasksCompleted = todos.filter(todo => todo.completed).length;
  const [showTaskPreview, setShowTaskPreview] = useState(false);
  const {
    showModal,
    handleCloseModalPress,
    handlePresentModalPress,
    handleSheetChanges,
  } = useBottomSheetModal();
  const addTaskRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['65%'], []);

  const toggleComplete = (idItem: string) => todoComplete(currentTodos, idItem);

  const toggleInProcess = (idItem: string) =>
    todoInProcess(currentTodos, idItem);

  const toggleDeleteTodo = (idItem: string) => deleteTodo(currentTodos, idItem);

  const handleTaskPreview = (todo: Todo) => {
    dispatch(setTaskPreview(todo));
    setShowTaskPreview(!showTaskPreview);
  };

  return (
    <BottomSheetModalProvider>
      <View style={containerScreen.container}>
        <View style={[styles.containerTitle, {borderBottomColor: color}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Title
              title={capitalizeFirstLetter(name)}
              textAlign="left"
              fontSize={size.font30}
              width="80%"
              lines={1}
              customStyles={{
                fontWeight: '800',
                color: colors.onBackground,
              }}
            />
            <Button
              icon={PlusIcon}
              backgroundColor={colors.background}
              radius={0}
              onPress={() => handlePresentModalPress(addTaskRef)}
              colorIcon={colors.primary}
              customStyle={{padding: 0}}
              sizeIcon={size.font30}
              width={size.font30}
            />
          </View>
          <Text style={[styles.taskCount, {color: colors.outline}]}>
            {tasksCompleted}/{tasks}
          </Text>
        </View>
        {todos.length > 0 ? (
          <GestureHandlerRootView style={styles.containerTodos}>
            <FlatList
              data={todos}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingVertical: 20}}
              renderItem={({item}) => (
                <TodoItem
                  todo={item}
                  idItem={item.id}
                  toggleComplete={toggleComplete}
                  toggleInProcess={toggleInProcess}
                  toggleDeleteTodo={toggleDeleteTodo}
                  handleTaskPreview={handleTaskPreview}
                />
              )}
            />
          </GestureHandlerRootView>
        ) : (
          <View style={[styles.containerTodos, styles.notFoundTodos]}>
            <NoItemsFound
              animation={noTasksFound}
              sizeAnimation={HEIGHT * 0.3}
              text="No tasks found, start creating your tasks"
              height="100%"
              width="100%"
            />
          </View>
        )}
        <BottomSheetModalBackground
          refBottomSheet={addTaskRef}
          indexSnapPoints={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleCloseModalPress={() => handleCloseModalPress(addTaskRef)}
          showModalBackground={showModal}>
          <AddTodoForm
            list={currentTodos}
            closeModal={() => {
              handleCloseModalPress(addTaskRef);
            }}
          />
        </BottomSheetModalBackground>
        <ModalContainer
          closeModal={() => setShowTaskPreview(!showTaskPreview)}
          visible={showTaskPreview}>
          <TaskPreview />
        </ModalContainer>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Todos;

const styles = StyleSheet.create({
  containerTitle: {
    borderBottomWidth: 3,
    flex: 1,
    marginLeft: 70,
    paddingTop: 10,
    width: '100%',
  },
  containerTodos: {
    flex: 7,
    width: '100%',
  },
  notFoundTodos: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCount: {
    fontWeight: '600',
    paddingTop: 4,
    paddingBottom: 15,
  },
  floatingButton: {
    alignItems: 'center',
    borderRadius: 40,
    bottom: 30,
    justifyContent: 'center',
    position: 'absolute',
    height: size.font48,
    right: 15,
    width: size.font48,
  },
});
