import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface Props {
  title: string;
  titleColor: string;
  onPress: () => void;
  underLine?: boolean;
  fontSize?: number;
}

const ButtonText = ({
  title,
  titleColor,
  onPress,
  underLine,
  fontSize,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          color: titleColor,
          textDecorationLine: underLine ? 'underline' : 'none',
          fontSize,
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
