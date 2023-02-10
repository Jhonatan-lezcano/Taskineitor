import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import Button from '../../atoms/Button';
import useTheme from '../../../hooks/useTheme';
import MenuIcon from '../../../assets/svgs/MenuIcon';
import {size} from '../../../theme/fonts';

const {width, height} = Dimensions.get('screen');

interface Props {
  openMenu: () => void;
}

const Menu = ({openMenu}: Props) => {
  const {colors} = useTheme();

  return (
    <View style={styles.containerMenu}>
      <Button
        backgroundColor={colors.background}
        radius={20}
        width={32}
        icon={MenuIcon}
        sizeIcon={size.font22}
        colorIcon={colors.primary}
        onPress={openMenu}
        customStyle={{
          padding: 0,
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        shadow
      />
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
    top: 55,
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
