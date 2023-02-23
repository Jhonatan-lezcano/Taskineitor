import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Title from '../../atoms/Title';
import useTheme from '../../../hooks/useTheme';
import {Todo, TodoList} from '../../../store/slices/todoList/todoListSlice';
import StatusTags from '../../atoms/StatusTags';
import Button from '../../atoms/Button';
import {WIDTH} from '../../../utils/constants';
import Spacer from '../../atoms/Spacer';
import {size} from '../../../theme/fonts';
import usePomodoro from '../../../hooks/usePomodoro';
import {useAppSelector} from '../../../store/hooks/hooks';

interface Props {
  associatedTask: Todo;
  list: TodoList;
}

const StopModal = ({associatedTask, list}: Props) => {
  const {colors} = useTheme();
  const {taskCompleted, TaskNotCompleted} = usePomodoro();

  return (
    <View style={styles.container}>
      <Title
        title={`Did you finish the task "${associatedTask.name}"?`}
        customStyles={{color: colors.onBackground}}
        fontSize={size.font24}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingTop: 10,
        }}>
        <Text style={{fontSize: size.font10, color: colors.onBackground}}>
          Status:
        </Text>
        <Spacer vertical={10} horizontal={5} />
        <StatusTags label={associatedTask.label ?? 0} />
      </View>
      <Spacer vertical={30} />
      <View style={styles.containerBtns}>
        <Button
          text="Yes"
          onPress={() => taskCompleted(list, associatedTask.id)}
          backgroundColor={colors.primary}
          titleColor={colors.onPrimary}
          radius={10}
          width={WIDTH * 0.2}
          customStyle={{paddingVertical: 12}}
        />
        <Spacer vertical={10} horizontal={10} />
        <Button
          text="No"
          onPress={() => TaskNotCompleted()}
          backgroundColor={colors.primary}
          titleColor={colors.onPrimary}
          radius={10}
          width={WIDTH * 0.2}
          customStyle={{paddingVertical: 12}}
        />
      </View>
    </View>
  );
};

export default StopModal;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  containerBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
