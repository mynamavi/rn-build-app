import React, {useState, useRef, useEffect} from 'react';
import  {StyleSheet, Text, View, Button, Alert} from 'react-native';

import NumberContainer from '../components/number.component';
import Card from '../components/card.component';
import BoldText from '../components/boldText.component';


const generateRandomNumber =(min, max, exclude) =>{
    min =Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random()*(max-min))+min;
    if(rndNum===exclude){
        return generateRandomNumber(min, max, exclude)
    }else{
        return rndNum;
    }
}

const GameScreen =(props)=>{
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomNumber(1 , 100, props.userChoice));
    
    const [ roundCount, setRoundCount] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver } =  props;

    useEffect( () => {
        if(currentGuess === userChoice){
            onGameOver(roundCount);
        }
    }, [currentGuess, userChoice, roundCount]);
    
    const nextGuessHandler = (direction) => {
        if( ( direction ==='lower' && currentGuess< userChoice)
            || (direction ==='greater' && currentGuess> userChoice)
        ) {
            Alert.alert("Don't Lie", "You know that is wrong....", [
                { text:'Sorry!', style:'cancel' }
            ]);
            return;
        }
        if(direction ==='lower'){
            currentHigh.current=currentGuess;
        }else{
            currentLow.current=currentGuess;
        }
        
        const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRoundCount(roundCount => roundCount+1);
    }

    return (
        <View style={styles.screen}>
            <BoldText>Opponent's Guess</BoldText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title='Lower' onPress= {nextGuessHandler.bind(this, 'lower')} />
                <Button title='Greater' onPress= {nextGuessHandler.bind(this, 'greater')} />
            </Card>
        </View>
    );

}

const styles= StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:"center",
    },
    buttonContainer: {
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        width:300,
        maxWidth:'80%'
    }

});

export default GameScreen;