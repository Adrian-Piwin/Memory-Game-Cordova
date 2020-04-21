import React, {  Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import 'react-native-gesture-handler';
import CardList from './CardList';
GLOBAL = require('./global');

export default class GamePage extends Component {


    constructor(props) {
        super();
        this.navigation = props.navigation;
        this.state = {

            cardsArray: [],
            cardsFlipped: [],
            cardChosenOne: -1,
            cardChosenOnePos: 0,
            failedAttempts: 0,
            matchCount: 0,
            canInteract: true,
            image: null,
            numOfCards: GLOBAL.numOfCards
        }
    }

    componentDidMount() {
        // create 2 list of randomly generated arrays, merge them together and shuffle them at the end
        var arr = [];
        // length < number of half number of the cards(card IDs),  will combine another half number of the same cards 
        while (arr.length < this.state.numOfCards / 2) {
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
            cardChosenOne: -1,
            cardChosenOnePos: 0,
            failedAttempts: 0,
            matchCount: 0,
            cardsArray: mergedArr,
            cardsFlipped: Array.apply(null, new Array(this.state.numOfCards)).map(Number.prototype.valueOf, 1)
        })

        setTimeout(() => {
            this.startGame();
        }, 2000);


    }



    // Start Game
    startGame = () => {
        this.setState({
            cardsFlipped: Array.apply(null, new Array(this.state.numOfCards)).map(Number.prototype.valueOf, 0)
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
        if (this.state.canInteract) {
            // Update card
            var arr = this.state.cardsFlipped.slice();
            if (arr[pos] == 0) {
                arr[pos] = 1;

                // Check for match
                var firstChosenCard = this.state.cardChosenOne;
                var currentCard = this.state.cardsArray[pos];

                // If there is no first chosen card, make this it
                if (firstChosenCard == -1) {
                    this.setState({ cardChosenOne: currentCard, cardChosenOnePos: pos, cardsFlipped: arr });
                } else {
                    this.setState({ cardsFlipped: arr });
                    // Match
                    if (firstChosenCard == currentCard) {
                        this.setState({ matchCount: this.state.matchCount + 1 });
                        this.checkForWinner();
                    } else { // No Match
                        this.setState({ canInteract: false });
                        setTimeout(() => {
                            this.noMatch(this.state.cardChosenOnePos, pos);
                        }, 1000);
                    }

                    this.setState({ cardChosenOne: -1 })
                }
            }
        }
    }

    // function when all the cards on the screen are matched
    checkForWinner = () => {
        if (this.state.matchCount >= this.state.numOfCards / 2 - 1) {
            Alert.alert(
                "Congradulations!",
                "You Win!");
        }
    }

    // If two selected cards don't match, after 1 second, flip them back
    noMatch = (firstCard, secondCard) => {
        var arr = this.state.cardsFlipped.slice();
        arr[firstCard] = 0;
        arr[secondCard] = 0;
        this.setState({ cardsFlipped: arr, failedAttempts: this.state.failedAttempts + 1, canInteract: true });
    }

    // Render back or front of card depending on flipped array
    renderCards = (pos) => {

        var isFlipped = this.state.cardsFlipped[pos];

        var cardValue = this.state.cardsArray[pos];

        switch (isFlipped) {
            case 0: return <Image style={styles.image} source={CardList[52].imageSource} />;
            case 1: return <Image style={styles.image} source={CardList[cardValue].imageSource} />;
            default: return <View />
        }
    }

    // function of quit button when pressed
    backAction = () => {
        // display the message in a alert dialogue
        Alert.alert("Warning", "Progress will be lost, are you sure you want to quit?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => this.navigation.navigate('WelcomePage') }
        ]);
        return true;
    };

    // render of the main game page
    render() {
        

        const listCards = this.state.cardsArray.map((number, index) => <TouchableOpacity key={index} style={styles.shadow} onPress={() => this.toggleImage(index)}>{this.renderCards(index)}</TouchableOpacity>);
        return (

            <ImageBackground source={GLOBAL.bgImg} style={styles.backgroundImage}>

                <View style={styles.leftField} >
                    <TouchableOpacity style={styles.quitButton} onPress={() => this.backAction()}>
                        <Text style={styles.buttonText}>QUIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonReset} onPress={() => this.componentDidMount()}>
                        <Text style={styles.buttonText}>RESET</Text>
                    </TouchableOpacity>

                    <View>

                        <Text style={styles.numAttempt}>Failed Attempts: {this.state.failedAttempts}</Text>
                        <Text style={styles.numAttempt}>Matched Count: {this.state.matchCount}</Text>
                    </View>

                </View>

                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        {listCards}
                    </View>

                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImageButton: {
        alignItems: 'center',
        width: 300,
        marginRight: 40,
        marginLeft: 10,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(52, 52, 52, 0.5)'
    },
    buttonText: {
        fontSize: 25,
        color: 'black',
        fontFamily: Platform.OS === "ios" ? "DINAlternate-Bold" : "Roboto",
    },

    numAttempt: {
        opacity: 0.8,
        padding: 5,
        fontSize: 20,
        margin: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        color: 'white',
        fontFamily: Platform.OS === "ios" ? "DINAlternate-Bold" : "Roboto",
    },
    leftField: {
        flex: 0.4,
        justifyContent: 'space-around',
        marginLeft: 25
    },

    backgroundImage: {
        flex: 1,
        flexDirection: 'row',
        resizeMode: 'cover'
    },
    container: {
        flex: 1,
    },
    innerContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },

    image: {
        width: 60,
        height: 90,
        resizeMode: "contain"
    },
    quitButton: {
        margin: 10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#ED297C',
        elevation: 2, // Android
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 15
    },
    buttonReset: {
        margin: 10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 2, // Android
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 60
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


