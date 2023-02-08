import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useRef, useState} from 'react';

const useBottomSheetModal = () => {
  const [showModal, setShowModal] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
    setShowModal(!showModal);
  };

  const handleCloseModalPress = () => {
    bottomSheetModalRef.current?.close();
  };

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      setShowModal(!showModal);
    }
  };

  return {
    showModal,
    bottomSheetModalRef,
    handleCloseModalPress,
    handlePresentModalPress,
    handleSheetChanges,
  };
};

export default useBottomSheetModal;
