import { type FC } from 'react'

import menuData from 'data/menu.json'
import { useAppDispatch } from 'store'
import { addItem, openCart } from 'store/order'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import { Button } from 'components/ui/Button'

import styles from './Home.module.scss'

import type { MenuItem } from 'types/menu'

type MenuGroup = { category: MenuItem['category']; items: MenuItem[] }

const menu = menuData as MenuItem[]

// カテゴリ単位でまとめる（出現順を保持）
const menuGroups: MenuGroup[] = Object.values(
  menu.reduce<Record<string, MenuGroup>>((groups, item) => {
    const key = item.category.id
    if (!groups[key]) groups[key] = { category: item.category, items: [] }
    groups[key].items.push(item)
    return groups
  }, {})
)

export const Home: FC = () => {
  const dispatch = useAppDispatch()

  // 商品を1点カートへ追加し、カートを開く
  const handleAdd = (item: MenuItem) => {
    dispatch(
      addItem({
        productId: item.id,
        name: item.name,
        price: item.price,
        mainImage: item.mainImage,
      })
    )
    dispatch(openCart())
  }

  return (
    <BaseLayout>
      <Head pageTitle="メニュー" />
      <main className={styles.menu} data-testid="home">
        <h1 className={styles.title}>メニュー</h1>
        {menuGroups.map(group => (
          <section key={group.category.id} className={styles.category}>
            <h2 className={styles.categoryName}>{group.category.name}</h2>
            <ul className={styles.list}>
              {group.items.map(item => (
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
          </section>
        ))}
      </main>
    </BaseLayout>
  )
}
