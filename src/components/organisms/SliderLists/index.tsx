import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {mockData} from '../../../utils/mockData';
import CardList from '../../molecules/CardList';

const SliderLists = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockData}
        keyExtractor={item => item.uid}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return <CardList list={item} />;
        }}
      />
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
