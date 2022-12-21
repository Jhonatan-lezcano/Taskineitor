import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Title from '../../components/atoms/Title';
import {size} from '../../theme/fonts';
import {lightMode} from '../../theme/colors';
import Spacer from '../../components/atoms/Spacer';
import ButtonText from '../../components/atoms/ButtonText';
import {useForm} from 'react-hook-form';
import Input from '../../components/atoms/Input';

interface SignUpForm {
  username: '';
  email: '';
  password: '';
  confirmPassword: '';
}

const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<SignUpForm>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  return (
    <KeyboardAvoidingView
      style={styles.containerScreen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Title
        title="Get Started"
        fontSize={size.font32}
        textAlign="left"
        customStyles={{color: lightMode.colors.primary, fontWeight: '700'}}
      />
      <View style={{flexDirection: 'row', width: '100%', paddingTop: 5}}>
        <Text style={{color: lightMode.colors.text}}>
          Already have a account?
        </Text>
        <Spacer horizontal={5} vertical={5} />
        <ButtonText
          title="Sign in"
          titleColor={lightMode.colors.primary}
          onPress={() => console.log('first')}
          underLine
        />
      </View>
      <Input
        label="Username"
        control={control}
        name="username"
        variant="line"
        err={errors}
      />
      <Input
        label="Email"
        control={control}
        name="email"
        variant="line"
        inputType="email-address"
        err={errors}
      />
      <Input
        label="Password"
        control={control}
        name="password"
        variant="line"
        err={errors}
        password
      />
      <Input
        label="Confirm Password"
        control={control}
        name="confirmPassword"
        variant="line"
        err={errors}
        password
      />
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  containerScreen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});
