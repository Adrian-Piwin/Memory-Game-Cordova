import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ImageBackground } from 'react-native';
GLOBAL = require('../global');

export default class WelcomePage extends Component {
    constructor(props) {
        super(props);

        this.navigation = props.navigation;

        this.state = {
            bgImage: require('../assets/bg2.jpg')
        }
    }

    render() {
        return (
            <ImageBackground source={this.state.bgImage} style={styles.backgroundImage}>
                <View style={styles.layout}>
                    <View style={styles.mainTitle}>
                        <Text style={styles.title}>Memory </Text>
                        <Text style={styles.title2}>Card</Text>
                        <Text style={styles.title}>Game</Text>
                    </View>
                    <View style={styles.selectionArea}>
                        <TouchableOpacity onPress={() => this.navigation.navigate('GamePage')} style={[styles.button]}>
                            <Text style={styles.buttonText}>NEW GAME</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.navigation.navigate('SettingsPage')} style={[styles.button]}>
                            <Text style={styles.buttonText}>SETTINGS</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    selectionArea:{
        flex: 1
    },
    mainTitle: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
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
        fontFamily: Platform.OS === "ios" ? "DINAlternate-Bold" : "Roboto",
        fontSize: 40,
        borderWidth: 1,
        padding: 5,
        borderColor: 'white',
        backgroundColor: 'black',
        color: 'white',
        fontWeight: 'bold'
    },
    title2:{
        fontFamily: Platform.OS === "ios" ? "DINAlternate-Bold" : "Roboto",
        fontSize: 40,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 5,
        borderColor: 'white',
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 'bold'
    },

    button: {
        margin: 10,
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
    },
    buttonText:{
        fontSize: 16,
        fontFamily: Platform.OS === "ios" ? "DINAlternate-Bold" : "Roboto",
    }
});