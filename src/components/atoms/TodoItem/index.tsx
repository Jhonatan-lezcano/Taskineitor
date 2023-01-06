import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Todo} from '../../../store/slices/todoList/todoListSlice';
import {size} from '../../../theme/fonts';
import useTheme from '../../../hooks/useTheme';
import Spacer from '../Spacer';

interface Props {
  todo: Todo;
}

const PENDING = 0;
const IN_PROCESS = 1;
const COMPLETE = 2;

const TodoItem = ({todo}: Props) => {
  const {name, completed, label} = todo;
  const {colors} = useTheme();
  return (
    <View style={styles.todoContainer}>
      <View style={styles.checkBoxGroup}>
        <TouchableOpacity>
          <View
            style={[
              styles.checkBox,
              {
                backgroundColor: completed ? colors.outline : colors.background,
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
