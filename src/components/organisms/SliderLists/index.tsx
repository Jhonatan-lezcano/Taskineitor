import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {mockData} from '../../../utils/mockData';
import CardList from '../../molecules/CardList';
import {TodoList} from '../../../store/slices/todoList/todoListSlice';
import useTheme from '../../../hooks/useTheme';

interface Props {
  data: TodoList[];
  isLoading: boolean;
}

const SliderLists = ({data, isLoading}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{
            width: '100%',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <CardList list={item} />;
          }}
        />
      )}
    </View>
  );
};

export default SliderLists;

const styles = StyleSheet.create({
  container: {
    height: 310,
    width: '100%',
  },
});
