import {Dimensions, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {
  visible: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const width = Dimensions.get('window').width;

const ModalContainer = ({visible, closeModal, children}: Props) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={closeModal}
      transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

export default ModalContainer;

const styles = StyleSheet.create({
  modalBackground: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    padding: 20,
    width: width * 0.9,
  },
});
