import { createSlice } from '@reduxjs/toolkit'
import { RootStateType } from '../../store'
import { ICart, ICartState } from '../../utilities/schemas'

const initialState: ICartState = {
  cart: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state: ICartState, action: { payload: ICart }) {
      if (!state.cart) state.cart = [action.payload]
      else state.cart.push(action.payload)
    },
    deleteItem(state: ICartState, action: { payload: number }) {
      if (state.cart)
        state.cart = state.cart?.filter(
          (pizza) => pizza.pizzaId !== action.payload,
        )
    },
    increaseItemQuantity(state: ICartState, action: { payload: number }) {
      const pizza = state.cart?.find(
        (pizza) => pizza.pizzaId === action.payload,
      )
      if (pizza) {
        pizza.quantity++
        pizza.totalPrice = pizza.quantity * pizza.unitPrice
      }
    },
    decreaseItemQuantity(state: ICartState, action: { payload: number }) {
      const pizza = state.cart?.find(
        (pizza) => pizza.pizzaId === action.payload,
      )
      if (pizza) {
        pizza.quantity--
        pizza.totalPrice = pizza.quantity * pizza.unitPrice
      }
      console.log('Pizza quantity: ', pizza?.quantity, action.payload, pizza)
      if (pizza?.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action)
    },
    clearCart(state: ICartState) {
      state.cart = null
    },
  },
})

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer

export const getCart = (state: RootStateType) => state.cart.cart

export const getTotalCartPrice = (state: RootStateType) =>
  state.cart.cart?.reduce(
    (totalPrice: number, curPizza: ICart) =>
      (totalPrice += curPizza.totalPrice),
    0,
  )

export const getCartTotalPizzaQuantity = (state: RootStateType) =>
  state.cart.cart?.reduce(
    (totalQuantity: number, curPizza: ICart) =>
      (totalQuantity += curPizza.quantity),
    0,
  )
