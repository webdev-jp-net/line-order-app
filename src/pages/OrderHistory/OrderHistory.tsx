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
        <h1>注文履歴</h1>

        {isLoading && <Loading isBusy={isLoading} />}
        {isEmpty && <p>注文履歴がありません。</p>}

        {!isLoading && !isError && orders.length > 0 && (
          <ul className={styles.list}>
            {orders.map(order => (
              <li key={order.orderId} className={styles.order}>
                <div className={styles.orderHead}>
                  <p>{order.date}</p>
                  <p>{order.status}</p>
                </div>
                <ul className={styles.items}>
                  {order.items.map(item => (
                    <li key={item.key}>{item.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </main>
    </BaseLayout>
  )
}
