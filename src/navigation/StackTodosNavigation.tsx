import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AddList from '../screens/AddList';

export type RootStackTodosParams = {
  HomeScreen: undefined;
  AddListScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackTodosParams>();

const StackTodosNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="AddListScreen" component={AddList} />
    </Stack.Navigator>
  );
};

export default StackTodosNavigation;
