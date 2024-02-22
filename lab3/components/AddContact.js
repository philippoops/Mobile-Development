import { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Modal,
  Image,
} from 'react-native';

function AddContact(props) {
  const [enteredContactText, setEnteredContactText] = useState('');
  const [enteredNumberText, setEnteredNumberText] = useState('');
  function contactInputHandler(enteredText) {
    setEnteredContactText(enteredText);
  }
  function numberInputHandler(enteredNumber) {
    setEnteredNumberText(enteredNumber);
  }
  function addContactHandler() {
    props.onAddContact(enteredContactText, enteredNumberText);
    setEnteredContactText('');
    setEnteredNumberText('');
  }
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/contact-book.gif')}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          onChangeText={contactInputHandler}
          value={enteredContactText}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Number/Email address"
          onChangeText={numberInputHandler}
          value={enteredNumberText}
        />
        <View style={styles.btnContainer}>
          <View style={styles.btn}>
            <Button
              title="Cancel"
              onPress={props.closeContact}
              color="#5e0eec"
            />
          </View>
          <View style={styles.btn}>
            <Button
              title="Add Contact"
              onPress={addContactHandler}
              color="gold"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddContact;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#5e0eec',
    backgroundColor: 'gold',
    borderRadius: 6,
    color: '#000',
    width: '100%',
    padding: 15,
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  btn: {
    width: '35%',
    marginHorizontal: 8,
  },
});
