import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/header.component'
import StartScreen from './screens/start.screen';

export default function App() {
  return (
    <View style={styles.screen}>
      <Header  title="Guess A Number" />
      <StartScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1    
  }
});
