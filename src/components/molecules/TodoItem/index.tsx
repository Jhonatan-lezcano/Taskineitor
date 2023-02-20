import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Todo} from '../../../store/slices/todoList/todoListSlice';
import {size} from '../../../theme/fonts';
import useTheme from '../../../hooks/useTheme';
import {Swipeable} from 'react-native-gesture-handler';
import SwipeableAction from '../../atoms/SwipeableAction';
import StatusTags from '../../atoms/StatusTags';

interface Props {
  todo: Todo;
  toggleComplete: (index: number) => void;
  toggleInProcess: (index: number) => void;
  toggleDeleteTodo: (index: number) => void;
  handleTaskPreview: (todo: Todo) => void;
  index: number;
}

const TodoItem = ({
  todo,
  toggleComplete,
  toggleInProcess,
  toggleDeleteTodo,
  handleTaskPreview,
  index,
}: Props) => {
  const {name, completed, label} = todo;
  const {colors} = useTheme();
  const leftInterpolationValue = {
    inputRange: [0, 30, 100],
    outputRange: [0, 0.7, 1],
    extrapolate: 'clamp',
  };
  const rightInterpolationValue = {
    inputRange: [-100, -30, 0],
    outputRange: [1, 0.7, 0],
    extrapolate: 'clamp',
  };

  return (
    <Swipeable
      renderRightActions={(dragX, progress) =>
        SwipeableAction(
          toggleDeleteTodo,
          progress,
          colors.alertColors.danger,
          'white',
          index,
          rightInterpolationValue,
          'Delete',
          'right',
        )
      }
      renderLeftActions={(dragX, progress) =>
        SwipeableAction(
          toggleInProcess,
          progress,
          colors.alertColors.update,
          'white',
          index,
          leftInterpolationValue,
          'In Process',
          'left',
        )
      }>
      <View
        style={[styles.todoContainer, {backgroundColor: colors.background}]}>
        <TouchableOpacity
          onPress={() => toggleComplete(index)}
          style={styles.containerCheckBox}>
          <View
            style={[
              styles.checkBox,
              {
                backgroundColor: completed ? colors.outline : colors.background,
                borderColor: colors.outline,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerInfo}
          onPress={() => handleTaskPreview(todo)}>
          <Text
            style={[styles.title, {color: colors.onBackground, width: '80%'}]}
            numberOfLines={1}>
            {name}
          </Text>
          <StatusTags label={label} />
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  todoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
  },
  containerCheckBox: {
    width: '10%',
    alignItems: 'flex-start',
  },
  checkBox: {
    borderWidth: 1,
    height: size.font16,
    width: size.font16,
  },
  containerInfo: {
    flexDirection: 'row',
    width: '88%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: size.font16,
    fontWeight: '500',
  },
});
