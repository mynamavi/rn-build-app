import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Colors from '../constants/colors.constant';

const NumberContainer = (props) =>{
    return (
        <View style={styles.container}>
            <Text style={styles.inputStyle}>{props.children}</Text>
        </View>
   );
}

const styles = StyleSheet.create({
    container:{
        borderWidth:2,
        borderColor:Colors.border,
        padding:10,
        borderRadius:10,
        marginVertical:10,
        alignItems:"center",
        justifyContent:"center"
    },
    inputStyle:{
        color:Colors.accent,
        fontSize:22
    }
});

export default NumberContainer;