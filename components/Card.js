import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import CardList from '../CardList';


class Card extends React.Component {
    state = {
        open: true
    }

    toggleImage = () => {
        this.setState(state => ({ open: !state.open }))
    }

    render(){
        if (this.state.open){
            return (
                <View style={styles.shadow}>
                    <TouchableOpacity onPress={this.toggleImage}> 
                        <Image style={styles.image} source={CardList[this.props.cardPos].imageSource} onPress={this.toggleImage}/>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return (
                <View style={styles.shadow}>
                    <TouchableOpacity onPress={this.toggleImage}> 
                        <Image style={styles.image} source={CardList[52].imageSource} onPress={this.toggleImage}/>
                    </TouchableOpacity>
                </View>
            )
        }  
    };
}

const styles = StyleSheet.create({
    image: {
        width: 70,
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
    }
});

export default Card;