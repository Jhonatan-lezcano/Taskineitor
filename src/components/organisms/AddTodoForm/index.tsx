import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import Input from '../../atoms/Input';
import {useForm} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';

interface TodoForm {
  description: string;
  name: string;
}

const AddTodoForm = () => {
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
  return (
    <View>
      <Title title="New Todo" fontSize={size.font22} />
      <Input
        control={control}
        name="name"
        err={errors}
        label="New todo"
        variant="borders"
      />
    </View>
  );
};

export default AddTodoForm;

const styles = StyleSheet.create({});
