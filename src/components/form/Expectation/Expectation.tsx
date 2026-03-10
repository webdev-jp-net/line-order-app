import type { FC } from 'react'

import styles from './Expectation.module.scss'

import { useExpectation } from './useExpectation'

export interface ExpectationOption {
  label: React.ReactNode
  value: number
}

interface ExpectationProps extends Omit<JSX.IntrinsicElements['input'], 'type' | 'onChange'> {
  options?: ExpectationOption[]
  name: string
  value?: number
  onChange?: (value: string) => void
  children?: React.ReactNode
}

const DEFAULT_OPTIONS: ExpectationOption[] = [
  { label: '低い', value: 0 },
  { label: 'やや低い', value: 1 },
  { label: 'やや高い', value: 2 },
  { label: '高い', value: 3 },
]

/**
 * 4段階評価の期待値選択コンポーネント
 * @param options 選択肢（デフォルトは0-3の4段階）
 * @param name グループの名前
 * @param value 初期値・制御値（0-3の数値）
 * @param onChange 値が変更された時のコールバック関数
 */
export const Expectation: FC<ExpectationProps> = ({
  className = '',
  options = DEFAULT_OPTIONS,
  name,
  value,
  onChange,
  children,
  ...rest
}) => {
  const { selectedValue, handleChange } = useExpectation({
    value,
    onChange,
  })

  const customClass = className ? [className] : []

  return (
    <div className={[styles.expectation, ...customClass].join(' ')}>
      {children}
      <div className={styles.expectationGroup}>
        {options.map(option => (
          <label key={option.value} className={styles.expectationLabel}>
            <input
              {...rest}
              type="radio"
              name={name}
              value={option.value}
              checked={String(selectedValue) === String(option.value)}
              onChange={handleChange}
              className={styles.expectationInput}
            />
            <span className={styles.expectationText}>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
