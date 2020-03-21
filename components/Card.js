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
        flex: 1,
        width: 200,
        height: null,
        resizeMode: "contain"
    },

    shadow: {
        alignItems: "center",
        justifyContent: "center",
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