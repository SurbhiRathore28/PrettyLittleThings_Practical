import { View, FlatList } from "react-native"
import { Style } from "./CartItemFlatListStyle"
import { CartFlatListItemView } from "../CartFlatListItemView/CartFlatListItemView"

export const CartItemFlatList = ({cartItems, updateProductQuantity}: any) => {    

    const renderProductItem = (item: any) => {
        return <CartFlatListItemView itemData={item} updateProductQuantity={updateProductQuantity}/>
    }

    return (
            <FlatList
                testID={'ProductDetail'}
                keyExtractor={item => item.index}
                data={cartItems}
                renderItem={renderProductItem}
                ItemSeparatorComponent={() => {
                    return (<View style={Style.itemSeparatorStyle} />)
                }}
            />
    )
}

