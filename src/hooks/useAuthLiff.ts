import { useCallback, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import liff from '@line/liff/core'
import GetIdDoken from '@line/liff/get-id-token'
import { setError as setGlobalError, setTokenError, setErrorMessage } from 'store/layout'
import { successLiffLogin, failureLiffLogin } from 'store/liffUser'

import type { RootState } from '../store'

/**
 * LIFF APIを有効化する::liff.init()よりも前に呼び出す必要がある
 */
liff.use(new GetIdDoken())

type QueryStatus = {
  loading: boolean
  error: string
  actLoginLiff: () => void
  userToken: string | undefined | null
}

/**
 * LIFFアプリの初期化を行います
 */
export const useAuthLiff = (): QueryStatus => {
  const dispatch = useDispatch()
  const { userToken } = useSelector((state: RootState) => state.liffUser)

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const actLoginLiff = useCallback(() => {
    ;(async () => {
      try {
        setLoading(true) // 処理開始

        // LIFFアプリにログインする
        const liffId = import.meta.env.VITE_LIFF_ID as string
        console.log({ liffId })

        // IDトークンの期限切れ対策
        clearExpiredIdToken(liffId)

        await liff.init({ liffId, withLoginOnExternalBrowser: true })

        const lineIdToken = liff.getIDToken()
        if (lineIdToken) {
          // サーバー上でLINE ID Tokenを元にLINEユーザーIDを取得する
          // LINEユーザーIDをJWTに格納したuserTokenを受け取り、以降のAPIアクセスではこれを使用
          const baseUrl = import.meta.env.VITE_API_ENDPOINT || ''
          const fetchRes = await fetch(`${baseUrl}/user-token`, {
            method: 'GET',
            headers: {
              'line-id-token': lineIdToken,
            },
          })

          // サーバーエラーの場合は共通のエラーダイアログを表示
          if (!fetchRes.ok) {
            if (fetchRes.status === 500) {
              dispatch(setGlobalError(true))
              dispatch(setErrorMessage('サーバーエラーが発生しました。'))
            }
          }

          // セッションエラーの場合は共通のエラーダイアログを表示
          if (!fetchRes.ok) {
            if (fetchRes.status === 401) {
              dispatch(setTokenError(true))
              dispatch(setErrorMessage('再ログインが必要です。'))
            }
          }

          const resBody = (await fetchRes.json()) as {
            userToken: string
            lineUserId: string
          }
          dispatch(
            successLiffLogin({
              userToken: resBody.userToken,
              lineUserId: resBody.lineUserId,
            })
          )
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          const message = err.message
          setError(message)
          dispatch(failureLiffLogin()) // LIFFログイン状態をリセット
          if (message !== 'Server Error') {
            dispatch(setTokenError(true))
            dispatch(setErrorMessage(message))
          }
        }
      } finally {
        setLoading(false) // 処理終了
      }
    })()
  }, [dispatch])

  // 戻り値
  return { loading, error, actLoginLiff, userToken }
}

//----------------------------------------
// IDトークンの期限切れ対策
// IDトークンの有効期限が1時間で切れるが、ローカルストレージに保存されているトークンの期限が切れている場合でも
// liff.isLoggedIn()がtrueを返す問題があり、その場合にAPIの認証が通らず再ログインもできない状態になる
// 以下の記事を参考に、トークンが期限切れの場合にローカルストレージの内容を消すことでこれを対処している
// https://zenn.dev/arahabica/articles/274bb147a91d8a

// liff関連のlocalStorageのキーのリストを取得
const getLiffLocalStorageKeys = (prefix: string) => {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.indexOf(prefix) === 0) {
      keys.push(key)
    }
  }
  return keys
}
// 期限切れのIDTokenをクリアする
const clearExpiredIdToken = (liffId: string) => {
  const keyPrefix = `LIFF_STORE:${liffId}:`
  const key = `${keyPrefix}decodedIDToken`
  const decodedIDTokenString = localStorage.getItem(key)
  if (!decodedIDTokenString) {
    return
  }
  const decodedIDToken = JSON.parse(decodedIDTokenString)
  // 有効期限をチェック
  if (new Date().getTime() > decodedIDToken.exp * 1000) {
    const keys = getLiffLocalStorageKeys(keyPrefix)
    for (const key of keys) {
      localStorage.removeItem(key)
    }
  }
}

// LIFF関連のlocalStorageを全てクリアする
export const clearLiffLocalStorage = () => {
  const liffId = import.meta.env.VITE_LIFF_ID as string | undefined
  if (!liffId) {
    return
  }

  const keyPrefix = `LIFF_STORE:${liffId}:`
  const keys = getLiffLocalStorageKeys(keyPrefix)
  for (const key of keys) {
    localStorage.removeItem(key)
  }
}
