import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Timers from '../screens/Timers';
import StackTodosNavigation from './StackTodosNavigation';
import useTheme from '../hooks/useTheme';
import {Platform} from 'react-native';
import {size} from '../theme/fonts';
import TimerIcon from '../assets/svgs/TimerIcon';
import ClipboardListIcon from '../assets/svgs/ClipboardListIcon';
import TopTabsTimersNavigation from './TopTabsNavigation';

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
        tabBarHideOnKeyboard: true,
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
        component={TopTabsTimersNavigation}
        options={{title: 'Timers'}}
      />
    </Tab.Navigator>
  );
};

export default TabAppNavigation;
