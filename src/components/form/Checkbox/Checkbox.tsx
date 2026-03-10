import type { FC } from 'react'

import { useCheckbox } from './useCheckbox'

import styles from './Checkbox.module.scss'

interface CheckboxOption {
  label: string
  value: string | number
}

interface CheckboxProps extends Omit<React.JSX.IntrinsicElements['input'], 'type' | 'onChange'> {
  options: CheckboxOption[]
  name: string
  values?: (string | number)[]
  onChange?: (values: (string | number)[]) => void
  children?: React.ReactNode
}

/**
 * チェックボックスコンポーネント
 * @param options チェックボックスの選択肢
 * @param name チェックボックスグループの名前
 * @param values 選択された値の配列
 * @param onChange 値が変更された時のコールバック関数
 */
export const Checkbox: FC<CheckboxProps> = ({
  className = '',
  options,
  name,
  values = [],
  onChange,
  children,
  ...rest
}) => {
  const { selectedValues, handleChange } = useCheckbox({
    values,
    onChange,
  })

  const customClass = className ? [className] : []

  return (
    <div className={[styles.checkboxField, ...customClass].join(' ')}>
      {children}
      <ul className={styles.list}>
        {options.map(option => (
          <li key={option.value} className={styles.item}>
            <input
              {...rest}
              type="checkbox"
              name={name}
              id={`${name}-${option.value}`}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={handleChange}
              className={styles.input}
            />
            <label className={styles.label} htmlFor={`${name}-${option.value}`}>
              <svg viewBox="0 0 24 24">
                <path
                  fill="none"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"
                  className={styles.done}
                ></path>
              </svg>
              {option.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
