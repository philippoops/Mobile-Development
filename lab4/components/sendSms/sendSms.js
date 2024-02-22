import { Alert, View, Text, StyleSheet } from 'react-native';
import * as SMS from 'expo-sms';
import Colors from '../ui/colors';
import PrimaryButton from '../ui/ButtonPrimary';
import ImageLogo from '../ui/ImagesLogo';
function SendSMSScreen() {
  const contactNumber = '5198546840';

  async function sendSMSMessage() {
    try {
      const recipients = [contactNumber]; // Replace with the recipient's phone number
      const message = `Philip Buenaflor \n 67 Speight Cruzader \nLondon, ON\n 555-555-1234`;

      const result = await SMS.sendSMSAsync(recipients, message);
      console.log(result);
      if (result.result === 'sent') {
        Alert.alert('Success', 'SMS sent successfully!');
      } else {
        Alert.alert('Error', 'Error while sending SMS');
      }
    } catch (error) {
      Alert.alert('Error', 'Error Sending SMS: ' + error.message);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <ImageLogo source={require('../../assets/images/sms.gif')} />
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
        <PrimaryButton onPressing={sendSMSMessage}>Send SMS</PrimaryButton>
      </View>
    </View>
  );
}

export default SendSMSScreen;

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
