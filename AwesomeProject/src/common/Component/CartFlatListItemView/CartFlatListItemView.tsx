import { FlatList } from "react-native-gesture-handler"
import { CART_ITEM_ACTION, convertHttpToHttps } from "../../utils"
import { Image, Pressable, Text, View } from "react-native"
import { Style } from "../../../screens/Cart/CartStyle"
import { DELETE } from "../../../assets"

export const CartFlatListItemView = ({itemData, updateProductQuantity}: any) => {
    const {item} = itemData
    const imageUrl = convertHttpToHttps(item.img)
    const leftButtonStyle = item.quantity === 1 ? Style.deleteFromCartButtonStyle : Style.addToCartStyle

    return (
    <View style={Style.productItemContainer}>
        <View style={{ flexDirection: 'row'}}>
            <Image testID="productImage" resizeMode='contain' style={Style.itemImageStyle} source={{uri:imageUrl}}/>
            <View style={{flex:1, justifyContent:'space-between'}}>
                <Text testID="productName" style={Style.itemNameStyle}>{item.name}</Text>
                <Text testID="productTotalPrice" style={Style.priceTextStyle}>${item.totalPrice}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable 
                    testID="decreseProduct"
                    onPress={() => {
                        updateProductQuantity(item, CART_ITEM_ACTION.DECREMENT)
                    }} 
                    style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}, leftButtonStyle]}>
                            {item.quantity === 1 ? <Image source={DELETE}/> : <Text>-</Text>}
                    </Pressable>
                    <Text testID="totalProductCount" style={{marginHorizontal: 10}}>{item.quantity} items</Text>
                    <Pressable 
                    testID="increseProduct"
                    onPress={() => {
                            updateProductQuantity(item, CART_ITEM_ACTION.INCREMENT)
                        }} 
                        style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}, Style.addToCartStyle]}>
                            <Text>+</Text>
                    </Pressable>
                </View>
            </View>
        </View>            
    </View>
    )
}

