import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CloseIcon from '../../../assets/svgs/CloseIcon';
import useTheme from '../../../hooks/useTheme';
import {HEIGHT, WIDTH} from '../../../utils/constants';

interface Props {
  visible: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  width: string | number;
}

const ModalContainer = ({visible, closeModal, children, width}: Props) => {
  const {colors} = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={closeModal}
      transparent>
      <View
        style={[
          styles.modalBackground,
          {backgroundColor: colors.surfaceVariant, opacity: 0.5},
        ]}
      />
      <View style={styles.containerModal}>
        <View
          style={[
            styles.modalView,
            {backgroundColor: colors.background, width},
          ]}>
          {children}
          <TouchableOpacity style={styles.btnClose} onPress={closeModal}>
            <CloseIcon size={23} fillColor={colors.onBackground} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalContainer;

ModalContainer.defaultProps = {
  width: WIDTH * 0.9,
};

const styles = StyleSheet.create({
  modalBackground: {
    height: HEIGHT,
    left: 0,
    position: 'absolute',
    top: 0,
    width: WIDTH,
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    padding: 20,
  },
  btnClose: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
