import React, {useState, useEffect} from 'react';
import {
    Text, View, 
    StyleSheet, Button, 
    TouchableWithoutFeedback, Keyboard,
    Alert, Dimensions, 
    ScrollView, KeyboardAvoidingView}
     from 'react-native';

import Colors from '../constants/colors.constant';

import Card from '../components/card.component';
import Input from '../components/input.component';
import NumberContainer from '../components/number.component';
import TitleText from '../components/titleText.component';
import BoldText from '../components/boldText.component';
import MainButton from '../components/mainbutton.component';

const StartScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');

    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width/4);

    

    const numberInputHandler = (inputText) =>{
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    }

    const resetInputHandler = () =>{
        setEnteredValue('');
        setConfirmed(false);
    }

    useEffect( ()=> {
        const updateLayout = () =>{
            setButtonWidth(Dimensions.get('window').width/4);
        }
    
        Dimensions.addEventListener('change', updateLayout);
        return() =>{
            Dimensions.removeEventListener('change', updateLayout);
        };
    })

    const confirmInputHandler = () =>{
        const chosenNumber = parseInt(enteredValue);
        if( isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber>99){
            Alert.alert(
                'Inavlid Number!', 
                'Number has to be in between 1 to 99', 
                [{text:'Okay', style:'destructive', onPress:resetInputHandler}]
            )
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if(confirmed){
        confirmedOutput = <Card style={styles.summaryContainer}>
                <Text>You Selected </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton 
                    onPress = { ()=> props.onStartGame(selectedNumber) }>
                START GAME</MainButton>
            </Card> 
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30} >
                <TouchableWithoutFeedback 
                    onPress={()=>{ Keyboard.dismiss(); }}>
                    <View style= {styles.screen}>
                    <TitleText style={styles.title}>Start a New Game!</TitleText>
                
                    <Card style={styles.inputContainer}>
                        <BoldText>Select a Number</BoldText>
                        <Input 
                            style={styles.input} 
                            blurOnSubmit 
                            autoCaptialize='none' 
                            autoCorrect={false} 
                            keyboardType="number-pad"
                            maxLength={2}
                            onChangeText= {numberInputHandler}
                            value = {enteredValue}
                            />
                        
                        <View style={styles.buttonContainer}>
                            <View style={{width:buttonWidth}}>
                                <Button title='Reset' onPress = {resetInputHandler} color={Colors.accent} />
                            </View>
                            <View style={{width:buttonWidth}}>
                                <Button title='Confirm' onPress = {confirmInputHandler} color={Colors.primary} />
                            </View>
                            
                        </View>
                    </Card>

                    <View >
                        {confirmedOutput}
                    </View>
                    

                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>   
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding:10,
        alignItems: 'center'
    },
    title:{
        fontSize:20,
        marginVertical:10,
    },
    inputContainer:{
        minWidth:300,
        width:'80%',
        alignItems:'center'        
    },
    input:{
        width:60,
        maxWidth:'40%',
        textAlign:"center"
    },
    buttonContainer:{
        flexDirection:"row",
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:16
    },
   // button:{
        //width: 100,
      //  width: buttonWidth
   // },
    summaryContainer: {
        marginVertical:20,
        alignItems:"center"
    }
});

export default StartScreen;