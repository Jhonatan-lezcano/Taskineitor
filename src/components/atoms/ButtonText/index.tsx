import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface Props {
  title: string;
  titleColor: string;
  onPress: () => void;
  underLine: boolean;
}

const ButtonText = ({title, titleColor, onPress, underLine}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          color: titleColor,
          textDecorationLine: underLine ? 'underline' : 'none',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonText;

ButtonText.defaultProps = {
  underLine: false,
};
