import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import {TodoList} from '../../../store/slices/todoList/todoListSlice';
import {WIDTH} from '../../../utils/constants';

interface Props {
  list: TodoList;
  navigate: (todos: TodoList) => void;
  translateY: Animated.AnimatedInterpolation<string | number>;
  index: number;
  space: number;
  marginRight?: number;
}

const CardList = ({
  list,
  navigate,
  translateY,
  index,
  space,
  marginRight,
}: Props) => {
  const {color, name, todos} = list;
  const completed = todos.filter(item => item.completed).length;
  const pending = todos.length - completed;
  const textColor = {
    color: 'white',
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY}],
          marginLeft: index > 0 ? 8 : space,
          marginRight,
        },
      ]}>
      <TouchableOpacity
        style={[styles.containerTouchable, {backgroundColor: color}]}
        activeOpacity={0.9}
        onPress={() => navigate(list)}>
        <Title
          title={name}
          fontSize={size.font22}
          customStyles={{fontWeight: '700', ...textColor}}
          lines={1}
        />
        <Title
          title={completed.toString()}
          fontSize={size.font48}
          customStyles={{...textColor, fontWeight: '100'}}
        />
        <Title
          title="Completed"
          fontSize={size.font16}
          customStyles={{...textColor}}
        />
        <Title
          title={pending.toString()}
          fontSize={size.font48}
          customStyles={{...textColor, fontWeight: '100'}}
        />
        <Title
          title="Pending to do"
          fontSize={size.font16}
          customStyles={{...textColor}}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    height: '95%',
    borderRadius: 6,
    marginHorizontal: 15,
    width: WIDTH * 0.55,
    backgroundColor: 'red',
  },
  containerTouchable: {
    alignItems: 'center',
    borderRadius: 6,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
    width: '100%',
  },
});
