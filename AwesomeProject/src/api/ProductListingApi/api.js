import { BASE_URL, END_POINT } from "../ApiConst"
const mockJson = require('./mockJson.json');

export async function productListingApi(isMock = false) {
    if(isMock) {
        return mockJson
    }
    const response = await fetch(BASE_URL + END_POINT.PRODUCT_LISTING)
    .then((response) => response.json())
    .then((result) => result)
    return response
}