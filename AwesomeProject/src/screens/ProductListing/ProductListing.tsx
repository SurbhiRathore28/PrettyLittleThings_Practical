import React, { useEffect, useState } from "react"
import { Alert, FlatList, Dimensions, Image, Pressable, Text, View, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { CART_ICON } from "../../assets"
import { CONSTANT_TEXT, convertHttpToHttps } from "../../common/utils"
import { actionAddToCart, actionCallProductListApi } from "../../store/action"
import { Style } from "./ProductListingStyle"

const ProductListing = (props: any) => {
    const [productsListing, setProductListing] = useState([])
    const [cartItems, setCartItems] = useState(props.cartItems?.length)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {           
        setCartItems(props.cartItems?.length)
    },[props.cartItems])

    useEffect(() => {
        const param = {
            success: (response: []) => {
                setProductListing(response)
                setIsFetching(false)
            },
            failure: (error: object) => {
                console.log('error', error)
                setIsFetching(false)
                Alert.alert('Something went wrong')
            }
        }
        props.callProductListingApi(param)
    },[])

    const renderProductItem = (itemData: any) => {
        const {item} = itemData
        const imageUrl = convertHttpToHttps(item.img)
        return (
            <View style={Style.productItemContainerStyle}>
                <View style={Style.productImageContainre}>
                    <Image resizeMode='contain' style={Style.productImageStyle} source={{uri:imageUrl}}/>
                    <Text style={Style.productDescriptionStyle}>{item.name}</Text>
                    <Text style={Style.productDescriptionStyle}>${item.price}</Text>
                </View>
                <Pressable onPress={() => {
                        props.addToCart(item)
                    }} 
                    style={Style.addToCartStyle}>
                    <Text>{CONSTANT_TEXT.ADD_TO_CARD}</Text>
                </Pressable>
            </View>
        )
    }

    const renderCartView = () => {
        return (
                <Pressable 
                onPress={()=>
                    props.navigation.navigate('Cart')
                }
                style={Style.cartViewStyle}>
                <Image source={CART_ICON}/>
            </Pressable>
        )
    }

    const renderCartItemNumber = () => {
        return (
            <View style={Style.cartItemCountViewStyle}>
                <Text style={Style.cartItemCountTxtStyle}>{cartItems}</Text>
            </View>            
        )
    }

    return (
        <SafeAreaView style={Style.containerStyle}>
            {productsListing.length > 0 ? <FlatList
                numColumns={2}
                style={Style.listingStyle}
                data={productsListing}
                renderItem={renderProductItem}
            /> : <></>}
            {productsListing.length > 0 ? renderCartView() : <></>}
            {cartItems > 0 ? renderCartItemNumber() : <></>}
            {isFetching ? <ActivityIndicator size={'large'} style={Style.activityIndicatorStyle}/> : <></>}
        </SafeAreaView>
    )
}


const mapStateToProps = (state: any) => {
    return {
      cartItems: state?.cartItems,
    };
  }

const mapDispatchToProps = (dispatch: any) => {
    return {
        callProductListingApi: (data: object) => dispatch(actionCallProductListApi(data)),
        addToCart : (data: object) => dispatch(actionAddToCart(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing)