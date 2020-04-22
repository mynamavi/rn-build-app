import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import TitleText from '../components/titleText.component';
import BoldText from '../components/boldText.component';

const GameOverScreen = (props) =>{
    return(
        <View style={styles.screen}>
            <TitleText>GAME OVER!</TitleText>
            <BoldText>Number Of Rounds: {props.roundCount}</BoldText>
            <BoldText>The Number was : {props.userNumber}</BoldText>
            <Button title='Restart Game' onPress={props.onRestart} />
        </View>
    )
}

const styles= StyleSheet.create({
    screen: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});

export default GameOverScreen;