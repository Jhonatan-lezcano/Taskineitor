import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Timers from '../screens/Timers';
import StackTodosNavigation from './StackTodosNavigation';

const Tab = createBottomTabNavigator();

const TabAppNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="StackTodos" component={StackTodosNavigation} />
      <Tab.Screen name="TimersScreen" component={Timers} />
    </Tab.Navigator>
  );
};

export default TabAppNavigation;
