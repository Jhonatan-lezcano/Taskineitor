import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import {TodoList} from '../../../store/slices/todoList/todoListSlice';

interface Props {
  list: TodoList;
  navigate: (todos: TodoList) => void;
}

const CardList = ({list, navigate}: Props) => {
  const {color, name, todos} = list;
  const completed = todos.filter(item => item.completed).length;
  const pending = todos.length - completed;
  const textColor = {
    color: 'white',
  };
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: color}]}
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
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 6,
    height: '85%',
    justifyContent: 'center',
    marginHorizontal: 12,
    marginVertical: 18,
    paddingHorizontal: 16,
    paddingVertical: 32,
    width: 200,
  },
});
