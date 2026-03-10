import type { FC, ChangeEvent } from 'react'

import styles from './Privacy.module.scss'

type PrivacyProps = {
  checked?: boolean
  onChange?: (checked: boolean) => void
  url: string
  className?: string[]
}

/**
 * 個人情報同意のチェックボックスコンポーネント
 * @param checked チェックボックスの状態
 * @param onChange チェック状態が変更された時に呼ばれるコールバック関数
 * @param url 個人情報保護方針のURL
 */
export const Privacy: FC<PrivacyProps> = ({ checked, onChange, url, className = [] }) => {
  // チェックボックスの状態変更
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked)
  }

  return (
    <div className={[styles.privacy, ...className].join(' ')}>
      <label className={styles.label}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={handleChange}
        />
        <span className={styles.text}>
          当社における個人情報の取り扱いについて、
          <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
            プライバシーポリシー
          </a>
          に同意しました
        </span>
      </label>
    </div>
  )
}
