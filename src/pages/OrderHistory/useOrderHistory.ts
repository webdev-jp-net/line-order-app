import { useMemo } from 'react'

import { useGetOrderHistoryQuery, type OrderStatus } from 'store/_apiClient'

import { formatDate, formatTime } from 'utils/day'

// 注文状態の日本語ラベル（dictionary.md の正本にしたがう）
const statusLabel: Record<OrderStatus, string> = {
  open: '注文受付',
  done: '準備完了',
  closed: '受渡完了',
}

// 表示する商品1行。個数(qty)は持たせず、同じ商品はqtyぶん行を並べる。
export type OrderHistoryRow = {
  key: string
  name: string
}

// オーダー単位の表示モデル
export type OrderHistoryView = {
  orderId: string
  date: string
  status: string
  items: OrderHistoryRow[]
}

export const useOrderHistory = () => {
  const { data, isLoading, isError } = useGetOrderHistoryQuery()

  const orders = useMemo<OrderHistoryView[]>(() => {
    const list = data?.orderList ?? []

    return [...list]
      // 日時降順
      .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
      .map(order => {
        const createdAt = order.createdAt ?? ''

        // 各明細を qty ぶんの行に展開（名称は注文データ）
        const items: OrderHistoryRow[] = (order.orderList ?? []).flatMap((item, itemIndex) => {
          const qty = item.qty ?? 1

          return Array.from({ length: qty }, (_, repeatIndex) => ({
            key: `${order.orderId ?? 'order'}-${itemIndex}-${repeatIndex}`,
            name: item.name,
          }))
        })

        return {
          orderId: order.orderId ?? '',
          date: [formatDate(createdAt), formatTime(createdAt)].filter(Boolean).join(' '),
          status: order.status ? statusLabel[order.status] : '',
          items,
        }
      })
  }, [data])

  return {
    orders,
    isLoading,
    isError,
    isEmpty: !isLoading && !isError && orders.length === 0,
  }
}
