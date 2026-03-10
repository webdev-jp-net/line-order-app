import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

type State = {
  userToken: string | undefined | null
  lineUserId: string | undefined | null
}

const initialState: State = {
  userToken: undefined,
  lineUserId: undefined,
}

export const liffUser = createSlice({
  name: 'liffUser',
  initialState,
  reducers: {
    successLiffLogin: (state, action: PayloadAction<{ userToken: string; lineUserId: string }>) => {
      state.userToken = action.payload.userToken
      state.lineUserId = action.payload.lineUserId
    },
    failureLiffLogin: state => {
      state.userToken = null
      state.lineUserId = null
    },
  },
})

// Action Creator
export const { successLiffLogin, failureLiffLogin } = liffUser.actions

// Reducer
export default liffUser.reducer

// LocalStorageに保存する設定
export const liffUserPersistConfig = {
  key: 'liffUser',
  storage,
  whitelist: ['userToken', 'lineUserId'],
}
