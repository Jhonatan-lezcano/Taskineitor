import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import useTheme from '../../hooks/useTheme';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const {containerScreen} = useTheme();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={containerScreen.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
