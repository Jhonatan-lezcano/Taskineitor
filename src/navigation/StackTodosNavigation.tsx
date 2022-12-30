import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AddList from '../screens/AddList';
import useTheme from '../hooks/useTheme';

export type RootStackTodosParams = {
  HomeScreen: undefined;
  AddListScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackTodosParams>();

const StackTodosNavigation = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen
        name="AddListScreen"
        component={AddList}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerStyle: {backgroundColor: colors.background},
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackTodosNavigation;
