import type { FC } from 'react'

import menuData from 'data/menu.json'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import styles from './Home.module.scss'

import type { MenuItem } from 'types/menu'


const menu = menuData as MenuItem[]

export const Home: FC = () => {
  return (
    <BaseLayout showGlobalMenu={false}>
      <Head pageTitle="メニュー" />
      <main className={styles.menu} data-testid="home">
        <h1 className={styles.title}>メニュー</h1>
        <ul className={styles.list}>
          {menu.map(item => (
            <li key={item.id} className={styles.item}>
              {item.mainImage && (
                <img
                  className={styles.image}
                  src={item.mainImage.url}
                  alt={item.name}
                  width={item.mainImage.width}
                  height={item.mainImage.height}
                  loading="lazy"
                />
              )}
              <div className={styles.body}>
                <p className={styles.category}>{item.category.name}</p>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.price}>¥{item.price.toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </BaseLayout>
  )
}
