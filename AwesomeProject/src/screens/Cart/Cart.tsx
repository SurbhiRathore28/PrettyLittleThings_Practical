import React, { useEffect, useState } from "react"
import { Image, Text, View, FlatList, Pressable, Alert } from "react-native"
import { connect } from "react-redux"
import { CONSTANT_TEXT, convertHttpToHttps } from "../../common/utils"
import { CART_ICON } from "../../assets"
import { REMOVE_FROM_CART } from "../../store/actionTypes"
import { actionRemoveFromCart } from "../../store/action"
import { Style } from "./CartStyle"

const Cart = (props: any) => {
    const [cartItems, setCartItems] = useState(props.cartItems)
    useEffect(() => {        
        setCartItems(props.cartItems)
    },[props.cartItems])

    const renderProductItem = (itemData: any) => {
        const {item} = itemData
        const imageUrl = convertHttpToHttps(item.img)
        return (
            <View key={itemData?.index} style={Style.productItemContainer}>
                <View style={{ flexDirection: 'row'}}>
                    <Image resizeMode='contain' style={Style.itemImageStyle} source={{uri:imageUrl}}/>
                    <View style={{flex:1}}>
                        <Text style={Style.itemNameStyle}>{item.name}</Text>
                        <Text style={Style.priceTextStyle}>${item.price}</Text>
                    </View>
                </View>            
            </View>
        )
    }

    const displayNoDataView = () => {
       return (
        <View style={Style.noDataViewContainer}>
            <Image style={Style.noDataCartIconStyle} source={CART_ICON}></Image>
            <Text style={Style.noDataFontStyle}>{CONSTANT_TEXT.SORRY_NO_DATA}</Text>
        </View>
       )
    }
    const proceedToPayment =() => {
        return (
            <Pressable onPress={() => {
                Alert.alert(CONSTANT_TEXT.ORDER_PLACED)
                props?.removeFromCart()
                props?.navigation.pop()
            }} 
            style={Style.orderPlaceBtnStyle}>
            <Text>{CONSTANT_TEXT.PLACE_ORDER}</Text>
        </Pressable>
        )
    }
    return (
        <View style={Style.containerStyle}>
            <FlatList 
                keyExtractor={item => item.index}
                data={cartItems}
                renderItem={renderProductItem}
                ItemSeparatorComponent={() => {
                    return (<View style={Style.itemSeparatorStyle} />)
                }}
            />
            {cartItems?.length > 0 && proceedToPayment()}
            {cartItems?.length === 0 && displayNoDataView()}
        </View>
    )
}

const mapStateToProps = (state: any) => {
    return {
      cartItems: state.cartItems,
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
      removeFromCart: () => dispatch(actionRemoveFromCart()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)