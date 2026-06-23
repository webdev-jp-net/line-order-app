import type { FC } from 'react'

import styles from './Radio.module.scss'

import { useRadio } from './useRadio'


interface RadioOption {
  label: React.ReactNode
  value: string | number
}

interface RadioProps extends Omit<React.JSX.IntrinsicElements['input'], 'type' | 'onChange'> {
  options: RadioOption[]
  name: string
  value?: string | number
  onChange?: (value: string) => void
  children?: React.ReactNode
}

/**
 * ラジオボタンコンポーネント
 * @param options ラジオボタンの選択肢
 * @param name ラジオボタングループの名前
 * @param value 初期値・制御値
 * @param onChange 値が変更された時のコールバック関数
 */
export const Radio: FC<RadioProps> = ({
  className = '',
  options,
  name,
  value,
  onChange,
  children,
  ...rest
}) => {
  const { selectedValue, handleChange } = useRadio({
    value,
    onChange,
  })

  const customClass = className ? [className] : []

  return (
    <div className={[styles.radioField, ...customClass].join(' ')}>
      {children}
      <ul className={styles.list}>
        {options.map(option => (
          <li key={option.value} className={styles.item}>
            <input
              {...rest}
              type="radio"
              name={name}
              id={`${name}-${option.value}`}
              value={option.value}
              checked={String(selectedValue) === String(option.value)}
              onChange={handleChange}
              className={styles.input}
            />
            <label className={styles.label} htmlFor={`${name}-${option.value}`}>
              {option.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
