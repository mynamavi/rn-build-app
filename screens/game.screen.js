import React, {useState, useRef, useEffect} from 'react';
import  {StyleSheet, Dimensions, View, ScrollView, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import NumberContainer from '../components/number.component';
import Card from '../components/card.component';
import BoldText from '../components/boldText.component';
import MainButton from '../components/mainbutton.component';
import Colors from '../constants/colors.constant';


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
    const initialState = generateRandomNumber(1 , 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialState);    
    const [ pastGuess, setPastGuess] = useState([initialState]);
    const [ roundCount, setRoundCount] = useState(0);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver } =  props;

    useEffect( () => {
        const updateLayout = () =>{
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
    
        Dimensions.addEventListener('change', updateLayout);
        return() =>{
            Dimensions.removeEventListener('change', updateLayout);
        };
    })

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
            currentLow.current=currentGuess+1;
        }
        
        const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRoundCount(roundCount => roundCount+1);
        setPastGuess(curPastGuess=> [nextNumber, ...curPastGuess]);
    }
    
    const renderListItem = (value, numOfRound) =>(
        <View key={ value} style={styles.listItem}>
            <BoldText>#{numOfRound}</BoldText>
            <BoldText> {value}</BoldText>
        </View>
    );
    if(availableDeviceHeight<400){
        return(
            <View style={styles.screen}>
                <BoldText>Opponent's Guess</BoldText>
                
                <View style={styles.smallHeightContent}>
                    <View style={styles.smallHeightItem}>
                        <MainButton onPress= {nextGuessHandler.bind(this, 'lower')} >
                            <Ionicons color='white' name='md-remove' size={24} />
                        </MainButton>
                    </View>
                    <View style={styles.smallHeightItem}>
                        <NumberContainer>{currentGuess}</NumberContainer>
                    </View>
                    <View style={styles.smallHeightItem}>
                        <MainButton onPress= {nextGuessHandler.bind(this, 'greater')} >
                            <Ionicons color='white' name='md-add' size={24} />
                        </MainButton>
                    </View>
                </View>
                <View style={styles.list}>
                    <ScrollView contentContainerStyle={styles.listContent}>
                        {pastGuess.map((guess, index)=> renderListItem(guess, pastGuess.length - index))}
                    </ScrollView>
                </View>
            </View>
        );
    }
    
    return(
        <View style={styles.screen}>
            <BoldText>Opponent's Guess</BoldText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress= {nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons color='white' name='md-remove' size={24} />
                </MainButton>
                <MainButton onPress= {nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons color='white' name='md-add' size={24} />
                </MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView contentContainerStyle={styles.listContent}>
                    {pastGuess.map((guess, index)=> renderListItem(guess, pastGuess.length - index))}
                </ScrollView>
            </View>
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
        marginTop:Dimensions.get('window').height>600 ? 30:6,
        width:300,
        maxWidth:'80%'
    },
    smallHeightContent:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    smallHeightItem:{
        marginHorizontal:10
    },
    list:{
        width:Dimensions.get('window').width>480 ? '70%': '80%',
        flex:1
    },
    listContent:{
        flexGrow:1,
        //alignItems:'center',
        justifyContent:'flex-end'
    },
    listItem: {
        flexDirection:"row",
        borderColor: Colors.border,
        borderWidth:1,
        padding:14,
        marginVertical:10,
        backgroundColor:'white',
        justifyContent:'space-around'
    }

});

export default GameScreen;