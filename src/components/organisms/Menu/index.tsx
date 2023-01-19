import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../../atoms/Button';
import useTheme from '../../../hooks/useTheme';
import MenuIcon from '../../../assets/svgs/MenuIcon';
import {size} from '../../../theme/fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LogoutIcon from '../../../assets/svgs/LogoutIcon';
import SunIcon from '../../../assets/svgs/SunIcon';

const {width, height} = Dimensions.get('screen');

const Menu = () => {
  const {colors, dark, changeTheme} = useTheme();
  const [showMenu, setShowMenu] = useState(false);
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
      <Modal
        visible={showMenu}
        animationType="fade"
        onRequestClose={() => setShowMenu(!showMenu)}
        transparent>
        <Pressable
          style={styles.closeMenu}
          onPress={() => setShowMenu(!showMenu)}></Pressable>
        <View
          style={[
            styles.menuContainer,
            {
              backgroundColor: colors.background,
              shadowColor: colors.onBackground,
            },
          ]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              changeTheme();
            }}>
            <SunIcon fillColor={colors.onBackground} size={size.font22} />
            <Text style={styles.textOption}>
              {dark ? 'Light mode' : 'Dark mode'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <LogoutIcon fillColor={colors.onBackground} size={size.font22} />
            <Text style={styles.textOption}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    flex: 1,
  },
  menuContainer: {
    borderRadius: 5,
    position: 'absolute',
    top: 95,
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
