import React from 'react';
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity } from 'react-native';
import CardList from '../CardList';


class Card extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: true

        }
    }

    componentDidMount() {

        this.setState({
            isLoading: false
        })
    }




    state = {
        open: true
    }

    toggleImage = () => {
        this.setState(state => ({ open: !state.open }))
    }

    render() {
        if (this.state.open) {
            return (
                <View>
                    <TouchableOpacity onPress={this.toggleImage}>
                        <Image style={styles.image} source={CardList[this.props.cardPos].imageSource} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={this.toggleImage}>
                        <Image style={styles.image} source={CardList[52].imageSource} onPress={this.toggleImage} />
                    </TouchableOpacity>
                </View>
            )
        }



    }

}

const styles = StyleSheet.create({

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

export default Card;