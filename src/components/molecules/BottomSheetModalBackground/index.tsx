import {Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import useTheme from '../../../hooks/useTheme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {HEIGHT, WIDTH} from '../../../utils/constants';

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
  useState;
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
        animateOnMount
        enablePanDownToClose={true}
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
    height: HEIGHT,
    left: 0,
    position: 'absolute',
    top: -0,
    width: WIDTH,
  },
});
