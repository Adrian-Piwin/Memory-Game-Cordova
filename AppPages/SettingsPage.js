import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import InputSpinner from "react-native-input-spinner";
GLOBAL = require('../global');

export default class SettingsPage extends Component {
    constructor(props) {
        super();
        this.navigation = props.navigation;
        this.state = {
            image: null,
            bgImage: GLOBAL.bgImg,
            number: GLOBAL.numOfCards
        }
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                let img1 = { uri: result.uri }

                GLOBAL.bgImg = img1;
                this.updateImage();
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    chooseLevel = (num) =>{
        GLOBAL.numOfCards = num;
    }

    resetImage = () => {
        GLOBAL.bgImg = require('./assets/bg.jpg');
        this.updateImage();
    }

    updateImage = () => {
        this.setState({ bgImage: GLOBAL.bgImg });
    }

    render() {
        return (
            <ImageBackground source={this.state.bgImage} style={styles.backgroundImage}>
                <View style={styles.layout}>
                    <InputSpinner
                        max={28}
                        min={4}
                        step={2}
                        style={styles.spinnerContainer}
                        colorMax={"#f04048"}
                        colorMin={"#40c5f4"}
                        value={this.state.number}
                        textColor={"white"}
                        colorLeft={"white"}
                        colorRight={"white"}
                        buttonTextColor={"black"}
                        inputStyle={styles.levelNum}
                        rounded={false}
                        showBorder={true}
                        
                        onChange={(num) => {this.chooseLevel(num)
                        }}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => this._pickImage()}>
                        <Text style={styles.buttonText}>Choose Background Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.resetImage()}>
                        <Text style={styles.buttonText}>Reset Background Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.navigation.navigate('WelcomePage')}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    spinnerContainer:{
        margin: 10
    },
    levelNum:{
        
        fontSize: 20,
        backgroundColor:'red'
    },
    backgroundImage: {
        flex: 1,
        flexDirection: 'row',
        resizeMode: 'cover', // or 'stretch'
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
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 15
    },
    buttonText:{
        fontFamily: Platform.OS === "ios" ? "DINAlternate-Bold" : "Roboto",
        fontSize: 18
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});