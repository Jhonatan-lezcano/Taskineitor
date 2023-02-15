import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Todo, TodoList} from '../../../store/slices/todoList/todoListSlice';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import useTheme from '../../../hooks/useTheme';
import Spacer from '../../atoms/Spacer';
import RadioButton from '../../atoms/RadioButton';
import Button from '../../atoms/Button';

const {height} = Dimensions.get('screen');

interface Props {
  todoList: TodoList[];
}

const AssociateTask = ({todoList}: Props) => {
  const {colors} = useTheme();
  const [selected, setselected] = useState<Todo | {}>({});
  return (
    <>
      <Title
        title="Associate task"
        fontSize={size.font22}
        customStyles={{color: colors.onBackground, fontWeight: '500'}}
      />
      <Spacer vertical={15} />
      <View style={{height: height * 0.5, paddingVertical: 10}}>
        <FlatList
          data={todoList}
          keyExtractor={item => item.id}
          contentContainerStyle={{width: '100%'}}
          renderItem={({item, index}) => {
            const pending = item.todos.filter(
              pendingTodos => !pendingTodos.completed,
            );
            return (
              <View>
                <Title
                  title={item.name}
                  textAlign="left"
                  customStyles={{fontWeight: '500'}}
                  lines={1}
                />
                <View
                  style={{
                    paddingLeft: 12,
                    paddingVertical: 15,
                    width: '100%',
                  }}>
                  <FlatList
                    data={pending}
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <View style={{width: '100%', paddingVertical: 10}}>
                        <RadioButton
                          label={item.name}
                          status={selected === item}
                          onPress={() => setselected(item)}
                          fontSize={size.font14}
                          size={size.font18}
                          lines={1}
                          width="100%"
                          radioButtonOrientation="left"
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button
          backgroundColor={colors.primary}
          radius={5}
          text="Associate"
          titleColor={colors.onPrimary}
          onPress={() => {}}
          width="30%"
          customStyle={{paddingVertical: 12}}
        />
        <Spacer horizontal={20} vertical={15} />
        <Button
          backgroundColor={colors.primary}
          radius={5}
          text="Cancel"
          titleColor={colors.onPrimary}
          onPress={() => {}}
          width="30%"
          customStyle={{paddingVertical: 12}}
        />
      </View>
    </>
  );
};

export default AssociateTask;

const styles = StyleSheet.create({});
