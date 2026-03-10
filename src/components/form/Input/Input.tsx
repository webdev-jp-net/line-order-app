import type { FC } from 'react'

import { useInput } from './useInput'

import styles from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  defaultValue?: string
  name: string
  type?: string
  syncValue?: (value: string) => void
}

/**
 * 入力値を整形して表示するInputコンポーネント
 * @param children 親コンポーネントから渡される子要素
 * @param syncValue フォーカスが外れた時のコールバック関数（整形後の値を親コンポーネントに渡す）
 */
export const Input: FC<InputProps> = ({
  children,
  syncValue,
  defaultValue,
  name,
  type,
  ...props
}) => {
  const { inputValue, handleChange, formatValue } = useInput({
    syncValue,
    defaultValue,
  })
  const customClass = props.className ? [props.className] : []

  return (
    <div className={[styles.input, ...customClass].join(' ')}>
      {children}
      <input
        {...props}
        name={name}
        type={type || 'text'}
        value={inputValue}
        onChange={handleChange}
        onBlur={() => formatValue(inputValue)}
      />
    </div>
  )
}
