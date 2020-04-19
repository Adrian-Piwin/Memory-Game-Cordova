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

    // shuffle function
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }



    componentDidMount() {

        // create 2 list of randomly generated arrays, merge them together and shuffle them at the end
        var arr = [];
        // length < number of half number of the cards(card IDs),  will combine another half number of the same cards 
        while (arr.length < 9) {
            // 52 will be the maximum range of the cards, index starts at 0
            var r = Math.floor(Math.random() * 52) + 1;
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        // 2nd copy of generated cards' ID
        var randoms2 = arr;
        // combine them
        var mergedArr = arr.concat(randoms2);
        // shuffle the combined cards
        this.shuffle(mergedArr);
        this.setState({


            array: mergedArr

        })
    }



    render() {
        // number will be the array items, in this case, the card id(not the index, since card ID starts at 1)
        // index in this case will be the index of 'listCards', it starts at 0. it will be used to assign the uniqe id for each card
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


