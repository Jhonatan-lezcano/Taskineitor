import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import CardList from '../../molecules/CardList';
import {TodoList} from '../../../store/slices/todoList/todoListSlice';
import useTheme from '../../../hooks/useTheme';
import noListtAnimation from '../../../assets/LottieFiles/not-found.json';
import NoItemsFound from '../../molecules/NoItemsFound';
import {HEIGHT, WIDTH} from '../../../utils/constants';

interface Props {
  data: TodoList[];
  isLoading: boolean;
  navigate: (todos: TodoList) => void;
}

const SliderLists = ({data, isLoading, navigate}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      {!isLoading && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <CardList list={item} navigate={navigate} />;
          }}
        />
      ) : !isLoading && data.length === 0 ? (
        <NoItemsFound
          animation={noListtAnimation}
          sizeAnimation={WIDTH * 0.6}
          text="No lists found, start creating your lists"
          height="100%"
          width="100%"
        />
      ) : (
        isLoading && (
          <View
            style={{
              width: '100%',
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={colors.secondary} />
          </View>
        )
      )}
    </View>
  );
};

export default SliderLists;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT * 0.38,
    width: '100%',
  },
});
