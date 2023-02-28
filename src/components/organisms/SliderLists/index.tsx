import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import CardList from '../../molecules/CardList';
import {TodoList} from '../../../store/slices/todoList/todoListSlice';
import useTheme from '../../../hooks/useTheme';
import noListtAnimation from '../../../assets/LottieFiles/not-found.json';
import NoItemsFound from '../../molecules/NoItemsFound';
import {HEIGHT, WIDTH} from '../../../utils/constants';
import Spacer from '../../atoms/Spacer';

interface Props {
  data: TodoList[];
  isLoading: boolean;
  navigate: (todos: TodoList) => void;
}

const WIDTH_CARD = WIDTH * 0.55;
const SIDE_SPACE = (WIDTH - WIDTH_CARD) / 2;

const SliderLists = ({data, isLoading, navigate}: Props) => {
  const {colors} = useTheme();
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      {!isLoading && data.length > 0 ? (
        <Animated.FlatList
          data={data}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.5}
          snapToInterval={WIDTH_CARD + 8}
          scrollEventThrottle={16}
          contentContainerStyle={{
            height: '100%',
            paddingTop: 30,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * WIDTH_CARD,
              index * WIDTH_CARD,
              (index + 1) * WIDTH_CARD,
            ];
            const outputRange = [0, -30, 0];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange,
            });
            const marginRight = index === data.length - 1 ? SIDE_SPACE : 0;
            return (
              <CardList
                list={item}
                navigate={navigate}
                translateY={translateY}
                index={index}
                space={SIDE_SPACE}
                marginRight={marginRight}
              />
            );
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
    height: HEIGHT * 0.4,
    width: '100%',
  },
});
