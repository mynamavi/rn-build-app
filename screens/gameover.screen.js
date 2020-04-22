import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


const GameOverScreen = (props) =>{
    return(
        <View style={styles.screen}>
            <Text>GAME OVER!</Text>
            <Text>Number Of Rounds: {props.roundCount}</Text>
            <Text>The Number was : {props.userNumber}</Text>
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