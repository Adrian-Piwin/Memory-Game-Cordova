import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, PanResponder, Animated } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import CardList from './CardList'
import Card from './components/Card'
import { ScreenOrientation } from 'expo';


export default class GamePage extends Component {

    pan = new Animated.ValueXY();
    panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
        this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value
        });
    },
    onPanResponderMove: Animated.event([
        null,
        { dx: this.pan.x, dy: this.pan.y }
    ]),
    onPanResponderRelease: () => {
        this.pan.flattenOffset();
    }
    });

    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                style={{
                    transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
                }}
                {...this.panResponder.panHandlers}
                >
                    <Card />
                </Animated.View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
