import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { clearLiffLocalStorage } from 'hooks/useAuthLiff'

import { setTokenError, setErrorMessage } from './layout'
import { failureLiffLogin } from './liffUser'

import type { RootState } from './index'

const baseUrl = import.meta.env.VITE_API_BASE_URL || ''

/**
 * エラーメッセージの定数
 */
const ERROR_MESSAGES = {
  BASE_URL_MISSING: 'BASE_URLを設定してください',
  AUTH_REQUIRED: '認証が必要です。ログインしてください。',
  UNEXPECTED_ERROR: 'Unexpected Error',
} as const

/**
 * HTTPステータスコードの定数
 */
const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FETCH_ERROR: 'FETCH_ERROR',
} as const

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers, { getState }) => {
    if (!baseUrl) {
      throw new Error(ERROR_MESSAGES.BASE_URL_MISSING)
    }

    // Headerの設定
    headers.set('Accept', 'application/json')
    headers.set('Content-Type', 'application/json')

    // 認証トークンの設定
    const state = getState() as RootState
    const userToken = state.liffUser.userToken

    if (userToken) {
      headers.set('Authorization', `Bearer ${userToken}`)
    }

    return headers
  },
})

// カスタムBaseQueryの定義
const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // // デバック用: 通信待ち時間を再現するために3秒間の待機を追加
  // await new Promise(resolve => setTimeout(resolve, 3000))

  try {
    const result = await baseQuery(args, api, extraOptions)

    // 401エラーの場合、認証エラーとして処理
    if (result.error && result.error.status === HTTP_STATUS.UNAUTHORIZED) {
      // 1. セッションエラーダイアログを表示
      api.dispatch(setTokenError(true))
      api.dispatch(setErrorMessage('再ログインが必要です。'))

      // 2. 認証状態をクリア
      api.dispatch(failureLiffLogin())

      // 3. LIFFのlocalStorageをクリア
      clearLiffLocalStorage()

      return {
        error: {
          status: HTTP_STATUS.UNAUTHORIZED,
          data: {
            message: ERROR_MESSAGES.AUTH_REQUIRED,
          },
        },
      }
    }

    return result
  } catch {
    // その他の予期せぬエラー
    return {
      error: {
        status: HTTP_STATUS.FETCH_ERROR,
        error: ERROR_MESSAGES.UNEXPECTED_ERROR,
      },
    }
  }
}

export const initApi = createApi({
  baseQuery: customBaseQuery,
  refetchOnMountOrArgChange: true, // 要素をマウントするたびにrefetch
  endpoints: () => ({}),
})
