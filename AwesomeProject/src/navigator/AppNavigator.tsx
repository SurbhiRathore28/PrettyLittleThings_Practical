import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductListing from '../screens/ProductListing/ProductListing'
import Cart from '../screens/Cart/Cart'
import { SplashScreen } from '../screens/SplashScreen/SplashScreen'

export const AppNavigator = () => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator
        initialRouteName='SplashScreen'
        >
            <Stack.Screen options={{headerShown: false}} name='SplashScreen' component={SplashScreen}/>
            <Stack.Screen options={{headerShown: false}}  name='ProductListing' component={ProductListing}/>
            <Stack.Screen name='Cart' component={Cart}/>            
        </Stack.Navigator>
    )
}
