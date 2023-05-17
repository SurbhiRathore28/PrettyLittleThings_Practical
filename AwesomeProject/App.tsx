import React from "react"
import { AppNavigator } from "./src/navigator/AppNavigator"
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from "react-redux"
import { store } from "./src/store/store"
import { SafeAreaProvider } from "react-native-safe-area-context"

const App = () => {  

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default () => (
  <Provider store={store}>
    <App/>
  </Provider>  
)