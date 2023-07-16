import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Product} from '../models/Product'

export interface BaketState {
  products: Product[]
}

const initialState: BaketState = {
  products: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    add: (state,action: PayloadAction<Product>) => {
      if(state.products.findIndex(q => q.id == action.payload.id) > -1) return;
      state.products = [...state.products, action.payload]
    },
    remove: (state,action: PayloadAction<Product>) => {
      state.products = state.products.filter(q => q.id != action.payload.id)
    },
    clear: (state) => {
      state.products = []
    },
  },
})

export const { add, remove, clear } = basketSlice.actions

export default basketSlice.reducer