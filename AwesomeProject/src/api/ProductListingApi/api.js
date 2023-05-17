import { BASE_URL, END_POINT } from "../ApiConst"

export async function productListingApi() {
    const response = await fetch(BASE_URL + END_POINT.PRODUCT_LISTING)
    .then((response) => response.json())
    .then((result) => result)
    return response
}