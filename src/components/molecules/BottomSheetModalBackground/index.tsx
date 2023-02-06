import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useTheme from '../../../hooks/useTheme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const {width, height} = Dimensions.get('screen');

interface Props {
  children: React.ReactNode;
  onChange: (index: number) => void;
  refBottomSheet: React.RefObject<BottomSheetModal>;
  showModalBackground: boolean;
  handleCloseModalPress: () => void;
  snapPoints: string[];
  indexSnapPoints: number;
}

const BottomSheetModalBackground = ({
  children,
  onChange,
  refBottomSheet,
  showModalBackground,
  handleCloseModalPress,
  snapPoints,
  indexSnapPoints,
}: Props) => {
  const {colors} = useTheme();
  return (
    <>
      {showModalBackground && (
        <Pressable
          style={[
            styles.backgoundModal,
            {backgroundColor: colors.surfaceVariant, opacity: 0.5},
          ]}
          onPress={handleCloseModalPress}
        />
      )}
      <BottomSheetModal
        ref={refBottomSheet}
        index={indexSnapPoints}
        snapPoints={snapPoints}
        onChange={onChange}
        handleIndicatorStyle={{backgroundColor: colors.onBackground}}
        style={{paddingHorizontal: 30}}
        backgroundStyle={{
          borderRadius: 50,
          backgroundColor: colors.background,
        }}>
        {children}
      </BottomSheetModal>
    </>
  );
};

export default BottomSheetModalBackground;

const styles = StyleSheet.create({
  backgoundModal: {
    height,
    left: 0,
    position: 'absolute',
    top: 0,
    width,
  },
});
