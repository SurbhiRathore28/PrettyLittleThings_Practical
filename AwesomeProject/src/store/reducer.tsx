const initialState = {
    cartItems: [],
    totalCartItemsCount: 0
}

 export const reducer = (state = initialState,  action : any) => {
    switch(action.type) {
        case 'ADD_ITEM_TO_CART': 
            return {
                ...state,
                cartItems: action.cartItems                     
            }
        case 'GET_ITEMS_FROM_CART': 
            return {
                cartItems: state.cartItems
            }
        case 'REMOVE_ITEM_FROM_CART': 
            return {
                ...state,
                cartItems: []            
            }
        case 'SET_TOTAL_ITEMS_IN_CART': 
        return {
            ...state,
            totalCartItemsCount: action.totalCartItems         
        }           
        default : return state        
    }
 }