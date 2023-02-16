import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Todo, TodoList} from '../../../store/slices/todoList/todoListSlice';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import useTheme from '../../../hooks/useTheme';
import Spacer from '../../atoms/Spacer';
import RadioButton from '../../atoms/RadioButton';
import Button from '../../atoms/Button';
import {useAppDispatch, useAppSelector} from '../../../store/hooks/hooks';
import {setAssociateTask} from '../../../store/slices/pomodoro/pomodoroSlice';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import CheckIcon from '../../../assets/svgs/CheckIcon';

const {height} = Dimensions.get('screen');

interface Props {
  todoList: TodoList[];
  closeModal: () => void;
}

const AssociateTask = ({todoList, closeModal}: Props) => {
  const {colors} = useTheme();
  const [selected, setselected] = useState<Todo | {}>({});
  const dispatch = useAppDispatch();

  const handleCancelAssociation = () => {
    setselected({});
    closeModal();
  };

  const handleAssociateTask = () => {
    dispatch(setAssociateTask(selected));
    closeModal();
    setselected({});
    Toast.show({
      type: 'customToast',
      props: {
        message: 'Task associated  successfully',
        borderLeftColor: colors.alertColors.success,
        icon: CheckIcon,
      },
    });
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
                          status={selected === item}
                          onPress={() => setselected(item)}
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
    height: height * 0.5,
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
