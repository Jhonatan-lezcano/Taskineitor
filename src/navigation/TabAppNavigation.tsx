import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Timers from '../screens/Timers';
import StackTodosNavigation from './StackTodosNavigation';
import useTheme from '../hooks/useTheme';
import {Platform, View} from 'react-native';
import EyeIcon from '../assets/svgs/EyeIcon';
import CodePlus from '../assets/svgs/CodePlus';
import {Text} from 'react-native-svg';
import {size} from '../theme/fonts';
import TimerIcon from '../assets/svgs/TimerIcon';
import ClipboardListIcon from '../assets/svgs/ClipboardListIcon';

const Tab = createBottomTabNavigator();

const TabAppNavigation = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="StackTodos"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.outline,
        tabBarLabelStyle: {
          fontSize: size.font12,
        },
        tabBarStyle: {
          height: Platform.OS === 'android' ? 60 : 80,
          paddingBottom: Platform.OS === 'android' ? 10 : 30,
          paddingHorizontal: 10,
          paddingTop: Platform.OS === 'android' ? 10 : 10,
          backgroundColor: colors.background,
        },
        tabBarIcon: ({focused}) => {
          return (
            <>
              {route.name === 'StackTodos' && (
                <ClipboardListIcon
                  fillColor={focused ? colors.primary : colors.outline}
                  size={25}
                />
              )}
              {route.name === 'TimersScreen' && (
                <TimerIcon
                  fillColor={focused ? colors.primary : colors.outline}
                  size={25}
                />
              )}
            </>
          );
        },
      })}>
      <Tab.Screen
        name="StackTodos"
        component={StackTodosNavigation}
        options={{title: "To-do's"}}
      />
      <Tab.Screen
        name="TimersScreen"
        component={Timers}
        options={{title: 'Timers'}}
      />
    </Tab.Navigator>
  );
};

export default TabAppNavigation;
