import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, View, Text, 
    Dimensions, ScrollView } from 'react-native';

import TitleText from '../components/titleText.component';
import BoldText from '../components/boldText.component';
import Colors from '../constants/colors.constant';
import MainButton from '../components/mainbutton.component';

const GameOverScreen = (props) => {
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

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
    return(
        
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>GAME OVER!</TitleText>
                <View style={{ ...styles.imageContainer,  ...{
                    width: availableDeviceWidth * 0.7,
                    height: availableDeviceWidth * 0.7,
                    borderRadius: (availableDeviceWidth * 0.7) / 2,
                    marginVertical: availableDeviceHeight / 30
                    }}}>
                    <Image 
                        source={require('../assets/success.png')} 
                        style={styles.image}
                        resizeMode='cover'
                        />
                </View>
                <View style={{ ...styles.textContainer, 
                    ...{marginVertical: availableDeviceHeight / 60}}}>
                    <BoldText style={{textAlign:"center",
                            fontSize: availableDeviceHeight < 400 ? 16 : 20
                            }}>
                        Your phone taken : <Text style={styles.hightlight}> {props.roundCount}</Text> 
                        rounds to guess your Number  <Text style={styles.hightlight}> {props.userNumber}</Text>.                        
                    </BoldText>
                </View>
                <MainButton onPress={props.onRestart} color={Colors.primary} >
                Restart Game
                </MainButton>
            </View>
        </ScrollView>
    
    )   
}

const styles= StyleSheet.create({
    screen: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10,
        marginVertical:10
    },
    imageContainer: {       
        borderWidth:3,
        borderColor:Colors.border,
        overflow:'hidden',
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
    
});

export default GameOverScreen;