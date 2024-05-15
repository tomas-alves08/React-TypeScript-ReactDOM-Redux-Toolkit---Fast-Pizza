import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlice'

export type RootStateType = ReturnType<typeof store.getState>

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
})

console.log('Store State: ', store.getState())

export default store
