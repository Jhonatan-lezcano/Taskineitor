import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
}

const RadioButton = ({
  status,
  label,
  labelSecondary,
  onPress,
  width,
}: Props) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.radioContainer, {width}]}
      onPress={onPress}>
      <View>
        <Text style={[styles.label, {color: colors.onBackground}]}>
          {label}
        </Text>
        {labelSecondary && (
          <Text style={[styles.labelSecondary, {color: colors.outline}]}>
            {labelSecondary}
          </Text>
        )}
      </View>
      {status ? (
        <CircleCheckIcon fillColor={colors.primary} size={24} />
      ) : (
        <CircleIcon fillColor={colors.primary} size={24} />
      )}
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: size.font16,
    fontWeight: '500',
  },
  labelSecondary: {
    fontSize: size.font14,
  },
});
