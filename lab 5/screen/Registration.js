import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../firebaseConfig';
import { GlobalStyles } from '../UI/colors';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const registerUser = async (email, password, firstName, lastName) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://authentication-50ebd.firebaseapp.com',
          })
          .then(() => {
            Alert.alert('Verification email Sent');
          })
          .catch((error) => {
            Alert.alert('Sorry you need to verify your email first', error);
          })
          .then(() => {
            firebase
              .firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
              });
          })
          .catch((error) => {
            Alert.alert(error.message);
          });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Register Now</Text>

      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          onChangeText={(fName) => setFirstName(fName)}
          autoCorrect={false}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          onChangeText={(lName) => setLastName(lName)}
          autoCorrect={false}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        onPress={() => registerUser(email, password, firstName, lastName)}
        style={styles.button}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            color: GlobalStyles.colors.third,
          }}
        >
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textContainer: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  inputContainer: {
    marginTop: 40,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.black,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
    height: 50,
    width: 200,
    backgroundColor: GlobalStyles.colors.secondary,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
