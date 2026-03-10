import type { FC, ReactNode } from 'react'

import { useCopyToClipboard } from 'hooks/useCopyToClipboard'
import { Copy } from 'lucide-react'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import { Button } from 'components/ui/Button'
import { Dialog } from 'components/ui/Dialog'

import styles from './MenuSupport.module.scss'

import { useMenuSupport } from './useMenuSupport'

export const MenuSupport: FC = () => {
  const { browsingCondition, systemSupport, fullSupportText } = useMenuSupport()

  const successMessage: ReactNode = (
    <>
      <h2 className={styles.subTitle}>サポート情報をコピーしました</h2>
      <p className={styles.paragraph}>フォームを開き、内容の詳細にペーストしてください。</p>
    </>
  )

  const {
    handleCopyText: handleCopyToClipboard,
    openDialog: isDialogOpen,
    setOpenDialog: setIsDialogOpen,
    message: dialogMessage,
  } = useCopyToClipboard({
    text: fullSupportText,
    successMessage,
  })

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <BaseLayout>
      <Head pageTitle="システム情報" />
      <main className={styles.menuSupport} data-testid="menu-support">
        <header className={styles.header}>
          <h1 className={styles.title}>システム情報</h1>
          <p className={styles.description}>
            サポートが必要な場合、サポート情報をコピーしてお問い合わせください。
          </p>
        </header>
        <div className={styles.body}>
          <div className={styles.table}>
            {browsingCondition.map(item => (
              <dl className={styles.row} key={item.label}>
                <dt className={styles.label}>{item.label}</dt>
                <dd className={styles.value}>{item.value}</dd>
              </dl>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <Button onClick={handleCopyToClipboard} variant="minor" size="full" tailIcon={Copy}>
            サポート情報をコピー
          </Button>

          <Button
            onClick={() => window.open(systemSupport, '_blank', 'noreferrer')}
            variant="basic"
            size="full"
          >
            システムサポートへ
          </Button>
        </div>
      </main>

      <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog} easyCloseMode={true}>
        {dialogMessage}
        <div className={styles.footer}>
          <Button
            onClick={() => window.open(systemSupport, '_blank', 'noreferrer')}
            variant="basic"
            size="full"
          >
            フォームを開く
          </Button>
        </div>
      </Dialog>
    </BaseLayout>
  )
}
