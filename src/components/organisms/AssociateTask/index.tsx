import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Todo, TodoList} from '../../../store/slices/todoList/todoListSlice';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import useTheme from '../../../hooks/useTheme';
import Spacer from '../../atoms/Spacer';
import RadioButton from '../../atoms/RadioButton';
import Button from '../../atoms/Button';
import {useAppDispatch} from '../../../store/hooks/hooks';
import {setAssociateTask} from '../../../store/slices/pomodoro/pomodoroSlice';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import CheckIcon from '../../../assets/svgs/CheckIcon';
import useTasks from '../../../hooks/useTasks';
import {HEIGHT} from '../../../utils/constants';

interface Props {
  todoList: TodoList[];
  closeModal: () => void;
  dispatchAssociateTask: (selected: StateRadio) => void;
}

export interface StateRadio {
  associatedTask: Todo;
  list: TodoList;
}

const initialState: StateRadio = {
  associatedTask: {
    id: '',
    completed: false,
    createAt: 0,
    description: '',
    label: 0,
    name: '',
  },
  list: {
    id: '',
    color: '',
    createAt: 0,
    name: '',
    todos: [],
    userId: 'string',
  },
};

const AssociateTask = ({
  todoList,
  closeModal,
  dispatchAssociateTask,
}: Props) => {
  const {colors} = useTheme();
  const [selected, setSelected] = useState<StateRadio>(initialState);
  const dispatch = useAppDispatch();
  const {todoInProcess} = useTasks();

  const handleCancelAssociation = () => {
    setSelected(initialState);
    closeModal();
  };

  const handleAssociateTask = () => {
    dispatchAssociateTask(selected);
    // dispatch(setAssociateTask(selected));
    todoInProcess(selected.list, selected.associatedTask.id);
    closeModal();
    setSelected(initialState);
    Toast.show({
      type: 'customToast',
      props: {
        message: 'Task associated  successfully',
        borderLeftColor: colors.alertColors.success,
        icon: CheckIcon,
      },
    });
  };

  const setStateRadio = (task: Todo) => {
    const todolist = todoList.filter(list =>
      list.todos.find(todo => todo.id === task.id),
    );

    setSelected(() => ({
      associatedTask: task,
      list: todolist[0],
    }));
  };

  return (
    <>
      <Title
        title="Associate task"
        fontSize={size.font22}
        customStyles={{color: colors.onBackground, fontWeight: '500'}}
      />
      <Spacer vertical={15} />
      <View style={styles.containerParentFlatList}>
        <FlatList
          data={todoList}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            const pending = item.todos.filter(
              pendingTodos => !pendingTodos.completed,
            );
            return (
              <>
                <Title
                  title={item.name}
                  textAlign="left"
                  customStyles={{color: colors.onBackground, fontWeight: '500'}}
                  lines={1}
                />
                <View style={styles.containerChildFlatlist}>
                  <FlatList
                    data={pending}
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <View style={styles.containerRadioButton}>
                        <RadioButton
                          label={item.name}
                          status={item.id === selected.associatedTask.id}
                          onPress={() => setStateRadio(item)}
                          fontSize={size.font14}
                          size={size.font18}
                          lines={1}
                          width="100%"
                          radioButtonOrientation="left"
                        />
                      </View>
                    )}
                  />
                </View>
              </>
            );
          }}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button
          backgroundColor={colors.primary}
          radius={5}
          text="Associate"
          titleColor={colors.onPrimary}
          onPress={handleAssociateTask}
          width="30%"
          customStyle={{paddingVertical: 12}}
        />
        <Spacer horizontal={20} vertical={15} />
        <Button
          backgroundColor={colors.primary}
          radius={5}
          text="Cancel"
          titleColor={colors.onPrimary}
          onPress={handleCancelAssociation}
          width="30%"
          customStyle={{paddingVertical: 12}}
        />
      </View>
    </>
  );
};

export default AssociateTask;

const styles = StyleSheet.create({
  containerParentFlatList: {
    height: HEIGHT * 0.5,
    paddingVertical: 10,
  },
  containerChildFlatlist: {
    paddingLeft: 12,
    paddingVertical: 15,
    width: '100%',
  },
  containerRadioButton: {
    width: '100%',
    paddingVertical: 10,
  },
});
