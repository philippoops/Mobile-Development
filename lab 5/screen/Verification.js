import React, { useState, useEffect } from 'react';
import { firebase } from '../firebaseConfig';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Dashboard from './Dashboard';
import { GlobalStyles } from '../UI/colors';

export default function LoginScreen() {
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
        <Dashboard />
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
  },
  button: {
    marginTop: 50,
    height: 50,
    width: 250,
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
