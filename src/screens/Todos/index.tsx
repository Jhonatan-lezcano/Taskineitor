import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackTodosParams} from '../../navigation/StackTodosNavigation';
import Title from '../../components/atoms/Title';
import {capitalizeFirstLetter} from '../../utils/helpers';
import {size} from '../../theme/fonts';
import useTheme from '../../hooks/useTheme';
import TodoItem from '../../components/atoms/TodoItem';
import PlusIcon from '../../assets/svgs/PlusIcon';
import AddTodoForm from '../../components/organisms/AddTodoForm';
import ModalContainer from '../../components/organisms/ModalContainer/Index';
import {useAppSelector} from '../../store/hooks/hooks';
import useTodoList from '../../hooks/useTodoList';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface Props
  extends NativeStackScreenProps<RootStackTodosParams, 'TodosScreen'> {}

const Todos = ({navigation: {navigate}}: Props) => {
  const {colors, containerScreen} = useTheme();
  const {todoComplete, todoInProcess, deleteTodo} = useTodoList();
  const {currentTodos} = useAppSelector(state => state.todoList);
  const {name, todos, color} = currentTodos;
  const tasks = todos.length;
  const tasksCompleted = todos.filter(todo => todo.completed).length;
  const [showModal, setShowModal] = useState(false);

  const toggleComplete = (index: number) => todoComplete(currentTodos, index);

  const toggleInProcess = (index: number) => todoInProcess(currentTodos, index);

  const toggleDeleteTodo = (index: number) => deleteTodo(currentTodos, index);

  return (
    <View style={containerScreen.container}>
      <View style={[styles.containerTitle, {borderBottomColor: color}]}>
        <Title
          title={capitalizeFirstLetter(name)}
          textAlign="left"
          fontSize={size.font30}
          customStyles={{fontWeight: '800', color: colors.onBackground}}
          lines={1}
        />
        <Text style={[styles.taskCount, {color: colors.outline}]}>
          {tasksCompleted}/{tasks}
        </Text>
      </View>
      <GestureHandlerRootView style={styles.containerTodos}>
        <FlatList
          data={todos}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 20}}
          renderItem={({item, index}) => (
            <TodoItem
              todo={item}
              index={index}
              toggleComplete={toggleComplete}
              toggleInProcess={toggleInProcess}
              toggleDeleteTodo={toggleDeleteTodo}
            />
          )}
        />
      </GestureHandlerRootView>
      <TouchableOpacity
        style={[styles.floatingButton, {backgroundColor: color}]}
        onPress={() => setShowModal(!showModal)}>
        <PlusIcon size={32} />
      </TouchableOpacity>
      <ModalContainer
        visible={showModal}
        closeModal={() => setShowModal(!showModal)}>
        <AddTodoForm
          list={currentTodos}
          closeModal={() => setShowModal(!showModal)}
        />
      </ModalContainer>
    </View>
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
