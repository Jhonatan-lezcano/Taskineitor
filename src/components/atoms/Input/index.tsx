import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {lightMode} from '../../../theme/colors';
import EyeIcon from '../../../assets/svgs/EyeIcon';
import ClosedEyeIcon from '../../../assets/svgs/ClosedEyeIcon';
import TextMessageError from '../TextMessageError';
import useTheme from '../../../hooks/useTheme';

export type InputTypes =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad'
  | 'url';

type TextAlignVertical = 'center' | 'auto' | 'bottom' | 'top' | undefined;

interface Props {
  label?: string;
  width?: string | number;
  height?: string | number;
  placeholder?: string;
  err?: any;
  control: any;
  rules?: any;
  name: string;
  password?: boolean;
  inputType?: InputTypes;
  variant: 'line' | 'borders';
  borderColor?: string;
  multiline?: boolean;
  numberOfLines?: number;
  textAlignVertical?: TextAlignVertical;
}

const Input = ({
  label,
  width,
  control,
  placeholder,
  err,
  rules,
  name,
  password,
  inputType,
  variant,
  borderColor,
  height,
  multiline,
  numberOfLines,
  textAlignVertical,
}: Props) => {
  const [secureText, setSecureText] = useState(password);
  const {colors} = useTheme();
  return (
    <View style={[{width}]}>
      {label && (
        <Text style={[styles.label, {color: colors.onBackground}]}>
          {label}
        </Text>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.surfaceVariant}
            value={value}
            onChangeText={onChange}
            keyboardType={inputType}
            selectionColor={colors.primary}
            secureTextEntry={secureText}
            onBlur={onBlur}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={textAlignVertical}
            style={[
              styles.input,
              variant === 'line'
                ? styles.line
                : variant === 'borders' && styles.borders,
              {
                height,
                color: colors.onBackground,
                borderColor: error ? colors.alertColors.danger : borderColor,
                paddingHorizontal:
                  variant === 'line' ? 5 : variant === 'borders' ? 15 : 0,
              },
            ]}
          />
        )}
      />
      <TextMessageError
        message={err[name] && (err[name]?.message || 'error')}
      />
      {password && (
        <TouchableOpacity
          style={styles.btnPassword}
          onPress={() => setSecureText(!secureText)}>
          {secureText ? (
            <EyeIcon fillColor={lightMode.colors.primary} />
          ) : (
            <ClosedEyeIcon fillColor={lightMode.colors.primary} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {},
  line: {
    borderBottomWidth: 1,
  },
  borders: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
  },
  btnPassword: {
    bottom: 20,
    position: 'absolute',
    right: 10,
    width: 25,
  },
  label: {
    paddingBottom: 5,
  },
});

export default Input;

Input.defaultProps = {
  placeholder: '',
  value: '',
  width: '100%',
  height: 40,
  password: false,
  inputTypes: 'default',
};
