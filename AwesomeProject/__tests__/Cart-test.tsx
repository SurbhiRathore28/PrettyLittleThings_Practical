/**
 * @format
 */

import 'react-native';
import React from 'react';
import Cart from '../src/screens/Cart/Cart';
import {render, fireEvent} from 'react-native-testing-library';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CART_ICON } from '../src/assets';
import { CartFlatListItemView } from '../src/common/Component/CartFlatListItemView/CartFlatListItemView';

const createTestProps = () => ({
  navigation: {
    pop: jest.fn()
  },
});

const mockStore = configureStore();

describe('Cart', () => {
  let rendered: any
  let props: any;
  let store: any;
  let item: any;
  beforeEach(() => {
    props = createTestProps();
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
  });
  item = {
    colour: "Black",
    id: 1,
    img: "https://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
    name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
    price: 10,
    quantity: 3,
    totalPrice: 30
  }
  rendered = render(
      <Provider store={store}><Cart {...props}/></Provider>
    );
  })

  describe('Cart button', () => {
    it('should validate order place action', () => {
      const buttonComponent = rendered.getByTestId('orderPlace');
      fireEvent(buttonComponent,'press')
      const action = store.getActions()
      expect(action.length).toBe(1)
      expect(action[0].type).toEqual('REMOVE_FROM_CART')
    });
  })  
  
  describe('Cart flatlist test cases', () => {   
  
    it('should display cart flatlist', () => {
      const flatListComponent = rendered.getByTestId('ProductDetail'); 
      expect(flatListComponent)
    });  
  
    it('should display correct type of cell in flatList', () => {          
      const flatListComponent = rendered.getByTestId('ProductDetail'); 
      const element = flatListComponent.props.renderItem(item)
      expect(element.props.itemData).toStrictEqual(item)
      expect(element.type).toBe(CartFlatListItemView)
    });
  
    it('should display correct data in renderItem', () => {       
      const productImage = rendered.getByTestId('productImage')
      expect(productImage.props.source.uri).toEqual(item.img)
      const productName = rendered.getByTestId('productName')
      expect(productName.props.children).toEqual(item.name)
    });    

    it('should decrement product', () => {       
      const decrementProduct = rendered.getByTestId('decreseProduct')
      const productName = rendered.getByTestId('totalProductCount')
      const productPrice = rendered.getByTestId('productTotalPrice')

      fireEvent(decrementProduct, 'press')
      expect(productName.props.children).toContain(item.quantity - 1)
      expect(productPrice.props.children).toContain(item.totalPrice - item.price)

      const action = store.getActions()
      expect(action.length).toBe(1)
      expect(action[0].type).toEqual('ADD_TO_CART')
    });

    it('should increment product', () => {       
      const incrememntProduct = rendered.getByTestId('increseProduct')
      const productPrice = rendered.getByTestId('productTotalPrice')
      const productName = rendered.getByTestId('totalProductCount')

      fireEvent(incrememntProduct, 'press')
      expect(productName.props.children).toContain(item.quantity + 1)
      expect(productPrice.props.children).toContain(item.totalPrice + item.price)

      const action = store.getActions()
      expect(action.length).toBe(1)
      expect(action[0].type).toEqual('ADD_TO_CART')
    });
  })
})

describe('Cart when no data is there', () => {
  let rendered: any
  let props: any;
  let store: any
  beforeEach(() => {
    props = createTestProps();
    store = mockStore({
      cartItems: []
  });
    rendered = render(
      <Provider {...props} store={store}><Cart {...props}/></Provider>
    );
  })

  it(('Should display no data view'), () => {
    const noDataView = rendered.getByTestId('noDataView')
    expect(noDataView)    
  })

  it(('Should display text'), () => {
    const noDataView = rendered.getByTestId('noDataText')
    expect(noDataView)    
    expect(noDataView.props.children).toMatch('Sorry No data added in cart')    
  }) 
  
  it(('Should render the image'), () => {
    const imageComponent = rendered.getByTestId('noDataImage')
    expect(imageComponent)
    expect(imageComponent.props.source).toBe(CART_ICON)
  })
})