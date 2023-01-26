import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../../atoms/Button';
import useTheme from '../../../hooks/useTheme';
import MenuIcon from '../../../assets/svgs/MenuIcon';
import {size} from '../../../theme/fonts';
import LogoutIcon from '../../../assets/svgs/LogoutIcon';
import SunIcon from '../../../assets/svgs/SunIcon';
import auth from '@react-native-firebase/auth';
import {isAuth} from '../../../store/slices/auth/authSlice';
import {useAppDispatch} from '../../../store/hooks/hooks';

const {width, height} = Dimensions.get('screen');

const Menu = () => {
  const {colors, dark, changeTheme} = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useAppDispatch();

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(isAuth());
      });
  };
  return (
    <View style={styles.containerMenu}>
      <Button
        backgroundColor={colors.background}
        radius={20}
        width={32}
        icon={MenuIcon}
        sizeIcon={size.font22}
        colorIcon={colors.primary}
        onPress={() => setShowMenu(!showMenu)}
        customStyle={{
          padding: 0,
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        shadow
      />
      {showMenu && (
        <Pressable
          style={styles.closeMenu}
          onPress={() => setShowMenu(!showMenu)}>
          <View
            style={[
              styles.menuContainer,
              {
                backgroundColor: colors.background,
                shadowColor: colors.onBackground,
              },
            ]}>
            <TouchableOpacity style={styles.menuItem} onPress={changeTheme}>
              <SunIcon fillColor={colors.onBackground} size={size.font22} />
              <Text style={[styles.textOption, {color: colors.onBackground}]}>
                {dark ? 'Light mode' : 'Dark mode'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={signOut}>
              <LogoutIcon fillColor={colors.onBackground} size={size.font22} />
              <Text style={[styles.textOption, {color: colors.onBackground}]}>
                Sign out
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  containerMenu: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'android' ? 55 : 55,
  },
  closeMenu: {
    height,
    position: 'absolute',
    right: -20,
    top: -20,
    width,
  },
  menuContainer: {
    borderRadius: 5,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 95 : 55,
    right: 20,
    width: width * 0.45,

    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    zIndex: 1111,
  },
  menuItem: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 15,
    width: '100%',
  },
  textOption: {
    paddingLeft: 15,
  },
});
