import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native'
import { styles } from '../theme/appTheme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { FlatList } from 'react-native-gesture-handler';
import { PokemonCard } from '../components/PokemonCard';




export const HomeScreen = () => {

    const { simplePokemonList, loadPokemons } = usePokemonPaginated();
    const { top } = useSafeAreaInsets();
    const { navigate } = useNavigation()
    
    return (
        <SafeAreaView>
            <View>
                <Image
                    source={require('../assets/pokebola.png')}
                    style={styles.pokebolaBG}
                />
                <View style={{ alignItems: 'center' }}>
                    <FlatList
                        
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        data={simplePokemonList}
                        keyExtractor={(pokemon) => pokemon.id}
                        renderItem={({ item }) => <PokemonCard pokemon={item} />
                        }
                        //infinitescroll
                        onEndReached={loadPokemons}
                        onEndReachedThreshold={0.4}
                        ListHeaderComponent={(<Text style={{
                            ...styles.globalMargin,
                            ...styles.title,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom:10
                        }}>Pokedex</Text>)}
                        ListFooterComponent={<ActivityIndicator
                            style={{
                                height: 100,

                            }}
                            size={30}
                            color='green'
                        />}

                    />
                </View>
            </View>
        </SafeAreaView>

    )
}


