import {StyleSheet, View} from 'react-native';
import React from 'react';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import Input from '../../atoms/Input';
import {SubmitHandler, useForm} from 'react-hook-form';
import useTheme from '../../../hooks/useTheme';
import Button from '../../atoms/Button';
import {Required} from '../../../utils/validations';
import {TodoList} from '../../../store/slices/todoList/todoListSlice';
import Spacer from '../../atoms/Spacer';
import useTasks from '../../../hooks/useTasks';
import uuid from 'react-native-uuid';
import {
  dateNow,
  DEFAULT_COMPLETED,
  DEFAULT_LABEL,
} from '../../../utils/constants';

interface TodoForm {
  description: string;
  name: string;
}

interface Props {
  list: TodoList;
  closeModal: () => void;
}

const AddTodoForm = ({list, closeModal}: Props) => {
  const {color} = list;
  const {createTodo} = useTasks();
  const {colors} = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TodoForm>({
    defaultValues: {
      description: '',
      name: '',
    },
  });

  const onSubmit: SubmitHandler<TodoForm> = data => {
    const taskData = {
      ...data,
      id: uuid.v4(),
      label: DEFAULT_LABEL,
      completed: DEFAULT_COMPLETED,
      createAt: dateNow(),
    };
    createTodo(taskData, list);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Title
        title="New Todo"
        fontSize={size.font26}
        customStyles={{fontWeight: '600', color: colors.onBackground}}
      />
      <Spacer vertical={20} />
      <Input
        label="Name Todo"
        control={control}
        name="name"
        variant="borders"
        width="100%"
        borderColor={colors.outline}
        err={errors}
        rules={Required}
      />
      <Spacer vertical={10} />
      <Input
        label="Description"
        control={control}
        name="description"
        variant="borders"
        width="100%"
        borderColor={colors.outline}
        err={errors}
        multiline
        height={100}
        textAlignVertical="top"
      />
      <Spacer vertical={10} />
      <Button
        text="Create todo!"
        backgroundColor={color}
        titleColor="#ffff"
        radius={10}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default AddTodoForm;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },
});
