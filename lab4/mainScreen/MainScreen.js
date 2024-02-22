import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/ui/ButtonPrimary';
function MainScreen({ navigation }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Send My Info L_Buenaflor</Text>
      <View style={styles.btnContainer}>
        <PrimaryButton onPressing={() => navigation.navigate('Email')}>
          Send Email
        </PrimaryButton>
        <PrimaryButton onPressing={() => navigation.navigate('SMS')}>
          Send SMS
        </PrimaryButton>
      </View>
    </View>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    borderWidth: 2,
    padding: 20,
    width: '50%',
    textAlign: 'center',
  },
  btnContainer: {
    width: '80%',
    marginTop: 100,
  },
});
