// components/ImagePickerModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ImagePickerModal = ({
  isVisible,
  onLibraryPress,
  onCameraPress,
  onCancelPress,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        // Handle modal close (Android back button)
        onCancelPress();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose an option</Text>
          <TouchableOpacity style={styles.button} onPress={onLibraryPress}>
            <Text style={styles.buttonText}>Upload from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onCameraPress}>
            <Text style={styles.buttonText}>Take a Photo</Text>
          </TouchableOpacity>
          <Button title="Cancel" onPress={onCancelPress} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ImagePickerModal;
