import React, { useEffect, useRef, useState } from 'react'

import { pokemnoApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';



export const usePokemonPaginated = () => {

        const [isloading, setIsloading] = useState(true)
    const [simplePokemonList, setsimplePokemonList] = useState<SimplePokemon[]>([])
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')
    
    const loadPokemons = async () => {
        setIsloading(true);
        const resp = await pokemnoApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = resp.data.next
        mapPokemonList(resp.data.results)

    }
    const mapPokemonList = (pokemonList: Result[]) => {

        const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {

            const urlParts = url.split('/')
            const id = urlParts[urlParts.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

            return { id, picture, name }
        });

        setsimplePokemonList([...simplePokemonList, ...newPokemonList])
        setIsloading(false)
    }

    useEffect(() => {
        loadPokemons();
    }
        , [])

    return {
        simplePokemonList,
        isloading,
        loadPokemons
    }
}
