// JS file for button cutomize
import { View, Text, Pressable, StyleSheet } from 'react-native';

// import color
import Colors from './colors';
function PrimaryButton({ children, onPressing }) {
  return (
    <View style={styles.btnOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.btnInnerContainer, styles.pressed]
            : styles.btnInnerContainer
        }
        onPress={onPressing}
        android_ripple={{ color: Colors.secondColor }}
      >
        <Text style={styles.btnText}>{children}</Text>
      </Pressable>
    </View>
  );
}
export default PrimaryButton;

const styles = StyleSheet.create({
  btnOuterContainer: {
    borderRadius: 28,
    margin: 20,
    overflow: 'hidden',
  },
  btnInnerContainer: {
    backgroundColor: Colors.thirdColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  btnText: {
    color: Colors.primaryColor,
    textAlign: 'center',
    fontSize: 18,
  },
  pressed: {
    opacity: 0.75,
  },
});
