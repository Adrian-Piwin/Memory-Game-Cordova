import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, PanResponder, Animated, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import CardList from './CardList'
import Card from './components/Card'
import { ScreenOrientation } from 'expo';


export default class GamePage extends Component {


    constructor() {
        super();
        this.state = {

            randomNum: 9,
            array: [],
        }
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }



    componentDidMount() {

        
        var arr = [];
        while (arr.length < 9) {
            var r = Math.floor(Math.random() * 52) + 1;
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        var randoms2 = arr;
        var mergedArr = arr.concat(randoms2);
        this.shuffle(mergedArr);
        this.setState({


            array: mergedArr

        })
    }



    render() {

        const listCards = this.state.array.map((number, index) => <Card key={index} cardPos={number} />);
        return (

            <View style={styles.container}>
                {listCards}
            </View>


        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap'

    },
    row: {


    },
    column: {

        flexDirection: 'column'
    }

});


