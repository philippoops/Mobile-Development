import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
export default function App() {
  const [modalIsVisible, setModalVisible] = useState(false);
  const [contactItemList, setContact] = useState([]);

  function startAddContact() {
    setModalVisible(true);
  }

  function closeAddContact() {
    setModalVisible(false);
  }
  function addContactHandler(enteredContactText, enteredNumberText) {
    setContact((currentContact) => [
      ...currentContact,
      {
        text: enteredContactText,
        contact: enteredNumberText,
        id: Math.random().toString(),
      },
    ]);
    closeAddContact();
  }

  function deleteContactHandler(id) {
    setContact((currentContact) => {
      return currentContact.filter((contact) => contact.id !== id);
    });
  }
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Contact"
          color="gold"
          onPress={startAddContact}
        />
        <AddContact
          visible={modalIsVisible}
          onAddContact={addContactHandler}
          closeContact={closeAddContact}
        />

        <View style={styles.goalsContainer}>
          <FlatList
            data={contactItemList}
            renderItem={(itemData) => {
              return (
                <ContactList
                  text={
                    itemData.item.text !== ''
                      ? itemData.item.text
                      : 'Contact Name'
                  }
                  contacts={
                    itemData.item.contact !== ''
                      ? itemData.item.contact
                      : 'Number'
                  }
                  id={itemData.item.id}
                  onDeleteContact={deleteContactHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '',
  },

  goalsContainer: {
    flex: 5,
  },
});
