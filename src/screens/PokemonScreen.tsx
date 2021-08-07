import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../Navigation/StackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color } from 'react-native-reanimated';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';






interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };


export const PokemonScreen = ({ navigation, route }: Props) => {
    const { simplePokemon, color } = route.params
    const { top } = useSafeAreaInsets()
    const { isLoading, pokemon,pokemonNext } = usePokemon(simplePokemon.id)
    
  
     
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color,

            }}>
                <TouchableOpacity style={{
                    ...styles.backButton,
                    top: top + 5
                }}
                    onPress={() => { navigation.pop() }}
                >

                    <Icon
                        name="arrow-back-outline"
                        color="white"
                        size={35}
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        ...styles.pokemonName,
                        top: top + 40
                    }}
                >
                    {simplePokemon.name + '\n'}#{simplePokemon.id}
                </Text>
                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={styles.pokeball}
                />
                <FadeInImage
                    uri={simplePokemon.picture}
                    style={styles.pokemonImage}
                />
            </View>

            {isLoading === true ?
                <View style={styles.activityIndicator}>
                    <ActivityIndicator
                        color={color}
                        size={50}
                    />
                </View> :
                <>
                    <PokemonDetails pokemon={pokemon} color={color} pokemonNext={pokemonNext} />
                   
                </>
            }

        </View>


    )
}
const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000

    },
    backButton: {
        position: 'absolute',
        left: 20
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -20

    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }


});