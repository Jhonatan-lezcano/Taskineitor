import {StyleSheet, Text, TurboModuleRegistry, View} from 'react-native';
import React, {useEffect} from 'react';
import useTheme from '../../hooks/useTheme';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {getUser} from '../../store/slices/auth/authSlice';
import Title from '../../components/atoms/Title';
import {size} from '../../theme/fonts';
import Button from '../../components/atoms/Button';
import CodePlus from '../../assets/svgs/CodePlus';
import Spacer from '../../components/atoms/Spacer';
import SliderLists from '../../components/organisms/SliderLists';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackTodosParams} from '../../navigation/StackTodosNavigation';
import useTodoList from '../../hooks/useTodoList';
import {
  addCurrentTodos,
  TodoList,
} from '../../store/slices/todoList/todoListSlice';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import CheckIcon from '../../assets/svgs/CheckIcon';

interface Props
  extends NativeStackScreenProps<RootStackTodosParams, 'HomeScreen'> {}

const Home = ({navigation: {navigate}}: Props) => {
  const {containerScreen, colors} = useTheme();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.authUser);
  const {isLoading, todoList} = useTodoList();

  const navigateTodosScreen = (todos: TodoList) => {
    navigate('TodosScreen');
    dispatch(addCurrentTodos(todos));
  };

  return (
    <View style={containerScreen.container}>
      <Title
        title="TodoList"
        fontSize={size.font34}
        customStyles={{fontWeight: '600', color: colors.onBackground}}
      />
      <Spacer vertical={30} />
      <Button
        backgroundColor={colors.background}
        radius={5}
        icon={CodePlus}
        colorIcon={colors.primary}
        width="auto"
        sizeIcon={size.font30}
        borderColor={colors.primary}
        customStyle={{padding: 10}}
        onPress={() => navigate('AddListScreen')}
      />
      <Text style={[styles.labelBtn, {color: colors.primary}]}>Add List</Text>
      <Spacer vertical={30} />
      <SliderLists
        data={todoList}
        isLoading={isLoading}
        navigate={navigateTodosScreen}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  labelBtn: {
    paddingTop: 10,
    fontWeight: '600',
  },
});
