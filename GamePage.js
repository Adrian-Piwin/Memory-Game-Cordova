import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, PanResponder, Animated, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import CardList from './CardList'
import { ScreenOrientation } from 'expo';


export default class GamePage extends Component {


    constructor() {
        super();
        this.state = {
            cardsArray: [],
            cardsFlipped: [],
            cardChosenOne: -1,
            cardChosenOnePos: 0
        }
    }

    componentDidMount() {

        // create 2 list of randomly generated arrays, merge them together and shuffle them at the end
        var arr = [];
        // length < number of half number of the cards(card IDs),  will combine another half number of the same cards 
        while (arr.length < 8) {
            // 52 will be the maximum range of the cards, index starts at 0
            var r = Math.floor(Math.random() * 51);
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        // 2nd copy of generated cards' ID
        var randoms2 = arr;
        // combine them
        var mergedArr = arr.concat(randoms2);
        // shuffle the combined cards
        this.shuffle(mergedArr);

        this.setState({
            cardsArray: mergedArr,
            cardsFlipped: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        })
    }

    // Shuffle function
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // Update flipped array when card is pressed
    toggleImage = (pos) => {
        // Update card
        var arr = this.state.cardsFlipped.slice();
        if (arr[pos] == 0){
            arr[pos] = 1;
        
            // Check for match
            var firstChosenCard = this.state.cardChosenOne;
            var currentCard = this.state.cardsArray[pos];

            // If there is no first chosen card, make this it
            if (firstChosenCard == -1){
                this.setState({cardChosenOne: currentCard, cardChosenOnePos: pos, cardsFlipped: arr});
            }else{
                this.setState({cardsFlipped: arr});
                // Match
                if (firstChosenCard == currentCard){
                    this.checkForWinner();
                }else{ // No Match
                    setTimeout(() => {
                        this.noMatch(this.state.cardChosenOnePos,pos);
                    }, 1000);  
                }

                this.setState({cardChosenOne: -1})
            }
        }
    }

    checkForWinner = () => {

    }

    // If two selected cards don't match, after 1 second, flip them back
    noMatch = (firstCard, secondCard) => {
        var arr = this.state.cardsFlipped.slice();
        arr[firstCard] = 0;
        arr[secondCard] = 0;
        this.setState({cardsFlipped: arr});
    }

    // Render back or front of card depending on flipped array
    renderCards = (pos) => {
        var isFlipped = this.state.cardsFlipped[pos];

        var cardValue = this.state.cardsArray[pos];

        switch(isFlipped)
        {
            case 0: return <Image style={styles.image} source={CardList[52].imageSource} />;
            case 1: return <Image style={styles.image} source={CardList[cardValue].imageSource} />;
            default: return <View />
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.toggleImage(0)}>
                    {this.renderCards(0)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(1)}>
                    {this.renderCards(1)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(2)}>
                    {this.renderCards(2)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(3)}>
                    {this.renderCards(3)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(4)}>
                    {this.renderCards(4)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(5)}>
                    {this.renderCards(5)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(6)}>
                    {this.renderCards(6)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(7)}>
                    {this.renderCards(7)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(8)}>
                    {this.renderCards(8)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(9)}>
                    {this.renderCards(9)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(10)}>
                    {this.renderCards(10)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(11)}>
                    {this.renderCards(11)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(12)}>
                    {this.renderCards(12)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(13)}>
                    {this.renderCards(13)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(14)}>
                    {this.renderCards(14)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleImage(15)}>
                    {this.renderCards(15)}
                </TouchableOpacity>
    
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

    image: {
        width: 80,
        height: 120,

        resizeMode: "contain"
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
    },

    flipCard: {
        backfaceVisibility: 'hidden'
    },

    flipCardBack: {
        position: 'absolute',
        top: 0
    }
});


