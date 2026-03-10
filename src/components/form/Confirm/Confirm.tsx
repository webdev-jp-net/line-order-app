import { type FC, type ComponentProps, useCallback } from 'react'

import { useNavigate } from 'react-router-dom'

import styles from './Confirm.module.scss'

type Items = Record<
  string,
  {
    label: string
    value: string
    path: string
  }
>

type ConfirmProps = ComponentProps<'div'> & {
  items: Items
  isEditable?: boolean
}

/**
 * 入力内容の確認
 */
export const Confirm: FC<ConfirmProps> = ({ items, isEditable, ...props }) => {
  const { className, ...otherProps } = props
  const customClass = [className]

  const navigate = useNavigate()

  const doEdit = useCallback(
    (path: string) => {
      if (!path) return

      navigate(path)
    },
    [navigate]
  )

  return (
    <div className={[styles.confirm, ...customClass].join(' ')} {...otherProps}>
      {Object.entries(items).map(([key, { label, value, path }]) => (
        <dl key={key} className={styles.dl} onClick={() => doEdit(path)}>
          <dt className={styles.dt}>{label}</dt>
          <dd className={styles.dd}>
            <span>{value || ''}</span>

            {isEditable && (
              <span className={styles.editGuide}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.editIcon}
                  viewBox="0 0 24 24"
                >
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
                編集
              </span>
            )}
          </dd>
        </dl>
      ))}
    </div>
  )
}
