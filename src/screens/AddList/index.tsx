import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import useTheme from '../../hooks/useTheme';
import Title from '../../components/atoms/Title';
import {size} from '../../theme/fonts';
import Input from '../../components/atoms/Input';
import {useForm} from 'react-hook-form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackTodosParams} from '../../navigation/StackTodosNavigation';
import Spacer from '../../components/atoms/Spacer';
import {Required} from '../../utils/validations';
import Button from '../../components/atoms/Button';
import useColorPalettes from '../../hooks/useColorPalettes';

interface ListInput {
  name: string;
}

interface Props
  extends NativeStackScreenProps<RootStackTodosParams, 'AddListScreen'> {}

const AddList = ({}: Props) => {
  const {containerScreen, colors} = useTheme();
  const {palette, changeColor, color} = useColorPalettes();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ListInput>({
    defaultValues: {
      name: '',
    },
  });
  return (
    <View style={[containerScreen.container, {paddingHorizontal: 42}]}>
      <Title
        title="Create Todo List"
        fontSize={size.font28}
        customStyles={{color: colors.onBackground, fontWeight: 'bold'}}
      />
      <Spacer vertical={20} />
      <Input
        name="name"
        control={control}
        err={errors}
        borderColor={colors.outline}
        placeholder="List name?"
        variant="borders"
        rules={Required}
      />
      <Spacer vertical={20} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        {palette.colors.map(color => (
          <TouchableOpacity
            key={color}
            style={[styles.colorSelected, {backgroundColor: color}]}
            onPress={() => changeColor(color)}></TouchableOpacity>
        ))}
      </View>
      <Spacer vertical={20} />
      <Button
        text="Create!"
        backgroundColor={color}
        radius={10}
        titleColor="white"
        onPress={() => console.log('first')}
      />
    </View>
  );
};

export default AddList;

const styles = StyleSheet.create({
  colorSelected: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
