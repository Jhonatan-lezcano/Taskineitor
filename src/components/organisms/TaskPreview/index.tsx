import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useTheme from '../../../hooks/useTheme';
import {useAppSelector} from '../../../store/hooks/hooks';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import Spacer from '../../atoms/Spacer';
import StatusTags from '../../atoms/StatusTags';

const TaskPreview = () => {
  const {colors} = useTheme();
  const {taskPreview} = useAppSelector(state => state.todoList);

  return (
    <View style={styles.container}>
      <Title
        title={taskPreview?.name ?? ''}
        customStyles={{color: colors.onBackground}}
        fontSize={size.font24}
      />
      <View style={styles.containerTag}>
        <Text style={{fontSize: size.font10, color: colors.onBackground}}>
          Status:
        </Text>
        <Spacer vertical={10} horizontal={5} />
        <StatusTags label={taskPreview?.label ?? 0} />
      </View>

      <Spacer vertical={20} />
      <Text style={[styles.description, {color: colors.onBackground}]}>
        {taskPreview?.description === '' || !taskPreview
          ? 'this task has no description'
          : taskPreview.description}
      </Text>
    </View>
  );
};

export default TaskPreview;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  containerTag: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: size.font16,
  },
});
