import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {lightMode} from '../../../theme/colors';

interface Props {
  label?: string;
  width?: string | number;
  placeholder?: string;
  err?: any;
  control: any;
  rules?: any;
  name: string;
  password?: boolean;
  inputType?: any;
  variant: 'line' | 'borders';
  borderColor?: string;
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
}: Props) => {
  const [secureText, setSecureText] = useState(false);
  return (
    <View style={[{width}]}>
      {label && (
        <Text style={[styles.label, {color: lightMode.colors.textSecondary}]}>
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
            placeholderTextColor={lightMode.colors.textSecondary}
            value={value}
            onChangeText={onChange}
            keyboardType={inputType}
            selectionColor={lightMode.colors.primary}
            secureTextEntry={secureText}
            onBlur={onBlur}
            style={[
              styles.input,
              variant === 'line'
                ? styles.line
                : variant === 'borders' && styles.borders,
              {
                color: lightMode.colors.text,
                borderColor: error
                  ? lightMode.colors.alertColors.danger
                  : borderColor,
                paddingHorizontal:
                  variant === 'line' ? 5 : variant === 'borders' ? 15 : 0,
              },
            ]}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
  },
  line: {
    borderBottomWidth: 1,
  },
  borders: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
  },
  btnPassword: {
    bottom: 25,
    position: 'absolute',
    right: 10,
    width: 25,
  },
  label: {
    paddingBottom: 5,
  },
});

export default Input;
