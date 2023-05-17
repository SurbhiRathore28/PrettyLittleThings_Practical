const { productListingApi } = require("../../api/ProductListingApi/api");
import { put, takeLatest } from 'redux-saga/effects';
import { ADD_ITEM_TO_CART, ADD_TO_CART, CALL_PRODUCT_LISTING_API, REMOVE_FROM_CART, REMOVE_ITEM_FROM_CART } from '../../store/actionTypes';

function* productListingSaga(request) {
    const {success, failure} = request?.data
    try {
        const response = yield(productListingApi())
        success(response)
    } catch (error) {
        failure(error)
    }
}

function* addToCart(params) {
    try {        
        yield put({type: ADD_ITEM_TO_CART, cartItems: params.data})
    } catch (error) {
        console.log('error')
    }
}

function* remomveFromCart() {
    try {                
        yield put({type: REMOVE_ITEM_FROM_CART, cartItems: []})
    } catch (error) {
        console.log('error')
    }
}

export default function* ProductListingSaga() {
    yield takeLatest(CALL_PRODUCT_LISTING_API, productListingSaga)
    yield takeLatest(ADD_TO_CART, addToCart)
    yield takeLatest(REMOVE_FROM_CART, remomveFromCart)
}