import { useMemo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import liff from '@line/liff/core'
import { useAppDispatch, useAppSelector } from 'store'
import { usePostOrdersMutation } from 'store/_apiClient'
import { setError, setErrorMessage } from 'store/layout'
import { selectCartItems, selectCartTotal, removeItem, clearCart } from 'store/order'

/**
 * カートの表示・操作・注文確定ロジック
 * @param onClose カート（ダイアログ）を閉じるための呼び出し元ハンドラー
 */
export const useCart = (onClose: () => void) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const [postOrders, { isLoading }] = usePostOrdersMutation()

  // 表示用の並び:
  // 追加順を基準にしつつ、同一商品が連続するよう商品でまとめ、
  // 新しく追加した商品グループほど先頭（降順）に出す
  const displayItems = useMemo(() => {
    // 各商品の最新の追加位置を記録（同一商品はこの値を共有しグループ化される）
    const latestIndexByProduct = new Map<string, number>()
    items.forEach((item, index) => latestIndexByProduct.set(item.productId, index))

    return [...items].sort((a, b) => {
      if (a.productId === b.productId) return 0
      return (
        (latestIndexByProduct.get(b.productId) ?? 0) - (latestIndexByProduct.get(a.productId) ?? 0)
      )
    })
  }, [items])

  // 注文失敗を共通のエラーダイアログ（AppWrapper）で通知する
  const notifyOrderError = () => {
    dispatch(setErrorMessage('注文できませんでした。時間をおいて再度お試しください。'))
    dispatch(setError(true))
  }

  // カートから1件削除
  const handleRemove = (uid: string) => dispatch(removeItem(uid))

  // 注文ボタン → 確認ダイアログを開く
  const handleRequestOrder = () => setIsConfirmOpen(true)

  // 確認ダイアログ「いいえ」
  const handleCancelOrder = () => setIsConfirmOpen(false)

  // 確認ダイアログ「はい」→ 注文送信
  const handleConfirmOrder = async () => {
    const liffAccessToken = liff.getAccessToken()
    if (!liffAccessToken) {
      setIsConfirmOpen(false)
      notifyOrderError()
      return
    }

    try {
      await postOrders({
        body: {
          // 同一商品も1点ずつの明細として送る（qty は常に1）
          orderList: items.map(item => ({
            productId: item.productId,
            name: item.name,
            qty: 1,
            price: item.price,
          })),
          liffAccessToken,
        },
      }).unwrap()

      // 成功: カートを空にして注文履歴へ遷移
      dispatch(clearCart())
      onClose()
      navigate('/order-history')
    } catch {
      notifyOrderError()
    } finally {
      // 成功・失敗いずれでも確認ダイアログを閉じる
      setIsConfirmOpen(false)
    }
  }

  return {
    items: displayItems,
    total,
    isConfirmOpen,
    isLoading,
    handleRemove,
    handleRequestOrder,
    handleCancelOrder,
    handleConfirmOrder,
  }
}
