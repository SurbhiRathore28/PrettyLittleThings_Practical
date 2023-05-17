import { ADD_TO_CART, CALL_PRODUCT_LISTING_API, REMOVE_FROM_CART } from "./actionTypes"

export function actionCallProductListApi (data: object)  {
    return {
        type: CALL_PRODUCT_LISTING_API, 
        data 
    }    
}

export function actionAddToCart (data: object)  {
    return {
        type: ADD_TO_CART, 
        data: data
    }
}

export function actionRemoveFromCart ()  {
    return {
        type: REMOVE_FROM_CART
    }    
}