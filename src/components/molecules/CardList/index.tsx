import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {List} from '../../../utils/mockData';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';

interface Props {
  list: List;
}

const CardList = ({list}: Props) => {
  const {color, name, todos} = list;
  const completed = todos.filter(item => item.completed).length;
  const pending = todos.length - completed;
  const textColor = {
    color: 'white',
  };
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: color}]}>
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
    height: 275,
    marginHorizontal: 12,
    marginVertical: 18,
    paddingHorizontal: 16,
    paddingVertical: 32,
    width: 200,
  },
});
