import type { FC } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { UtensilsCrossed, type LucideIcon } from 'lucide-react'

import styles from './GlobalMenu.module.scss'

type MenuItem = {
  to: string
  variant: string
  label: string
  icon: LucideIcon
}

const menuItems: MenuItem[] = [
  { to: '/home', variant: 'menu', label: 'メニュー', icon: UtensilsCrossed },
]

export const GlobalMenu: FC = () => {
  const location = useLocation()

  const isCurrentPath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className={styles.globalMenu}>
      {menuItems.map(item => {
        const isCurrent = isCurrentPath(item.to)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={styles.link}
            aria-current={isCurrent ? 'page' : undefined}
          >
            <div className={styles.icon}>
              <item.icon className={styles.image} />
            </div>
            <p className={styles.label}>{item.label}</p>
          </Link>
        )
      })}
    </nav>
  )
}
