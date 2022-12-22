import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Timers from '../screens/Timers';

const Tab = createBottomTabNavigator();

const TabAppNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={Home} />
      <Tab.Screen name="TimersScreen" component={Timers} />
    </Tab.Navigator>
  );
};

export default TabAppNavigation;
