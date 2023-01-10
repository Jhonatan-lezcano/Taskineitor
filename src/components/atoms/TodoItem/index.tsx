import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Todo, TodoList} from '../../../store/slices/todoList/todoListSlice';
import {size} from '../../../theme/fonts';
import useTheme from '../../../hooks/useTheme';
import Spacer from '../Spacer';
import {Swipeable} from 'react-native-gesture-handler';
import Button from '../Button';

const PENDING = 0;
const IN_PROCESS = 1;
const COMPLETE = 2;

const rightActions = (
  onDeleteHandler: (index: number) => void,
  progress: ReturnType<Animated.Value['interpolate']>,
  background: string,
  textColor: string,
  index: number,
) => {
  const opacity = progress.interpolate({
    inputRange: [-100, -30, 0],
    outputRange: [1, 0.7, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={{opacity, marginRight: 4}}>
      <Button
        text="Delete"
        backgroundColor={background}
        radius={5}
        onPress={() => onDeleteHandler(index)}
        titleColor={textColor}
        width={80}
      />
    </Animated.View>
  );
};

const leftActions = (
  inProcessHandler: (index: number) => void,
  progress: ReturnType<Animated.Value['interpolate']>,
  background: string,
  textColor: string,
  index: number,
) => {
  const opacity = progress.interpolate({
    inputRange: [0, 30, 100],
    outputRange: [0, 0.7, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={{opacity, marginLeft: 4}}>
      <Button
        text="In Process"
        backgroundColor={background}
        radius={5}
        onPress={() => inProcessHandler(index)}
        titleColor={textColor}
        width="auto"
      />
    </Animated.View>
  );
};

interface Props {
  todo: Todo;
  toggleComplete: (index: number) => void;
  toggleInProcess: (index: number) => void;
  toggleDeleteTodo: (index: number) => void;
  index: number;
}

const TodoItem = ({
  todo,
  toggleComplete,
  toggleInProcess,
  toggleDeleteTodo,
  index,
}: Props) => {
  const {name, completed, label} = todo;
  const {colors} = useTheme();

  const onDeleteHandler = (index: number) => console.log(index);

  return (
    <Swipeable
      renderRightActions={(dragX, progress) =>
        rightActions(
          toggleDeleteTodo,
          progress,
          colors.alertColors.danger,
          'white',
          index,
        )
      }
      renderLeftActions={(dragX, progress) =>
        leftActions(
          toggleInProcess,
          progress,
          colors.alertColors.update,
          'white',
          index,
        )
      }>
      <View style={styles.todoContainer}>
        <View style={styles.checkBoxGroup}>
          <TouchableOpacity onPress={() => toggleComplete(index)}>
            <View
              style={[
                styles.checkBox,
                {
                  backgroundColor: completed
                    ? colors.outline
                    : colors.background,
                  borderColor: colors.outline,
                },
              ]}></View>
          </TouchableOpacity>
          <Spacer vertical={10} horizontal={13} />
          <Text
            style={[styles.title, {color: colors.onBackground}]}
            numberOfLines={1}>
            {name}
          </Text>
        </View>
        <View
          style={[
            styles.label,
            {
              backgroundColor:
                label === PENDING
                  ? colors.alertColors.warning
                  : label === IN_PROCESS
                  ? colors.alertColors.update
                  : label === COMPLETE
                  ? colors.alertColors.success
                  : 'white',
            },
          ]}>
          <Text style={styles.labelText}>
            {label === PENDING
              ? 'Pending'
              : label === IN_PROCESS
              ? 'In Process'
              : label === COMPLETE
              ? 'Complete'
              : null}
          </Text>
        </View>
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
  },
  checkBoxGroup: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkBox: {
    borderWidth: 1,
    height: size.font16,
    width: size.font16,
  },
  title: {
    fontSize: size.font16,
    fontWeight: '500',
  },
  label: {
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  labelText: {
    color: 'white',
    fontSize: size.font12,
  },
});
