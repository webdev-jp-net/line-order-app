import type { FC } from 'react'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import { Loading } from 'components/layout/Loading'

import styles from './OrderHistory.module.scss'

import { useOrderHistory } from './useOrderHistory'

export const OrderHistory: FC = () => {
  const { orders, isLoading, isError, isEmpty } = useOrderHistory()

  return (
    <BaseLayout>
      <Head pageTitle="注文履歴" />
      <main className={styles.orderHistory} data-testid="order-history">
        <h1 className={styles.title}>注文履歴</h1>

        {isLoading && <Loading isBusy={isLoading} />}
        {isEmpty && <p className={styles.empty}>注文履歴がありません。</p>}

        {!isLoading && !isError && orders.length > 0 && (
          <ul className={styles.orderList}>
            {orders.map(order => (
              <li key={order.orderId} className={styles.order}>
                <div className={styles.orderHead}>
                  <p className={styles.date}>{order.date}</p>
                  <p className={styles.status}>{order.status}</p>
                </div>
                <ul className={styles.itemList}>
                  {order.items.map(item => (
                    <li key={item.key} className={styles.item}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemPrice}>¥{item.price.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.total}>合計 ¥{order.total.toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </BaseLayout>
  )
}
