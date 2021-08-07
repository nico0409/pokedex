import React from 'react'
import { BottomTabBarHeightContext, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParams, StackNavigator } from './StackNavigator';

import { Platform } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';
import { TabSearch } from './TabSearch';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <Tab.Navigator

            sceneContainerStyle={{
                backgroundColor: 'white'

            }}
            screenOptions={{
                headerShown:false,
                tabBarLabelStyle: {
                    marginBottom: (Platform.OS === 'ios') ? 0 : 10,


                },
                tabBarActiveTintColor: '#5856D6',
                tabBarStyle: {
                  //position:'absolute',
                  backgroundColor:'rgba(255,255,255,0.7)',
                    borderWidth: 0,
                    elevation: 0,
                    height:(Platform.OS==='ios'?80:60)
                    
                }

            }}

        >
            <Tab.Screen
                name="StackNavigator"
                component={StackNavigator}
                options={{
                    tabBarLabel: 'List',
                 tabBarIcon:({color})=><Icon color={color} size={25} name='list-outline'/>
                }}
            />
            <Tab.Screen 
            name="SearchScreen" 
            component={TabSearch} 
            options={{
                tabBarLabel: 'Search',
             tabBarIcon:({color})=><Icon color={color} size={25} name='search-outline'/>
            }}
            />
        </Tab.Navigator>
    );
}