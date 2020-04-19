import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, PanResponder, Animated, TouchableOpacity, Alert } from 'react-native';
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
            cardChosenOnePos: 0,
            failedAttempts: 0,
            matchCount: 0,
            canInteract: true
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
            cardsFlipped: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        })

        setTimeout(() => {
            this.startGame();
        }, 1500);  
    }

    // Start Game
    startGame = () => {
        this.setState({
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
        if (this.state.canInteract){
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
                        this.setState({matchCount: this.state.matchCount + 1});
                        this.checkForWinner();
                    }else{ // No Match
                        this.setState({canInteract: false});
                        setTimeout(() => {
                            this.noMatch(this.state.cardChosenOnePos,pos);
                        }, 1000);  
                    }

                    this.setState({cardChosenOne: -1})
                }
            }
          
        }
        
    }

    checkForWinner = () => {
        if (this.state.matchCount >= 7){
            Alert.alert(
                "Congradulations!",
                "You win!\nYou didn't match a pair " + this.state.failedAttempts + " times");
        }
    }

    // If two selected cards don't match, after 1 second, flip them back
    noMatch = (firstCard, secondCard) => {
        var arr = this.state.cardsFlipped.slice();
        arr[firstCard] = 0;
        arr[secondCard] = 0;
        this.setState({cardsFlipped: arr, failedAttempts: this.state.failedAttempts + 1, canInteract: true});
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

        const listCards = this.state.cardsArray.map((number, index) => <TouchableOpacity key={index} style={styles.shadow} onPress={() => this.toggleImage(index)}>{this.renderCards(index)}</TouchableOpacity>);
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
        marginTop: 5,
        marginRight: 5
    }
});


