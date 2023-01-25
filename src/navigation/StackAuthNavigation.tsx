import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import useTheme from '../hooks/useTheme';

export type RootStackAuthParams = {
  signInScreen: undefined;
  signUpScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackAuthParams>();

const StackAuthNavigation = () => {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Stack.Navigator
        initialRouteName="signInScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="signInScreen" component={SignIn} />
        <Stack.Screen name="signUpScreen" component={SignUp} />
      </Stack.Navigator>
    </View>
  );
};

export default StackAuthNavigation;
