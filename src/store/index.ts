import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistStore, persistReducer } from 'redux-persist'

import External from './external'
import { initApi } from './initApi'
import Layout from './layout'
import LiffUser, { liffUserPersistConfig } from './liffUser'
import player, { playerPersistConfig } from './player'

export const rootReducer = combineReducers({
  liffUser: persistReducer(liffUserPersistConfig, LiffUser),
  player: persistReducer(playerPersistConfig, player),
  layout: Layout,
  external: External,
  // RTK Query APIスライス
  [initApi.reducerPath]: initApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  // RTK Query用のミドルウェア設定
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(initApi.middleware),
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// 型付きhooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
