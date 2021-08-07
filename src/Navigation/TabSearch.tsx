import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParams } from './StackNavigator';
import { SearchScreen } from '../screens/SearchScreen';
import { PokemonScreen } from '../screens/PokemonScreen';

const tabSearch = createStackNavigator<RootStackParams>();

export const  TabSearch=()=> {
  return (
    <tabSearch.Navigator
    screenOptions={{
        headerShown:false,
        cardStyle:{
            backgroundColor:'white'
        }
    }}
    >
      <tabSearch.Screen name="HomeScreen" component={SearchScreen} />
      <tabSearch.Screen name="PokemonScreen" component={PokemonScreen} />
     
    </tabSearch.Navigator>
  );
}