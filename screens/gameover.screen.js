import React from 'react';
import { StyleSheet, Image, View, Text, Button } from 'react-native';

import TitleText from '../components/titleText.component';
import BoldText from '../components/boldText.component';
import Colors from '../constants/colors.constant';
import MainButton from '../components/mainbutton.component';

const GameOverScreen = (props) =>{
    return(
        <View style={styles.screen}>
            <TitleText>GAME OVER!</TitleText>
            <View style={styles.imageContainer}>
            <Image 
                source={require('../assets/success.png')} 
                style={styles.image}
                resizeMode='cover'
                />
            </View>
            <View  style={styles.textContainer}>
                <BoldText style={styles.textResult}>Your phone taken : 
                    <Text style={styles.hightlight}> {props.roundCount}</Text> rounds to guess your Number 
                    <Text style={styles.hightlight}> {props.userNumber}</Text>.
                </BoldText>
            </View>
            <MainButton onPress={props.onRestart} color={Colors.primary} >
            Restart Game
            </MainButton>
        </View>
    )
}

const styles= StyleSheet.create({
    screen: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    imageContainer: {
        width:300,
        height:300,
        borderRadius:150,
        borderWidth:3,
        borderColor:Colors.border,
        overflow:'hidden',
        marginVertical:12
    },
    image:{        
        width:'100%',
        height: '100%',
    },
    hightlight : {
        color:Colors.primary,
        fontFamily:'open-sans-bold'
    },
    textContainer:{
        marginHorizontal:20
    },
    textResult:{
        textAlign:"center"
    }
});

export default GameOverScreen;