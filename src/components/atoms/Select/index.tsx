import {View} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import {size} from '../../../theme/fonts';
import useTheme from '../../../hooks/useTheme';

interface Options {
  value: string | number;
  label: string;
}

interface Props {
  name?: string;
  control?: any;
  width?: string;
  options: Options[];
  onChange: Function;
  valueSelect?: string | number;
}

const Select = ({
  name,
  control,
  width,
  options,
  onChange,
  valueSelect,
}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={[{width}]}>
      {control && name ? (
        <Controller
          control={control}
          name={name!}
          render={({field: {value}}) => (
            <Picker
              selectedValue={value}
              onValueChange={itemValue => onChange(name, itemValue)}
              itemStyle={{fontSize: size.font16}}
              style={{backgroundColor: colors.background}}
              dropdownIconColor={colors.onBackground}>
              {options.map(item => (
                <Picker.Item
                  key={item.value}
                  value={item.value}
                  label={item.label}
                  color={colors.onBackground}
                  style={{backgroundColor: colors.background}}
                />
              ))}
            </Picker>
          )}
        />
      ) : (
        <Picker
          selectedValue={valueSelect}
          onValueChange={itemValue => onChange(itemValue)}
          itemStyle={{fontSize: size.font16}}
          style={{backgroundColor: colors.background, height: 200}}
          dropdownIconColor={colors.onBackground}>
          {options.map(item => (
            <Picker.Item
              key={item.value}
              value={item.value}
              label={item.label}
              color={colors.onBackground}
              style={{backgroundColor: colors.background}}
            />
          ))}
        </Picker>
      )}
    </View>
  );
};

export default Select;

Select.defaultProps = {
  width: '100%',
};
