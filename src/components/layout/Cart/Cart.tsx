import { type FC } from 'react'

import { useAppDispatch, useAppSelector } from 'store'
import { closeCart, selectIsCartOpen } from 'store/order'

import { Button } from 'components/ui/Button'
import { Dialog } from 'components/ui/Dialog'
import dialogStyles from 'components/ui/Dialog/Dialog.module.scss'

import styles from './Cart.module.scss'

import { useCart } from './useCart'

/**
 * カート
 * @description
 * - 追加した商品の一覧・削除・合計表示・注文確定をまとめたダイアログ
 * - 開閉はグローバル（order スライス）で管理し、グローバルナビから開く
 * - 「注文」押下で確認ダイアログを前面に表示し、「はい」で POST /orders を実行する
 */
export const Cart: FC = () => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectIsCartOpen)
  const close = () => dispatch(closeCart())

  const {
    items,
    total,
    isConfirmOpen,
    isLoading,
    handleRemove,
    handleRequestOrder,
    handleCancelOrder,
    handleConfirmOrder,
  } = useCart()

  return (
    <>
      {/* カート本体 */}
      <Dialog isOpen={isOpen} easyCloseMode={true} onClose={close}>
        <div className={`${dialogStyles.header} ${styles.header}`}>
          <h2 className={dialogStyles.title}>カート</h2>
          <Button type="button" variant="link" onClick={close}>
            ×
          </Button>
        </div>

        <div className={dialogStyles.body}>
          <ul className={styles.list}>
            {items.map(item => (
              <li key={item.uid} className={styles.item}>
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
                <div className={styles.detail}>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.price}>¥{item.price.toLocaleString()}</p>
                </div>
                <Button type="button" variant="link" onClick={() => handleRemove(item.uid)}>
                  削除
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <footer className={styles.footer}>
          <p className={styles.total}>合計 ¥{total.toLocaleString()}</p>
          <Button type="button" variant="basic" onClick={handleRequestOrder} disabled={items.length === 0}>
            注文
          </Button>
        </footer>
      </Dialog>

      {/* 注文の確認（前面） */}
      <Dialog isOpen={isConfirmOpen} easyCloseMode={false} onClose={handleCancelOrder}>
        <div className={dialogStyles.header}>
          <h2 className={dialogStyles.title}>注文の確認</h2>
        </div>
        <div className={dialogStyles.body}>
          <p className={dialogStyles.paragraph}>注文してもよいですか？</p>
        </div>
        <footer className={dialogStyles.footer}>
          <Button type="button" variant="basic" onClick={handleConfirmOrder} disabled={isLoading}>
            {isLoading ? '処理中' : 'はい'}
          </Button>
          <Button type="button" variant="minor" onClick={handleCancelOrder} disabled={isLoading}>
            いいえ
          </Button>
        </footer>
      </Dialog>
    </>
  )
}
