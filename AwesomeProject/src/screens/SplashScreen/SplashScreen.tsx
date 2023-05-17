import React, { useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from "react-native"
import { DASHBOARD_IMAGE } from "../../assets"
import { Style } from "./SplashScreenStyle"

export const SplashScreen = (props: any) => {

    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('ProductListing')
        }, 2000);
    },[])

    return (
        <SafeAreaView style={Style.containerStyle}>
            <Image style={Style.imageStyle} source={DASHBOARD_IMAGE}/>
        </SafeAreaView>
    )
}