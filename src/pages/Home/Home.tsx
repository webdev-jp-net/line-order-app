import { type FC, useState } from 'react'

import menuData from 'data/menu.json'
import { useAppDispatch } from 'store'
import { addItem } from 'store/order'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import { Cart } from 'components/layout/Cart'
import { Button } from 'components/ui/Button'

import styles from './Home.module.scss'

import type { MenuItem } from 'types/menu'

const menu = menuData as MenuItem[]

export const Home: FC = () => {
  const dispatch = useAppDispatch()
  const [isCartOpen, setIsCartOpen] = useState(false)

  // 商品を1点カートへ追加
  const handleAdd = (item: MenuItem) =>
    dispatch(
      addItem({
        productId: item.id,
        name: item.name,
        price: item.price,
        mainImage: item.mainImage,
      })
    )

  return (
    <BaseLayout showGlobalMenu={false}>
      <Head pageTitle="メニュー" />
      <main className={styles.menu} data-testid="home">
        <div className={styles.heading}>
          <h1 className={styles.title}>メニュー</h1>
          <Button type="button" variant="basic" onClick={() => setIsCartOpen(true)}>
            カート
          </Button>
        </div>
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
                <Button
                  type="button"
                  variant="accent"
                  size="liquid"
                  className={styles.cart}
                  onClick={() => handleAdd(item)}
                >
                  追加
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </BaseLayout>
  )
}
