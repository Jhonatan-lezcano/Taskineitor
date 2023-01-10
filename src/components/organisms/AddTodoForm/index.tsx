import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import Input from '../../atoms/Input';
import {SubmitHandler, useForm} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import useTheme from '../../../hooks/useTheme';
import Button from '../../atoms/Button';
import {Required} from '../../../utils/validations';
import {
  getTodoList,
  TodoList,
} from '../../../store/slices/todoList/todoListSlice';
import useTodoList from '../../../hooks/useTodoList';
import {useAppDispatch, useAppSelector} from '../../../store/hooks/hooks';

interface TodoForm {
  description: string;
  name: string;
}

interface Props {
  list: TodoList;
  closeModal: () => void;
}

const AddTodoForm = ({list, closeModal}: Props) => {
  const {color, id} = list;
  const {createTodo, todoComplete} = useTodoList();
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
    createTodo(data, list);
    closeModal();
    console.log(data, list);
  };

  return (
    <View>
      <Title
        title="New Todo"
        fontSize={size.font26}
        customStyles={{fontWeight: '600'}}
      />
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
  algo: {},
});
