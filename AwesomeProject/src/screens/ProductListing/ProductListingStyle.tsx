import { Dimensions, StyleSheet } from "react-native";

export const Style = StyleSheet.create({
    productItemContainerStyle : {
        padding: 10, 
        width: '50%', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        gap: 10
    }, 
    productImageContainre: {
        gap: 10
    },
    productImageStyle: {
        width: Dimensions.get('window').width/2,
        height: Dimensions.get('window').height/3
    },
    productDescriptionStyle: {
        flexWrap: 'wrap', marginHorizontal: 10
    },
    addToCartStyle: {
        height: 40, 
        width: '100%', 
        backgroundColor: '#edb3eb', 
        borderRadius: 5, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    cartViewStyle: {
        borderRadius:40,
        position: 'absolute', 
        bottom: 50, 
        right: 10, 
        height: 80, 
        width: 80, 
        backgroundColor: '#aabbcc', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    cartItemCountViewStyle: {
        position:'absolute', 
        right: 15, 
        bottom: 110, 
        height: 30, 
        width: 30, 
        borderRadius: 15,
        overflow: 'hidden'
    },
    cartItemCountTxtStyle: {                    
        fontSize: 20, 
        color: 'white', 
        backgroundColor: '#cb4154',                     
        textAlign: 'center', 
        lineHeight: 30,
    },
    activityIndicatorStyle: {        
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#aabbcc',
        opacity: 0.5
    },
    listingStyle: {
        padding: 10
    },
    containerStyle: {
        flex:1
    }
})