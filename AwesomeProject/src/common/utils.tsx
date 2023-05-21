export const convertHttpToHttps =(url: string) => url?.replace(new RegExp("\\b"+'http'+"\\b"), 'https')

export const CONSTANT_TEXT = {
    ADD_TO_CARD: 'Add to cart',
    ORDER_PLACED: 'Order placed!',
    SORRY_NO_DATA: 'Sorry No data added in cart',
    PLACE_ORDER: 'Place Order'
}

export enum CART_ITEM_ACTION  {
    INCREMENT,
    DECREMENT
}