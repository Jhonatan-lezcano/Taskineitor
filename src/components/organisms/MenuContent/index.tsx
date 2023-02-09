import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Title from '../../atoms/Title';
import {size} from '../../../theme/fonts';
import useTheme from '../../../hooks/useTheme';
import RadioButton from '../../atoms/RadioButton';
import Spacer from '../../atoms/Spacer';
import LogoutIcon from '../../../assets/svgs/LogoutIcon';
import auth from '@react-native-firebase/auth';
import {isAuth} from '../../../store/slices/auth/authSlice';
import {useAppDispatch} from '../../../store/hooks/hooks';

const MenuContent = () => {
  const {colors, changeTheme, preferences} = useTheme();
  const dispatch = useAppDispatch();

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(isAuth());
      });
  };

  return (
    <View>
      <Title
        title="Theme"
        fontSize={size.font20}
        customStyles={{color: colors.onBackground, fontWeight: '500'}}
      />
      <Spacer vertical={20} />
      <RadioButton
        label="Dark Theme"
        status={preferences === 'dark'}
        onPress={() => changeTheme('dark')}
      />
      <Spacer vertical={20} />
      <RadioButton
        label="light Mode"
        status={preferences === 'light'}
        onPress={() => changeTheme('light')}
      />
      <Spacer vertical={20} />
      <RadioButton
        label="Use device settings"
        labelSecondary="We'll adjust your appearance based in your device's system settings."
        status={preferences === 'system'}
        onPress={() => changeTheme('system')}
      />
      <Spacer vertical={25} />
      <Spacer vertical={1} horizontal="100%" background={colors.outline} />
      <Spacer vertical={20} />
      <TouchableOpacity style={styles.logout} onPress={signOut}>
        <LogoutIcon fillColor={colors.onBackground} size={24} />
        <Text
          style={{
            color: colors.onBackground,
            fontSize: size.font16,
            paddingLeft: 20,
          }}>
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuContent;

const styles = StyleSheet.create({
  logout: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
