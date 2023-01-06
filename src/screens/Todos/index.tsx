import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackTodosParams} from '../../navigation/StackTodosNavigation';

interface Props
  extends NativeStackScreenProps<RootStackTodosParams, 'TodosScreen'> {}

const Todos = ({navigation: {navigate}, route: {params}}: Props) => {
  const {name} = params;
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
