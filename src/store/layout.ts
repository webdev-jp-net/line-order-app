import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type State = {
  error: boolean
  tokenError: boolean
  errorMessage: string
  isSplashActive: boolean
}

const initialState: State = {
  error: false,
  tokenError: false,
  errorMessage: '',
  isSplashActive: true,
}

const layoutSlice = createSlice({
  name: 'layout',

  initialState,

  reducers: {
    // 汎用エラーを告知するフラグを更新
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload
    },
    // トークン切れエラーを告知するフラグを更新
    setTokenError: (state, action: PayloadAction<boolean>) => {
      state.tokenError = action.payload
    },
    // エラーメッセージを更新
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
    // スプラッシュ画面の表示状態を更新
    setIsSplashActive: (state, action: PayloadAction<boolean>) => {
      state.isSplashActive = action.payload
    },
  },
})

// Action Creator
export const { setError, setTokenError, setErrorMessage, setIsSplashActive } = layoutSlice.actions

// Reducer
export default layoutSlice.reducer

// Selectors
export const selectIsSplashActive = (state: { layout: State }) => state.layout.isSplashActive
