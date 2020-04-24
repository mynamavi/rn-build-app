import React from  'react';
import {StyleSheet, Text, View, 
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
    } from 'react-native';

import Colors from '../constants/colors.constant';

const MainButton = (props) =>{
    let ButtonComponent = TouchableOpacity;

    if(Platform.Version>=21){
        ButtonComponent = TouchableNativeFeedback
    }

    return(
        <View style={styles.buttonWrapper}>
            <ButtonComponent activeOpacity={0.7} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
        
    )
}
    


const styles= StyleSheet.create({
    buttonWrapper:{
        borderRadius:25,
        overflow:'hidden'        
    },
    button:{
        backgroundColor:Colors.primary,
        paddingVertical:12,
        paddingHorizontal:30,
        borderRadius:25
    },
    buttonText: {
        color:'white',
        fontFamily:'open-sans',
        fontSize:18
    }
});

export default MainButton;