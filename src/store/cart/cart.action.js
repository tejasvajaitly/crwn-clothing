import {CART_ACTION_TYPES} from './cart.types';
import {createAction} from '../../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  let updatedCartItems = structuredClone(cartItems);
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === productToAdd.id) {
      updatedCartItems[i].quantity = updatedCartItems[i].quantity + 1;
      return updatedCartItems;
    }
  }
  let updatedProductToAdd = structuredClone(productToAdd);
  updatedProductToAdd.quantity = 1;
  updatedCartItems.push(updatedProductToAdd);
  return updatedCartItems;
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  let updatedCartItems = structuredClone(cartItems);
  for (let i = 0; i < cartItems.length; i++) {
    if (updatedCartItems[i].id === cartItemToRemove.id) {
      if (updatedCartItems[i].quantity === 1) {
        updatedCartItems.splice(i, 1);
        return updatedCartItems;
      }
      updatedCartItems[i].quantity = updatedCartItems[i].quantity - 1;
      return updatedCartItems;
    }
  }
};

const clearCartItem = (cartItems, cartItemToRemove) => {
  let updatedCartItems = structuredClone(cartItems);
  for (let i = 0; i < cartItems.length; i++) {
    if (updatedCartItems[i].id === cartItemToRemove.id) {
      updatedCartItems.splice(i, 1);
      return updatedCartItems;
    }
  }
};

export const setIsCartOpen = bool => {
  return createAction(CART_ACTION_TYPES.CHANGE_CART_DROPDOWN_STATE, bool);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.UPDATE_CART, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.UPDATE_CART, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = clearCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.UPDATE_CART, newCartItems);
};
