import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

import Colors from '../constants/colors.constant';

const Input = (props) => {
    return(
        <TextInput {...props} style={{...styles.input, ...props.style}} />
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth:1,
        borderBottomColor: Colors.border,        
        marginVertical:16,
        height:30
    }
});

export default Input;