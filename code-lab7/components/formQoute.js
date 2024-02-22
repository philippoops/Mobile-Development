import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MyColors } from '../UI/MyColors';

import * as FileSystem from 'expo-file-system';

import ImagePickerHolder from './ImagePickerHolder';
import OutlineButtons from '../UI/OutlineButtons';
import { fetchMoment, init, insertMoment, dropTable } from '../database';

export default function FormQoute() {
  const [enteredQoute, setEnteredQoute] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [saveButtonVisible, setSaveButtonVisible] = useState(true);

  useEffect(() => {
    init();

    fetchMoment((data) => {
      console.log(data);
      if (data) {
        setEnteredQoute(data.qoute);
        setSelectedImage(data.imageUri);
        setSaveButtonVisible(false);
      }
    });
  }, []);

  function changeQouteHandler(enteredText) {
    setEnteredQoute(enteredText);
  }

  function takePhotoHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  function saveDataHandler() {
    const permanentUri = `${FileSystem.documentDirectory}profile_image.jpg`;

    FileSystem.moveAsync({ from: selectedImage, to: permanentUri })
      .then(() => {
        console.log('Image moved successfully to:', permanentUri);
        insertMoment(enteredQoute, permanentUri);
        setSaveButtonVisible(false);
      })
      .catch((error) => {
        console.error('Error moving the image:', error);
      });
  }

  function handleDropDatabase() {
    dropTable();

    const directoryPath = `${FileSystem.documentDirectory}profile_image.jpg`;
    FileSystem.deleteAsync(directoryPath, { idempotent: true });
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>My Favourite Moment</Text>
      </View>

      <ImagePickerHolder
        onTakeImage={takePhotoHandler}
        savedImageUri={selectedImage}
      />
      <View>
        <TextInput
          style={styles.input}
          onChangeText={changeQouteHandler}
          value={enteredQoute}
          placeholder="Add your Qoute/Caption here..."
        />
      </View>
      {saveButtonVisible && (
        <OutlineButtons icon="save" onPressing={saveDataHandler}>
          Save
        </OutlineButtons>
      )}
      <OutlineButtons icon="trash" onPressing={handleDropDatabase}>
        Delete
      </OutlineButtons>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
    marginTop: 40,
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 20,
    color: MyColors.secondary,
    fontSize: 25,
    textAlign: 'center',
  },
  input: {
    marginVertical: 20,
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: 90,
    fontSize: 16,
    borderColor: MyColors.primary,
    borderWidth: 1,
  },
});
