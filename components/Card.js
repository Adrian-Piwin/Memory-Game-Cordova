import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import CardList from '../CardList';


const Card = proprs => {
    return (
        <View style={styles.shadow}>
            <Image style={styles.image} source={CardList[0].imageSource} />
        </View>
    )
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