import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Title from '../../components/atoms/Title';
import {size} from '../../theme/fonts';
import {lightMode} from '../../theme/colors';
import {useForm} from 'react-hook-form';
import Input from '../../components/atoms/Input';
import Spacer from '../../components/atoms/Spacer';

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <View style={styles.containerScreen}>
      <Title
        title="Login"
        fontSize={size.font32}
        textAlign="left"
        customStyles={{color: lightMode.colors.primary, fontWeight: '700'}}
      />
      <Spacer vertical={20} />
      <Input label="Email" control={control} name="email" variant="line" />
      <Spacer vertical={40} />
      <Input
        label="Password"
        control={control}
        name="password"
        variant="line"
      />
      <Spacer vertical={18} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});
