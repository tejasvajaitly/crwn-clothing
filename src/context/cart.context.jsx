import {createContext, useReducer } from "react";

import {createAction} from "../utils/reducer/reducer.utils"

const addCartItem = (cartItems, productToAdd) => {
    let updatedCartItems = structuredClone(cartItems)
    for (let i = 0; i < cartItems.length; i++){
        if(cartItems[i].id === productToAdd.id) {
            updatedCartItems[i].quantity = updatedCartItems[i].quantity + 1
            return updatedCartItems
        }
    }
    let updatedProductToAdd = structuredClone(productToAdd)
    updatedProductToAdd.quantity = 1
    updatedCartItems.push(updatedProductToAdd)
    return updatedCartItems
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    let updatedCartItems = structuredClone(cartItems)
    for (let i = 0; i < cartItems.length; i++){
        if(updatedCartItems[i].id === cartItemToRemove.id) {
            if(updatedCartItems[i].quantity === 1){
                updatedCartItems.splice(i, 1);
                return updatedCartItems
            }
            updatedCartItems[i].quantity = updatedCartItems[i].quantity - 1
            return updatedCartItems
        }
    }
}

const clearCartItem = (cartItems, cartItemToRemove) => {
    let updatedCartItems = structuredClone(cartItems)
    for (let i = 0; i < cartItems.length; i++){
        if(updatedCartItems[i].id === cartItemToRemove.id) {
                updatedCartItems.splice(i, 1);
                return updatedCartItems
        }
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    setCartCount: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0,
    setCartTotal: () => {},
})

const CART_ACTIONS_TYPE = {
    CHANGE_CART_DROPDOWN_STATE: 'CHANGE_CART_DROPDOWN_STATE',
    UPDATE_CART: 'UPDATE_CART'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const {type, payload} = action
    switch(type){
        case CART_ACTIONS_TYPE.CHANGE_CART_DROPDOWN_STATE:
            return {
                ...state,
                isCartOpen : payload
            }
        case CART_ACTIONS_TYPE.UPDATE_CART:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}

export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false)
    // const [cartItems, setCartItems] = useState([])
    // const [cartCount, setCartCount] = useState(0)
    // const [cartTotal, setCartTotal] = useState(0)

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const {isCartOpen, cartItems, cartCount, cartTotal} = state

    // useEffect(() => {
    //     let newCartCount = cartItems.reduce((accum, item) =>  item.quantity + accum, 0)
    //     // setCartCount(newCartCount)
    //     dispatch({type: 'CHANGE_CART_COUNT', payload: newCartCount})
    // }, [cartItems])

    // useEffect(() => {
    //     let newCartTotal = cartItems.reduce((accum, item) =>  (item.price * item.quantity) + accum, 0)
    //     // setCartTotal(newCartTotal)
    //     dispatch({type: 'CHANGE_CART_TOTAL', payload: newCartTotal})
    // }, [cartItems])

    const updateCartItems = (newCartItems) => {
        let newCartCount = newCartItems.reduce((accum, item) =>  item.quantity + accum, 0)
        let newCartTotal = newCartItems.reduce((accum, item) =>  (item.price * item.quantity) + accum, 0)
        dispatch(createAction(CART_ACTIONS_TYPE.UPDATE_CART, {
            cartItems: newCartItems, 
            cartCount: newCartCount, 
            cartTotal: newCartTotal
        }))
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTIONS_TYPE.CHANGE_CART_DROPDOWN_STATE, bool))
    }
    

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItems(newCartItems)
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove)
        updateCartItems(newCartItems)
    }

    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems, cartItemToRemove)
        updateCartItems(newCartItems)
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal}
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}