import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import {size} from '../../../theme/fonts';

interface Options {
  value: string | number;
  label: string;
}

interface Props {
  name: string;
  control: any;
  width?: string;
  options: Options[];
  onChange: Function;
}

const Select = ({name, control, width, options, onChange}: Props) => {
  return (
    <View style={[{width}]}>
      <Controller
        control={control}
        name={name}
        render={({field: {value}}) => (
          <Picker
            selectedValue={value}
            onValueChange={itemValue => onChange(name, itemValue)}
            itemStyle={{fontSize: size.font16}}>
            {options.map(item => (
              <Picker.Item
                key={item.value}
                value={item.value}
                label={item.label}
              />
            ))}
          </Picker>
        )}
      />
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({});

Select.defaultProps = {
  width: '100%',
};
