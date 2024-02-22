import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { MyColors } from '../UI/MyColors';

import ImagePickerModal from './imageModal';

export default function ImagePickerHolder({ onTakeImage, savedImageUri }) {
  const [pickImage, setPickImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    }
  };

  async function takeImageHandler() {
    toggleModal();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setPickImage(result.uri);
      onTakeImage(result.uri);
    }
  }

  async function takePhotoHandler() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    toggleModal();
    if (!result.cancelled) {
      setPickImage(result.uri);
      onTakeImage(result.uri);
    }
  }

  const handleCancelPress = () => {
    toggleModal();
  };

  let imagePreview = (
    <TouchableOpacity onPress={toggleModal} style={styles.imagePreview}>
      <Image
        style={styles.image}
        source={require('../assets/image/image.png')}
      />
    </TouchableOpacity>
  );
  console.log(savedImageUri);

  if (savedImageUri) {
    imagePreview = (
      <TouchableOpacity onPress={toggleModal} style={styles.imagePreview}>
        <Image style={styles.image} source={{ uri: savedImageUri }} />
      </TouchableOpacity>
    );
  } else if (pickImage) {
    imagePreview = (
      <TouchableOpacity onPress={toggleModal} style={styles.imagePreview}>
        <Image style={styles.image} source={{ uri: pickImage }} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View>{imagePreview}</View>
      <ImagePickerModal
        isVisible={isModalVisible}
        onLibraryPress={takeImageHandler}
        onCameraPress={takePhotoHandler}
        onCancelPress={handleCancelPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview: {
    borderWidth: 1,
    borderColor: MyColors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 4,
  },
});
