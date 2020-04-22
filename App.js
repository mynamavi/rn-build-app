import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/header.component'
import StartScreen from './screens/start.screen';
import GameScreen from './screens/game.screen';
import GameOverScreen from './screens/gameover.screen';

export default function App() {
  const [userNumber, setUserNumber] = useState('');
  const [guessRounds, setGuessRounds] = useState(0);

  const configureNewGameHandler = () =>{
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (enteredValue) =>{
    setUserNumber(enteredValue);
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }

  let content;
  content = <StartScreen onStartGame = {startGameHandler} />;
  if(userNumber && guessRounds <=0 ){
    content = <GameScreen userChoice= {userNumber}  onGameOver ={gameOverHandler} />
  }else if( guessRounds>0) {
    content = <GameOverScreen roundCount={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
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
