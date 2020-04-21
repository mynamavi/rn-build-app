import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Colors from '../constants/colors.constant';

const Header = (props) =>{
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>

    )

}

const styles = StyleSheet.create({
    header: {
        width:'100%',
        height:90,
        paddingTop:40,
        backgroundColor:Colors.primary,
        alignItems:'center',
        justifyContent:'center'        
    },
    headerTitle: {
        fontSize:18,
        color:'black'
    }
});

export default Header;