import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import InputSpinner from "react-native-input-spinner";
GLOBAL = require('./global');

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

    // gettting permission from the phone
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    // Image function for accesting to the phone photo library
    pickImage = async () => {
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

            
        } catch (E) {
            console.log(E);
        }
    };

    // setting the global value of number of cards
    chooseLevel = (num) => {
        GLOBAL.numOfCards = num;
    }

    // reset default background image
    resetImage = () => {
        GLOBAL.bgImg = require('./assets/bg.jpg');
        this.updateImage();
    }

    // update the newly changed the image
    updateImage = () => {
        this.setState({ bgImage: GLOBAL.bgImg });
    }

    render() {
        return (
            <ImageBackground source={this.state.bgImage} style={styles.backgroundImage}>
                <View style={styles.layout}>
                    <View style={styles.levelGroup}>
                        <View style={styles.levelLabel}>
                            <Text style={styles.levelText}>No. of Cards</Text>
                        </View>

                        <InputSpinner
                            max={24}
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

                            onChange={(num) => {
                                this.chooseLevel(num)
                            }}
                        />
                    </View>

                    <View style={styles.optionGroup}>
                        <TouchableOpacity style={styles.button} onPress={() => this.pickImage()}>
                            <Text style={styles.buttonText}>Choose Background Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.resetImage()}>
                            <Text style={styles.buttonText}>Reset Background Image</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.button} onPress={() => this.navigation.navigate('WelcomePage')}>
                            <Text style={styles.buttonText}>Back to Main Page</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    spinnerContainer: {
        margin: 10
    },
    optionGroup: {
        flex: 3,
        marginBottom: 50,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    levelLabel: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 50,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        borderRadius: 5,
    },
    levelText: {
        fontFamily: Platform.OS === "ios" ? "DINAlternate-Bold" : "Roboto",
        color: 'white',
        fontSize: 18
    },
    levelGroup: {
        marginTop: 60,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',

    },
    levelNum: {

        fontSize: 20,
        backgroundColor: 'red'
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
    buttonText: {
        fontFamily: Platform.OS === "ios" ? "DINAlternate-Bold" : "Roboto",
        fontSize: 18
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});