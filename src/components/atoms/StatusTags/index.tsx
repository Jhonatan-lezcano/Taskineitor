import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COMPLETE, IN_PROCESS, PENDING} from '../../../utils/constants';
import useTheme from '../../../hooks/useTheme';
import {size} from '../../../theme/fonts';

interface Props {
  label: number;
}

const StatusTags = ({label}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.label,
        {
          backgroundColor:
            label === PENDING
              ? colors.alertColors.warning
              : label === IN_PROCESS
              ? colors.alertColors.update
              : label === COMPLETE
              ? colors.alertColors.success
              : 'white',
        },
      ]}>
      <Text style={styles.labelText}>
        {label === PENDING
          ? 'Pending'
          : label === IN_PROCESS
          ? 'In Process'
          : label === COMPLETE
          ? 'Complete'
          : null}
      </Text>
    </View>
  );
};

export default StatusTags;

const styles = StyleSheet.create({
  label: {
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  labelText: {
    color: 'white',
    fontSize: size.font10,
  },
});
