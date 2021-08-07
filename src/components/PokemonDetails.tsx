import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react'
import { ScrollViewProps, TouchableOpacity, Image } from 'react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { getcolor } from './getcolor';
import { usePokemon } from '../hooks/usePokemon';
import ImageColors from 'react-native-image-colors';





interface Props {
    pokemon: PokemonFull
    pokemonNext: PokemonFull
    color: string
}

export const PokemonDetails = ({ pokemon, pokemonNext }: Props) => {
    const navigator = useNavigation();
    const isMounted = useRef(true)
    const [nbrId, setnbrId] = useState(pokemonNext.id)


    const [url, seturl] = useState(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${nbrId}.png`)

    const [bgColor, setbgColor] = useState<string | undefined>('grey')

    useEffect(() => {
        setnbrId(nbrId + 1)
        seturl(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${(nbrId)}.png`)

    }, [pokemon.id])

    useEffect(() => {


        ImageColors.getColors(url, { fallback: 'grey' })
            .then(colors => {




                (colors.platform === 'android')
                    ? setbgColor(colors.dominant || 'grey')
                    : setbgColor(colors.background || 'grey')
            }



            )

        return () => { isMounted.current = false }


    }, [url])



    const ref = React.useRef<ScrollView>(null);


    return (
        <ScrollView
            ref={ref}
            showsVerticalScrollIndicator={false}

            style={{
                ...StyleSheet.absoluteFillObject,
            }}
        >
            <View style={{
                ...styles.container,
                marginTop: 390,
            }}>
                <Text style={styles.title}>Types</Text>
                <View style={{ flexDirection: 'row' }}>
                    {pokemon.types.map(({ type }) => (
                        <Text
                            style={{
                                ...styles.typeText,
                                marginRight: 10

                            }}
                            key={type.name}
                        >
                            {type.name}
                        </Text>

                    ))}
                </View>
                <Text style={styles.title}>Peso</Text>
                <Text style={styles.typeText}>{pokemon.weight}lbs</Text>
                <View style={{
                    ...styles.container,

                }}>
                    <Text style={styles.title}>Sprites</Text>
                </View>
                <ScrollView
                    style={{}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FadeInImage
                        uri={pokemon.sprites.front_default}
                        style={styles.basicSprite}
                    />
                    <FadeInImage
                        uri={pokemon.sprites.back_default}
                        style={styles.basicSprite}
                    />
                    <FadeInImage
                        uri={pokemon.sprites.back_shiny}
                        style={styles.basicSprite}
                    />
                    <FadeInImage
                        uri={pokemon.sprites.front_shiny}
                        style={styles.basicSprite}
                    />
                </ScrollView>
                <View style={{
                    ...styles.container,

                }}>
                    <Text style={styles.title}>Skills</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {pokemon.abilities.map(({ ability }) => (
                            <Text
                                style={{
                                    ...styles.typeText,
                                    marginRight: 10

                                }}
                                key={ability.name}
                            >
                                {ability.name}
                            </Text>

                        ))}
                    </View>
                </View>

                <View style={{
                    ...styles.container,

                }}>
                    <Text style={styles.title}>Moves</Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                        {pokemon.moves.map(({ move }) => (
                            <Text
                                style={{
                                    ...styles.typeText,
                                    marginRight: 10

                                }}
                                key={move.name}
                            >
                                {move.name}
                            </Text>

                        ))}
                    </View>
                </View>

                <View style={{
                    ...styles.container,

                }}>
                    <Text style={styles.title}>Stats</Text>
                    <View >
                        {pokemon.stats.map((stat, i) => (
                            <View
                                style={{ flexDirection: 'row' }}
                                key={stat.stat.name + i}
                            >
                                <Text
                                    style={{
                                        ...styles.typeText,
                                        marginRight: 10,
                                        width: 150


                                    }}

                                >
                                    {stat.stat.name}
                                </Text>
                                <Text
                                    style={{
                                        ...styles.typeText,
                                        fontWeight: 'bold',


                                    }}

                                >
                                    {stat.base_stat}
                                </Text>
                            </View>

                        ))}
                    </View>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    navigator.navigate('PokemonScreen' as never, {
                        simplePokemon: { id: pokemonNext.id, name: pokemonNext.name, picture: url },
                        color: bgColor
                    } as never), ref.current?.scrollTo({ x: 0, y: 0, animated: true });
                }}
            >
                <View style={{ alignItems: 'center' }}>
                    <View style={{
                        height: 80,
                        width: 120,
                        backgroundColor: bgColor,
                        borderTopLeftRadius: 1000,
                        borderTopRightRadius: 1000,
                        marginTop: 30,
                        alignItems: 'center',
                        justifyContent: 'center'


                    }}>
                        <View style={styles.pokebolaContainer}>
                            <Image
                                source={require('../assets/pokebola-blanca.png')}
                                style={styles.pokebola}
                            />
                        </View>
                        <FadeInImage
                            uri={url}
                            style={styles.basicSprite}
                        />
                    </View>
                </View>
            </TouchableOpacity>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20
    }, typeText: {
        fontSize: 19
    }, basicSprite: {
        width: 100,
        height: 100,
        paddingBottom: 20
    }, pokebolaContainer: {


        width: 100,
        height: 1000,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }, pokebola: {
        width: 80,
        height: 80,
        position: 'absolute',
        right: 25,
        bottom: 5


    },
});