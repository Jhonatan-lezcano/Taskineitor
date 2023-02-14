import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TodoList} from '../../../store/slices/todoList/todoListSlice';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import useTheme from '../../../hooks/useTheme';
import Spacer from '../../atoms/Spacer';

interface Props {
  todoList: TodoList[];
}

const AssociateTask = ({todoList}: Props) => {
  const {colors} = useTheme();
  return (
    <>
      <Title
        title="Associate task"
        fontSize={size.font22}
        customStyles={{color: colors.onBackground, fontWeight: '500'}}
      />
      <Spacer vertical={15} />
      <FlatList
        data={todoList}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View>
            <Title
              title={item.name}
              textAlign="left"
              customStyles={{fontWeight: '500'}}
              lines={1}
            />
            <View style={{paddingHorizontal: 15, paddingVertical: 15}}>
              <FlatList
                data={item.todos}
                keyExtractor={(item, index) => `${index} - ${item}`}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 5,
                        backgroundColor: colors.primary,
                        marginRight: 10,
                      }}></View>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        )}
      />
    </>
  );
};

export default AssociateTask;

const styles = StyleSheet.create({});
