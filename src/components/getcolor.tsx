import {useEffect,useState } from 'react';
import ImageColors from 'react-native-image-colors';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';


interface props {
    pokemonPicture: string
    isMounted: React.MutableRefObject<boolean>
}

export const getcolor = ({pokemonPicture,isMounted}:props) => {
    const [bgColor, setbgColor] = useState<string | undefined>('grey')
    useEffect(() => {



        ImageColors.getColors(pokemonPicture, { fallback: 'grey' })
            .then(colors => {

                
                if (!isMounted.current) return;
                (colors.platform === 'android')
                    ? setbgColor(colors.dominant || 'grey')
                    : setbgColor(colors.background || 'grey')
            }



            )

        return () => { isMounted.current = false }

    }, [])
    return{
         bgColor
    }
}
