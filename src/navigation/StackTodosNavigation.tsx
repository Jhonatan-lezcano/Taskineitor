import {View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AddList from '../screens/AddList';
import useTheme from '../hooks/useTheme';
import Todos from '../screens/Todos';

export type RootStackTodosParams = {
  HomeScreen: undefined;
  AddListScreen: undefined;
  TodosScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackTodosParams>();

const StackTodosNavigation = () => {
  const {colors} = useTheme();
  const optionsScreens = {
    headerShown: true,
    headerBackTitleVisible: false,
    headerShadowVisible: false,
    headerStyle: {backgroundColor: colors.background},
    headerTitle: '',
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen
          name="AddListScreen"
          component={AddList}
          options={optionsScreens}
        />
        <Stack.Screen
          name="TodosScreen"
          component={Todos}
          options={optionsScreens}
        />
      </Stack.Navigator>
    </View>
  );
};

export default StackTodosNavigation;
