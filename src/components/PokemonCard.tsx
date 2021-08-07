import React, { useState, useEffect, useRef } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Image, Button } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import ImageColors from 'react-native-image-colors'

import { useNavigation } from '@react-navigation/native';
import { getcolor } from './getcolor';



const windowWhidth = Dimensions.get('window').width

interface props {
    pokemon: SimplePokemon
}

export const PokemonCard = ({ pokemon }: props) => {

  
    const isMounted = useRef(true)
    const  navigation=useNavigation();
  
  
    const {bgColor}=getcolor({pokemonPicture:pokemon.picture ,isMounted})
    return (
        <TouchableOpacity
        
            activeOpacity={0.9}
            onPress={
                () => navigation.navigate('PokemonScreen' as never, { 
                    simplePokemon: pokemon,
                    color: bgColor
                }as never)
            }
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWhidth * 0.4,
                backgroundColor: bgColor

            }}>
                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokebolaContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>
                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />
            </View>


        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    cardContainer: {

        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10

    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25


    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -10,
        bottom: -5

    },
    pokebolaContainer: {


        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
});