import { all } from "redux-saga/effects";
import ProductListingSaga from "../screens/ProductListing/Saga";

export default function* rootSaga(){
    yield all([
        ProductListingSaga()
    ])
}