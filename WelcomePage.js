import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, Button } from 'react-native';
import GamePage from './GamePage';

function WelcomePage({ navigation }) {
    return (

        <View style={styles.layout}>
            <Text style={styles.title}>Temporary Card Game Title and Buttons</Text>
            <TouchableOpacity onPress={() => navigation.navigate('GamePage')} style={[styles.button]}>
                <Text>NEW GAME</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button]}>
                <Text>CONTINUE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button]}>
                <Text>SETTING</Text>
            </TouchableOpacity>
        </View>


    )
}

const styles = StyleSheet.create({

    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: 30,
        margin: 30
    },

    button: {
        margin:10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 2, // Android
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 15
    }
});


export default WelcomePage;