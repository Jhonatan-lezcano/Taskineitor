import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CircleCheckIcon from '../../../assets/svgs/CircleCheckIcon';
import useTheme from '../../../hooks/useTheme';
import CircleIcon from '../../../assets/svgs/CircleIcon';
import {size} from '../../../theme/fonts';

interface Props {
  status: boolean;
  label: string;
  labelSecondary?: string;
  onPress: () => void;
  width?: string | number;
  radioButtonOrientation: 'left' | 'right';
  size: number;
  fontSize: number;
  bold: boolean;
  lines?: number;
}

const RadioButton = ({
  status,
  label,
  labelSecondary,
  onPress,
  width,
  radioButtonOrientation,
  size,
  fontSize,
  bold,
  lines,
}: Props) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.radioContainer,
        {
          flexDirection:
            radioButtonOrientation === 'right' ? 'row' : 'row-reverse',
          width,
        },
      ]}
      onPress={onPress}>
      <View style={{width: '90%'}}>
        <Text
          numberOfLines={lines}
          style={[
            {
              color: colors.onBackground,
              fontSize,
              fontWeight: bold ? '500' : '300',
            },
          ]}>
          {label}
        </Text>
        {labelSecondary && (
          <Text style={[styles.labelSecondary, {color: colors.outline}]}>
            {labelSecondary}
          </Text>
        )}
      </View>
      {status ? (
        <CircleCheckIcon fillColor={colors.primary} size={size} />
      ) : (
        <CircleIcon fillColor={colors.primary} size={size} />
      )}
    </TouchableOpacity>
  );
};

RadioButton.defaultProps = {
  radioButtonOrientation: 'right',
  size: 24,
  fontSize: size.font16,
  bold: true,
};

export default RadioButton;

const styles = StyleSheet.create({
  radioContainer: {
    alignItems: 'center',

    justifyContent: 'space-between',
  },
  labelSecondary: {
    fontSize: size.font14,
  },
});
