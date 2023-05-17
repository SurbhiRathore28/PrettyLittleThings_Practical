
import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({
    containerStyle : {
        padding: 16, 
        flex:1
    }, 
    itemSeparatorStyle: {
        height: 1, 
        width: '100%', 
        backgroundColor: '#aabbcc'
    },
    orderPlaceBtnStyle: {
        bottom: 40, 
        alignSelf:'center', 
        position:'absolute', 
        height: 40, 
        width: '100%', 
        backgroundColor: '#edb3eb', 
        borderRadius: 5, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    noDataViewContainer: {
        gap: 20, 
        height: '100%', 
        marginHorizontal: 10, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    noDataCartIconStyle: {
        height: 100, 
        width: 100
    },
    noDataFontStyle: {
        fontSize: 30
    },
    priceTextStyle: {
        marginTop: 10, 
        flexWrap: 'wrap', 
        marginHorizontal: 10
    },
    itemNameStyle: {
        flexWrap: 'wrap', 
        marginHorizontal: 10
    },
    itemImageStyle: {
        width: 100, 
        height: 100
    },
    productItemContainer: {
        marginVertical: 10,
        alignItems: 'center', 
        justifyContent: 'space-between', 
        gap: 20
    },
    productItemSubContainer: {
        flexDirection: 'row'
    }
})