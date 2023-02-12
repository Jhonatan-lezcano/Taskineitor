import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useRef, useState} from 'react';

const useBottomSheetModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handlePresentModalPress = (
    bottomSheetModalRef: React.RefObject<BottomSheetModal>,
  ) => {
    bottomSheetModalRef.current?.present();
    setShowModal(!showModal);
  };

  const handleCloseModalPress = (
    bottomSheetModalRef: React.RefObject<BottomSheetModal>,
  ) => {
    bottomSheetModalRef.current?.dismiss();
    setShowModal(false);
  };

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      setShowModal(false);
    }
  };

  return {
    showModal,
    handleCloseModalPress,
    handlePresentModalPress,
    handleSheetChanges,
  };
};

export default useBottomSheetModal;
