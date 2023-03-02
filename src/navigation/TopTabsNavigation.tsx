import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Pomodoro from '../screens/Pomodoro';
import FlowTime from '../screens/FlowTime';
import useTheme from '../hooks/useTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TimerIcon from '../assets/svgs/TimerIcon';
import PlantIcon from '../assets/svgs/PlantIcon';

const Tab = createMaterialTopTabNavigator();

const TopTabsTimersNavigation = () => {
  const {top} = useSafeAreaInsets();
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="PomodoroScreen"
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          paddingTop: top,
          shadowColor: 'transparent',
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.outline,
        tabBarItemStyle: {
          flexDirection: 'row',
        },
        tabBarShowIcon: true,
        tabBarIcon: ({focused}) => {
          return (
            <>
              {route.name === 'PomodoroScreen' && (
                <TimerIcon
                  fillColor={focused ? colors.primary : colors.outline}
                  size={25}
                />
              )}
              {route.name === 'FlowtimeScreen' && (
                <PlantIcon
                  fillColor={focused ? colors.primary : colors.outline}
                  size={25}
                />
              )}
            </>
          );
        },
      })}>
      <Tab.Screen
        name="PomodoroScreen"
        component={Pomodoro}
        options={{title: 'Pomodoro'}}
      />
      <Tab.Screen
        name="FlowtimeScreen"
        component={FlowTime}
        options={{title: 'Flowtime'}}
      />
    </Tab.Navigator>
  );
};

export default TopTabsTimersNavigation;
