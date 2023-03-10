import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {size} from '../../../theme/fonts';
import useTheme from '../../../hooks/useTheme';

interface Props {
  text?: string;
  backgroundColor: string;
  titleColor?: string;
  radius: number;
  onPress: () => void;
  shadow?: boolean;
  width?: string | number;
  icon?: React.ElementType;
  colorIcon?: string;
  sizeIcon?: number;
  borderColor?: string;
  customStyle?: {};
  disable?: boolean;
}

const Button = ({
  text,
  backgroundColor,
  titleColor,
  radius,
  onPress,
  shadow,
  width,
  icon: Icon,
  colorIcon,
  sizeIcon,
  borderColor,
  customStyle,
  disable,
}: Props) => {
  const {colors} = useTheme();
  const shadowButton = {
    shadowColor: colors.onBackground,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  };
  return (
    <TouchableOpacity
      style={[
        styles.button,
        customStyle,
        shadow && shadowButton,
        {
          backgroundColor,
          borderRadius: radius,
          borderColor,
          borderWidth: borderColor ? 2 : 0,
          width,
        },
      ]}
      onPress={onPress}
      disabled={disable}>
      {Icon && <Icon fillColor={colorIcon} size={sizeIcon} />}
      {text && (
        <Text
          style={[
            styles.text,
            {color: titleColor, paddingLeft: Icon ? 10 : 0},
          ]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    fontSize: size.font14,
  },
});

Button.defaultProps = {
  width: '100%',
};
