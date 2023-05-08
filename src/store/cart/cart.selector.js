import {createSelector} from 'reselect';

const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector([selectCartReducer], cart => cart.cartItems);

export const selectIsCartOpen = createSelector([selectCartReducer], cart => cart.isCartOpen);

export const selectCartCount = createSelector([selectCartReducer], cart =>
  cart.cartItems.reduce((accum, item) => item.quantity + accum, 0)
);

export const selectCartTotal = createSelector([selectCartReducer], cart =>
  cart.cartItems.reduce((accum, item) => item.price * item.quantity + accum, 0)
);
