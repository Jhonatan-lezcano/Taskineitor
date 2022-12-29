import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {List} from '../../../utils/mockData';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';

interface Props {
  list: List;
}

const CardList = ({list}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: list.color}]}>
      <Title
        title={list.name}
        fontSize={size.font22}
        customStyles={{fontWeight: '700', color: 'white'}}
        lines={1}
      />
      <Title title="0" />
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
