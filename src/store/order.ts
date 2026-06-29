import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

import type { MenuItem } from 'types/menu'

// カートに溜めた1点ぶんの品目。同一商品でも1点ごとに uid を持ち、1件単位で削除できる
export type CartItem = {
  // カート内で1点を一意に識別するID（削除の対象指定に使う）
  uid: string
  // microCMS のメニューID（注文の productId）
  productId: string
  name: string
  price: number
  mainImage?: MenuItem['mainImage']
}

type State = {
  // 追加順（古い→新しい）に並ぶカート品目
  items: CartItem[]
}

const initialState: State = {
  items: [],
}

const order = createSlice({
  name: 'order',

  initialState,

  reducers: {
    // 商品を1点カートへ追加（uid を採番）
    addItem: {
      reducer: (state, action: PayloadAction<CartItem>) => {
        state.items.push(action.payload)
      },
      prepare: (item: Omit<CartItem, 'uid'>) => ({
        payload: { ...item, uid: nanoid() },
      }),
    },
    // 指定した uid の品目を1件削除
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.uid !== action.payload)
    },
    // カートを空にする
    clearCart: state => {
      state.items = []
    },
  },
})

// Action Creator
export const { addItem, removeItem, clearCart } = order.actions

// Reducer
export default order.reducer

// Selectors
export const selectCartItems = (state: { order: State }) => state.order.items

export const selectCartTotal = (state: { order: State }) =>
  state.order.items.reduce((total, item) => total + item.price, 0)
