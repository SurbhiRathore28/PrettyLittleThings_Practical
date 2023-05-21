import React, { useEffect } from "react"
import { Alert, FlatList, Image, Pressable, Text, View, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { connect, useSelector } from "react-redux"
import { CART_ICON } from "../../assets"
import { CONSTANT_TEXT, convertHttpToHttps } from "../../common/utils"
import { actionAddToCart, actionCallProductListApi } from "../../store/action"
import { Style } from "./ProductListingStyle"
import { useIsFocused } from "@react-navigation/native"

const ProductListing = (props: any) => {
    const [productsListing, setProductListing] = React.useState([])
    const [isFetching, setIsFetching] = React.useState(true)
    const [cartItemCount, setCartItemCount] = React.useState(0)
    let totalcCrtItemsCount = useSelector((state:any) => state.totalCartItemsCount)
    const isFocused = useIsFocused();

    useEffect(() => {           
        setCartItemCount(totalcCrtItemsCount)
    },[totalcCrtItemsCount, isFocused])

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

    const addProductIntoCart = (item: any) => {
        let cartItemPresent = props.cartItems
        const cartItemsPresentWithSameId = props.cartItems.find((cartitem: any) => cartitem.id === item.id)
        if(cartItemsPresentWithSameId) {
            cartItemsPresentWithSameId.quantity += 1
            cartItemsPresentWithSameId.totalPrice = cartItemsPresentWithSameId.quantity * cartItemsPresentWithSameId.price
            const index = props.cartItems.indexOf(cartItemsPresentWithSameId)
            cartItemPresent[index] = cartItemsPresentWithSameId    
        } else {
            const productItem = {
                ...item,
                quantity: 1,
                totalPrice: item.price              
            }
            cartItemPresent = [
                ...props.cartItems,
                productItem
            ]
        }
        props.addToCart(cartItemPresent)
    }

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
                <Pressable 
                testID="addToCartAction"
                onPress={() => {
                        addProductIntoCart(item)
                    }} 
                    style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}, Style.addToCartStyle]}>
                    <Text>{CONSTANT_TEXT.ADD_TO_CARD}</Text>
                </Pressable>
            </View>
        )
    }

    const renderCartView = () => {
        return (
                <Pressable
                testID="GoToCart"
                onPress={()=>
                    props.navigation.navigate('Cart')
                }
                style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}, Style.cartViewStyle]}>
                <Image testID="GoToCartImage" source={CART_ICON}/>
            </Pressable>
        )
    }

    const renderCartItemNumber = () => {
        return (
            <View style={Style.cartItemCountViewStyle}>
                <Text style={Style.cartItemCountTxtStyle}>{cartItemCount}</Text>
            </View>            
        )
    }

    return (
        <SafeAreaView style={Style.containerStyle}>
            {productsListing.length > 0 ? <FlatList
                testID="productListing"
                numColumns={productsListing.length > 1 ? 2 : 1}
                style={Style.listingStyle}
                data={productsListing}
                renderItem={renderProductItem}
            /> : <></>}
            {productsListing.length > 0 ? renderCartView() : <></>}
            {cartItemCount > 0 ? renderCartItemNumber() : <></>}
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