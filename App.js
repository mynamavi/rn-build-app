import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/header.component'
import StartScreen from './screens/start.screen';
import GameScreen from './screens/game.screen';

export default function App() {
  const [userNumber, setUserNumber] = useState('');

  startGameHandler = (enteredValue) =>{
    setUserNumber(enteredValue);
  }

  let content;
  content = <StartScreen onStartGame = {startGameHandler} />;
  if(userNumber){
    content = <GameScreen userChoice= {userNumber} />
  }


  return (
    <View style={styles.screen}>
      <Header  title="Guess A Number" />
      
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1    
  }
});
