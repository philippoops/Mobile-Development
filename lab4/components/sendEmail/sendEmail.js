import { Alert, View, Text, StyleSheet, Image } from 'react-native';

import PrimaryButton from '../ui/ButtonPrimary';
import * as MailComposer from 'expo-mail-composer';
import Colors from '../ui/colors';
import ImageLogo from '../ui/ImagesLogo';
function SendEmail() {
  function emailSend() {
    MailComposer.composeAsync({
      subject: 'INFO-3173',
      body: `Philip Buenaflor \n 67 Speight Cruzader \nLondon, ON\n 555-555-1234`,
      recipients: ['philip.buenaflor@gmail.com'],
    })
      .then((result) => {
        if (result.status === 'sent') {
          Alert.alert('Success', 'Email sent Successfully.');
        } else {
          Alert.alert('Error', 'Email has not sent');
        }
      })
      .catch((error) => console.error('Error Sending email', error));
  }

  return (
    <View style={styles.rootContainer}>
      <ImageLogo source={require('../../assets/images/email.gif')} />
      <View>
        <Text style={styles.instruction}>
          YOU ARE GOING TO SEND THE FOLLOWING INFO:
        </Text>
      </View>
      <Text style={styles.sampleText}>Philip Buenaflor</Text>
      <Text style={styles.sampleText}>67 Speight Cruzader</Text>
      <Text style={styles.sampleText}>London, ON</Text>
      <Text style={styles.sampleText}>555-555-1234</Text>
      {/* <Button title='Send Email'onPress={emailSend}/> */}
      <View style={styles.btnStyle}>
        <PrimaryButton onPressing={emailSend}>Send Email</PrimaryButton>
      </View>
    </View>
  );
}

export default SendEmail;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instruction: {
    fontSize: 15,
    color: Colors.primaryColor,
    marginBottom: 50,
  },
  sampleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnStyle: {
    width: '90%',
    marginTop: 40,
  },
});
