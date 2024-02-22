import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebaseConfig';
import { GlobalStyles } from '../UI/colors';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, SetPassword] = useState('');
  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert('Please input correct email and password');
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Gepard.png')}
        style={styles.imageContent}
      />
      <Text style={styles.textContainer}>Login - l_buenaflor</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => SetPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            color: GlobalStyles.colors.third,
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}
        style={{ marginTop: 20 }}
      >
        <Text style={{ textAlign: 'center' }}>
          Don't have an account? Register Now
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
  },
  imageContent: {
    width: '40%',
    height: 90,
    marginBottom: 20,
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
