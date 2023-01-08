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

interface Props
  extends NativeStackScreenProps<RootStackTodosParams, 'TodosScreen'> {}

const Todos = ({navigation: {navigate}, route: {params}}: Props) => {
  const {colors, containerScreen} = useTheme();
  const {name, todos, color} = params;
  const tasks = todos.length;
  const tasksCompleted = todos.filter(todo => todo.completed).length;
  const [showModal, setShowModal] = useState(false);

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
      <View style={styles.containerTodos}>
        <FlatList
          data={todos}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 20}}
          renderItem={({item}) => <TodoItem todo={item} />}
        />
      </View>
      <TouchableOpacity
        style={[styles.floatingButton, {backgroundColor: color}]}
        onPress={() => setShowModal(!showModal)}>
        <PlusIcon size={32} />
      </TouchableOpacity>
      <ModalContainer
        visible={showModal}
        closeModal={() => setShowModal(!showModal)}>
        <AddTodoForm list={params} />
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
