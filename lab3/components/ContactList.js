import { StyleSheet, View, Text, Pressable } from 'react-native';

function ContactList(props) {
  return (
    <View style={styles.contactItem}>
      <Pressable
        onPress={props.onDeleteContact.bind(this, props.id)}
        style={({ pressed }) => pressed && styles.pressedItem} // this style function use to give effect the button
      >
        <Text style={styles.contactText}>
          {props.text} / {props.contacts}
        </Text>
      </Pressable>
    </View>
  );
}

export default ContactList;

const styles = StyleSheet.create({
  contactItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0eec',
  },
  pressedItem: {
    opacity: 0.5,
  },
  contactText: {
    padding: 8,
    color: '#fff',
  },
});
