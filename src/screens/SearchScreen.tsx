import React, { useState, useEffect } from 'react'
import { View, Platform, ActivityIndicator, Text, FlatList, Dimensions } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles as globalStyles } from '../theme/appTheme'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';




const ScreenWidt = Dimensions.get('window').width
export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList } = usePokemonSearch()
    const [pokemonFiltered, seTpokemonFiltered] = useState<SimplePokemon[]>([])
    const [term, setTerm] = useState('')




    useEffect(() => {
        if (term.length === 0) {
            return seTpokemonFiltered([])
        }
        if (isNaN(Number(term))) {
            seTpokemonFiltered(
                simplePokemonList.filter(
                    poke => poke.name.toLocaleLowerCase()
                        .includes(term.toLocaleLowerCase())
                )
            )
        }else{
            const pokemonById=simplePokemonList.find((poke)=>poke.id===term )
            seTpokemonFiltered(
              (pokemonById)?[pokemonById]:[]
            )
        }


    }, [term])


    if (isFetching) {
        return (
            <Loading />
        )
    }

    return (
        <View style={{
            flex: 1,

            marginHorizontal: 20

        }}>
            <SearchInput
                onDebounce={(value) => setTerm(value)}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: ScreenWidt - 40,
                    top: (Platform.OS === 'ios') ? top : top + 20


                }}
            />
            <FlatList

                numColumns={2}
                showsVerticalScrollIndicator={false}
                data={pokemonFiltered}
                keyExtractor={(pokemon) => pokemon.id}
                ListHeaderComponent={(<Text style={{
                    ...globalStyles.globalMargin,
                    ...globalStyles.title,

                    paddingBottom: 10,
                    marginTop: 70

                }}>{term}</Text>)}
                renderItem={({ item }) => <PokemonCard pokemon={item} />
                }
            />
        </View>
    )
}
