import { NavigationContainer } from '@react-navigation/native';
import React from 'react'

import { StackNavigator } from './src/Navigation/StackNavigator';
import { Tabs } from './src/Navigation/TabsNavigator';


export const App = () => {
  return (
    <>
      <NavigationContainer>
        <Tabs/>
      </NavigationContainer>
    </>
  )
}


export default App;
