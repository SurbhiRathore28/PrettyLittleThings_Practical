import React, { useEffect, useState } from "react"
import { Image, Text, View, FlatList, Pressable, Alert } from "react-native"
import { connect } from "react-redux"
import { CART_ITEM_ACTION, CONSTANT_TEXT, convertHttpToHttps } from "../../common/utils"
import { CART_ICON, DELETE } from "../../assets"
import { REMOVE_FROM_CART } from "../../store/actionTypes"
import { actionRemoveFromCart } from "../../store/action"
import { Style } from "./CartStyle"
import { actionAddToCart } from "../../store/action"
import { CartItemFlatList } from "../../common/Component/CartItemFlatList/CartItemFlatList"

const Cart = (props: any) => {
    const [cartItems, setCartItems] = useState(props.cartItems)
    
    useEffect(() => {        
        setCartItems(props.cartItems)
    },[props.cartItems])

    const updateProductQuantity = (item: any, action: CART_ITEM_ACTION) => {
        let cartItemPresent = props.cartItems
        const cartItemsPresentWithSameId = props.cartItems.find((cartitem: any) => cartitem.id === item.id)
        const index = props.cartItems.indexOf(cartItemsPresentWithSameId)

        if(action === CART_ITEM_ACTION.INCREMENT) {
            cartItemsPresentWithSameId.quantity += 1
            cartItemsPresentWithSameId.totalPrice = cartItemsPresentWithSameId.quantity * cartItemsPresentWithSameId.price            
            updateItem(false)
        } else {
            if(cartItemsPresentWithSameId.quantity === 1) {
                cartItemPresent.splice(index, 1)
                updateItem(true)
            } else {
                cartItemsPresentWithSameId.quantity -= 1
                cartItemsPresentWithSameId.totalPrice = cartItemsPresentWithSameId.totalPrice - cartItemsPresentWithSameId.price    
                updateItem(false)
            }
        }
        function updateItem (deleteItem: Boolean) {
            if (deleteItem) {
                props.addToCart(cartItemPresent)
                setCartItems([...cartItemPresent])    
            } else {
                cartItemPresent[index] = cartItemsPresentWithSameId    
                props.addToCart(cartItemPresent)
                setCartItems([])    
                setCartItems([...cartItemPresent])        
            }
        }
    }

    const displayNoDataView = () => {
       return (
        <View testID="noDataView" style={Style.noDataViewContainer}>
            <Image testID="noDataImage" style={Style.noDataCartIconStyle} source={CART_ICON}></Image>
            <Text testID="noDataText" style={Style.noDataFontStyle}>{CONSTANT_TEXT.SORRY_NO_DATA}</Text>
        </View>
       )
    }
    const proceedToPayment =() => {
        return (
            <Pressable 
            testID={'orderPlace'}
            onPress={() => {
                Alert.alert(CONSTANT_TEXT.ORDER_PLACED)
                props?.removeFromCart()
                props?.navigation.pop()
            }} 
            style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}, Style.orderPlaceBtnStyle]}>
            <Text>{CONSTANT_TEXT.PLACE_ORDER}</Text>
        </Pressable>
        )
    }

    return (
        <View style={Style.containerStyle}>          
            <CartItemFlatList cartItems={cartItems} updateProductQuantity={updateProductQuantity}/>
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
      addToCart : (data: object) => dispatch(actionAddToCart(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)