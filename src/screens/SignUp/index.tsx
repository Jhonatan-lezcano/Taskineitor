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
import {SubmitHandler, useForm} from 'react-hook-form';
import Input from '../../components/atoms/Input';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackAuthParams} from '../../navigation/StackAuthNavigation';
import useTheme from '../../hooks/useTheme';
import Button from '../../components/atoms/Button';
import {
  EmailRequired,
  PasswordRequire,
  Required,
} from '../../utils/validations';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface SignUpForm {
  username: '';
  email: '';
  password: '';
  confirmPassword: '';
}

interface Props
  extends NativeStackScreenProps<RootStackAuthParams, 'signUpScreen'> {}
const SignUp = ({navigation: {navigate}}: Props) => {
  const {colors, containerScreen} = useTheme();
  const {
    handleSubmit,
    control,
    formState: {errors},
    watch,
    reset,
  } = useForm<SignUpForm>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const pwd = watch('password');

  const onSubmit: SubmitHandler<SignUpForm> = async data => {
    try {
      const {email, password, username} = data;

      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      firestore().collection('usernames').add({
        userId: userCredential.user.uid,
        username,
      });

      reset({username: '', email: '', password: '', confirmPassword: ''});
      navigate('signInScreen');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[containerScreen.container, {paddingHorizontal: 30}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Title
        title="Get Started"
        fontSize={size.font32}
        textAlign="left"
        customStyles={{color: lightMode.colors.primary, fontWeight: '700'}}
      />
      <View style={{flexDirection: 'row', width: '100%', paddingTop: 5}}>
        <Text style={{color: lightMode.colors.onBackground}}>
          Already have a account?
        </Text>
        <Spacer horizontal={5} vertical={5} />
        <ButtonText
          title="Sign in"
          titleColor={lightMode.colors.primary}
          onPress={() => navigate('signInScreen')}
          underLine
        />
      </View>
      <Spacer vertical={40} />
      <Input
        label="Username"
        control={control}
        name="username"
        variant="line"
        err={errors}
        borderColor={colors.outline}
        rules={Required}
      />
      <Spacer vertical={20} />
      <Input
        label="Email"
        control={control}
        name="email"
        variant="line"
        inputType="email-address"
        err={errors}
        borderColor={colors.outline}
        rules={EmailRequired}
      />
      <Spacer vertical={20} />
      <Input
        label="Password"
        control={control}
        name="password"
        variant="line"
        err={errors}
        borderColor={colors.outline}
        rules={PasswordRequire}
        password
      />
      <Spacer vertical={20} />
      <Input
        label="Confirm Password"
        control={control}
        name="confirmPassword"
        variant="line"
        err={errors}
        borderColor={colors.outline}
        rules={{
          validate: (value: string) => value === pwd || 'Password do not match',
        }}
        password
      />
      <Spacer vertical={20} />
      <Button
        text="Sign Up"
        backgroundColor={colors.primary}
        titleColor={colors.onPrimary}
        radius={50}
        onPress={handleSubmit(onSubmit)}
      />
      <Spacer vertical={20} />
      <Text style={{color: colors.onBackground}}>
        By Sign up you agree to our{' '}
        <Text style={styles.terms}>Privacy Policy</Text> and{' '}
        <Text style={styles.terms}>Terms and Condition</Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  terms: {
    textDecorationLine: 'underline',
  },
});
