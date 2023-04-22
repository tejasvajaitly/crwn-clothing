import {createContext, useState, useEffect } from "react";

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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        let newCartCount = cartItems.reduce((accum, item) =>  item.quantity + accum, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        console.log("lol",cartItems[0])
        let newCartTotal = cartItems.reduce((accum, item) =>  (item.price * item.quantity) + accum, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])
    

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, setCartCount, removeItemFromCart, clearItemFromCart, cartTotal}
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}