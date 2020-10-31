import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productListReducers, 
    productDetailsReducers, 
    productDeleteReducers,
    productCreateReducers,
    productUpdateReducers 
} from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { 
    userLoginReducers, 
    userRegisterReducers, 
    userDetailsReducers, 
    userUdateProfilReducers, 
    userListReducers,
    userDeleteReducers,
    userUpdateReducers
} from './reducers/userReducers'
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer 
} from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productUpdate: productUpdateReducers,
    cart: cartReducers,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUdateProfilReducers,
    userList: userListReducers,
    userDelete: userDeleteReducers,
    userUpdate: userUpdateReducers,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null

const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
}       

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store