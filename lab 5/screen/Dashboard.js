import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Image,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { firebase } from '../firebaseConfig';
import { GlobalStyles } from '../UI/colors';

export default function Dashboard() {
  const [name, setName] = useState('');
  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          Alert.alert('User Does not exist');
        }
      });
  }, []);

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setIsEmailVerified(user.emailVerified);
    }
  }, []);

  const sendVerificationEmail = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      user
        .sendEmailVerification()
        .then(() => {
          // Verification email sent
        })
        .catch((error) => {
          // Handle error
        });
    }
  };

  return (
    <View style={styles.container}>
      {isEmailVerified ? (
        // User's email is verified, show your regular dashboard
        <SafeAreaView style={styles.container}>
          <Image source={require('../assets/images/animeGepard1.gif')} />
          <Text
            style={{
              fontSize: 25,
              color: GlobalStyles.colors.third,
            }}
          >
            Hello, {name.firstName}
          </Text>
          <TouchableOpacity
            onPress={() => {
              firebase.auth().signOut();
            }}
            style={styles.button}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                color: GlobalStyles.colors.third,
              }}
            >
              Log out
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <View style={styles.validationContainer}>
          <Image source={require('../assets/images/cat1.gif')} />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: GlobalStyles.colors.black,
              marginHorizontal: 10,
            }}
          >
            Your email is not verified. Please verify your email address.
          </Text>

          <TouchableOpacity
            onPress={sendVerificationEmail}
            style={styles.button}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: GlobalStyles.colors.third,
              }}
            >
              Resend Verification Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              firebase.auth().signOut();
            }}
            style={styles.button}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: GlobalStyles.colors.third,
              }}
            >
              Back To Login
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  button: {
    marginTop: 50,
    height: 50,
    width: 200,
    backgroundColor: GlobalStyles.colors.secondary,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  validationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
