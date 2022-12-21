import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import React from 'react';
import Title from '../../components/atoms/Title';
import {size} from '../../theme/fonts';
import {lightMode} from '../../theme/colors';
import {SubmitHandler, useForm} from 'react-hook-form';
import Input from '../../components/atoms/Input';
import Spacer from '../../components/atoms/Spacer';
import Button from '../../components/atoms/Button';
import ButtonText from '../../components/atoms/ButtonText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackAuthParams} from '../../navigation/StackAuthNavigation';

interface SignInForm {
  email: string;
  password: string;
}

interface Props
  extends NativeStackScreenProps<RootStackAuthParams, 'signInScreen'> {}

const SignIn = ({navigation: {navigate}}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<SignInForm> = data => console.log(data);
  return (
    <KeyboardAvoidingView
      style={styles.containerScreen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Title
        title="Login"
        fontSize={size.font32}
        textAlign="left"
        customStyles={{color: lightMode.colors.primary, fontWeight: '700'}}
      />
      <Spacer vertical={20} />
      <Input
        label="Email"
        control={control}
        name="email"
        variant="line"
        width="100%"
        inputType="email-address"
        err={errors}
      />
      <Spacer vertical={40} />
      <Input
        label="Password"
        control={control}
        name="password"
        variant="line"
        width="100%"
        err={errors}
        password
      />
      <Spacer vertical={18} />
      <ButtonText
        title="Forgot password?"
        titleColor={lightMode.colors.primary}
        onPress={() => console.log('si')}
      />
      <Spacer vertical={30} />
      <Button
        text="Sign in with Google"
        backgroundColor={lightMode.colors.primary}
        radius={50}
        titleColor={lightMode.colors.white}
        onPress={() => console.log('sign in Wiht Google')}
        width="100%"
      />
      <Spacer vertical={20} />
      <Button
        text="Sign in with Apple"
        backgroundColor={lightMode.colors.primary}
        radius={50}
        titleColor={lightMode.colors.white}
        onPress={() => console.log('sign in Wiht Apple')}
        width="100%"
      />
      <Spacer vertical={20} />
      <Button
        text="Sign in"
        backgroundColor={lightMode.colors.primary}
        radius={50}
        titleColor={lightMode.colors.white}
        onPress={handleSubmit(onSubmit)}
        width="100%"
      />
      <Spacer vertical={20} />
      <ButtonText
        title="Do not you have an account yet? Sign up"
        titleColor={lightMode.colors.primary}
        onPress={() => navigate('signUpScreen')}
      />
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  containerScreen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});
