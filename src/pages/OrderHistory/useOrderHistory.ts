import { useMemo } from 'react'

import { useGetOrderHistoryQuery, type OrderStatus } from 'store/_apiClient'

import { formatDate, formatTime } from 'utils/day'

const statusLabel: Record<OrderStatus, string> = {
  open: '注文受付',
  done: '準備完了',
  closed: '受渡完了',
}

export type OrderHistoryRow = {
  key: string
  name: string
  price: number
}

export type OrderHistoryView = {
  orderId: string
  date: string
  status: string
  items: OrderHistoryRow[]
  total: number
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

        const orderList = order.orderList ?? []

        // 各明細をqtyぶんの行に展開
        const items: OrderHistoryRow[] = orderList.flatMap((item, itemIndex) => {
          const qty = item.qty ?? 1

          return Array.from({ length: qty }, (_, repeatIndex) => ({
            key: `${order.orderId ?? 'order'}-${itemIndex}-${repeatIndex}`,
            name: item.name,
            price: item.price ?? 0,
          }))
        })

        // 合計金額（単価 × 数量 の総和）
        const total = orderList.reduce((sum, item) => sum + (item.price ?? 0) * (item.qty ?? 1), 0)

        return {
          orderId: order.orderId ?? '',
          date: [formatDate(createdAt), formatTime(createdAt)].filter(Boolean).join(' '),
          status: order.status ? statusLabel[order.status] : '',
          items,
          total,
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
