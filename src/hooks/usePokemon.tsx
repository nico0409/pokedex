import React,{useState,useEffect} from 'react'
import { PokemonFull } from '../interfaces/pokemonInterfaces'
import { pokemnoApi } from '../api/pokemonApi';



export const usePokemon = (id:string) => {
   

    const [isLoading, seTisLoading] = useState(true)
    const [pokemon, seTpokemon] = useState<PokemonFull>({} as PokemonFull)
    const [pokemonNext, seTpokemonNext] = useState<PokemonFull>({} as PokemonFull)
const idNumber=Number(id);
    const loadPpokemon=async()=>{
        const resp=await pokemnoApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const resp2=await pokemnoApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${(idNumber+1)}`)
        seTpokemon(resp.data);
        seTpokemonNext(resp2.data) 
        seTisLoading(false);
       
        
    }
    useEffect(() => {
        loadPpokemon();
    }, [id])

return{
    isLoading,
    pokemon,
    pokemonNext,
}


}
