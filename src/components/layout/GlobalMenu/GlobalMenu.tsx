import type { FC } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { UtensilsCrossed, ShoppingCart, History } from 'lucide-react'
import { useAppDispatch, useAppSelector } from 'store'
import { openCart, selectCartCount } from 'store/order'

import styles from './GlobalMenu.module.scss'

export const GlobalMenu: FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const cartCount = useAppSelector(selectCartCount)

  const isCurrent = (path: string) => location.pathname.startsWith(path)

  return (
    <nav className={styles.globalMenu}>
      <Link
        to="/home"
        className={styles.link}
        aria-current={isCurrent('/home') ? 'page' : undefined}
      >
        <div className={styles.icon}>
          <UtensilsCrossed className={styles.image} />
        </div>
        <p className={styles.label}>メニュー</p>
      </Link>

      <button type="button" className={styles.link} onClick={() => dispatch(openCart())}>
        <div className={styles.icon}>
          <ShoppingCart className={styles.image} />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </div>
        <p className={styles.label}>カート</p>
      </button>

      <Link
        to="/order-history"
        className={styles.link}
        aria-current={isCurrent('/order-history') ? 'page' : undefined}
      >
        <div className={styles.icon}>
          <History className={styles.image} />
        </div>
        <p className={styles.label}>注文履歴</p>
      </Link>
    </nav>
  )
}
