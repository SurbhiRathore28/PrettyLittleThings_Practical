import configureStore from 'redux-mock-store';
import {render, fireEvent, waitFor} from 'react-native-testing-library';
import { Provider } from "react-redux";
import ProductListing from "../src/screens/ProductListing/ProductListing";
import * as mockJson from './mockJson.json'
import React from "react";
import { CART_ICON } from '../src/assets';

const createTestProps = () =>({
  navigation: {
      pop: jest.fn(),
      navigate: jest.fn(),
  },
  productsListing:mockJson
})

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));

const mockStore = configureStore()

describe('Product Detail', () => {
  let store: any
  let props: any
  let rendered: any 
  beforeEach(()=> {
    props = createTestProps()
    store = mockStore({
      cartItems: [{
        colour: "Black",
        id: 1,
        img: "https://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
        name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
        price: 10,
        quantity: 3,
        totalPrice: 30
      }], 
    })      
    
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce([JSON.stringify(mockJson) , () => {}])
      .mockReturnValueOnce([false, () => {}])
      .mockReturnValueOnce([1, () => {}])   

    rendered = render(<Provider store={store}><ProductListing {...props} /></Provider>)
  })

  it('Should Display Product Listing', async () => {  
      const productListing = await rendered.getByTestId('productListing')
      expect(productListing)
      const addToCart = await rendered.getByTestId('GoToCart')
      expect(addToCart)
      fireEvent(addToCart, 'press')
      const action = store.getActions()
      expect(action.length).toBe(1)
  })

  it('Should Display cart icon image', async () => {  
    const cartimage = rendered.getByTestId('GoToCartImage')
    expect(cartimage.props.source).toBe(CART_ICON)
  })
})
