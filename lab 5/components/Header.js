import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../UI/colors';
import { StatusBar } from 'expo-status-bar';

export default function Header(name) {
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.textContainer}>{name.name}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  textContainer: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    color: GlobalStyles.colors.third,
  },
});
