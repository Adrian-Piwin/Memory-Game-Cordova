import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ImageBackground } from 'react-native';
GLOBAL = require('./global');

export default class WelcomePage extends Component {
    constructor(props) {
        super(props);

        this.navigation = props.navigation;

        this.state = {
            bgImage: require('./assets/bg2.jpg')
        }
    }

    render() {
        return (
            <ImageBackground source={this.state.bgImage} style={styles.backgroundImage}>
                <View style={styles.layout}>
                    <Text style={styles.title}>Memory Card Game</Text>
                    <TouchableOpacity onPress={() => this.navigation.navigate('GamePage')} style={[styles.button]}>
                        <Text>NEW GAME</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.navigation.navigate('SettingsPage')} style={[styles.button]}>
                        <Text>SETTINGS</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
    
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        flexDirection: 'row',
        resizeMode: 'cover', // or 'stretch'
    },

    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: 40,
        margin: 30,
        color: 'white',
        fontWeight: 'bold'
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