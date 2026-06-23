import type { FC } from 'react'

import styles from './Textarea.module.scss'

import { useTextarea } from './useTextarea'


interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: React.ReactNode
  defaultValue?: string
  name: string
  syncValue?: (value: string) => void
  showCounter?: boolean
}

/**
 * 入力値を整形して表示するTextareaコンポーネント
 * @param children 親コンポーネントから渡される子要素
 * @param syncValue フォーカスが外れた時のコールバック関数（整形後の値を親コンポーネントに渡す）
 * @param showCounter 文字数カウンターを表示するかどうか
 */
export const Textarea: FC<TextareaProps> = ({
  children,
  syncValue,
  defaultValue,
  name,
  maxLength = 500,
  showCounter = true,
  ...props
}) => {
  const { inputValue, handleChange, formatValue, currentLength, isMaxLength } = useTextarea({
    syncValue,
    defaultValue,
    maxLength,
  })
  const customClass = props.className ? [props.className] : []

  return (
    <div className={[styles.textarea, ...customClass].join(' ')}>
      {children}
      <textarea
        {...props}
        name={name}
        value={inputValue}
        onChange={handleChange}
        onBlur={() => formatValue(inputValue)}
        maxLength={maxLength}
        className={isMaxLength ? styles.maxLength : ''}
      />
      {showCounter && (
        <p className={styles.counter}>
          <span className={isMaxLength ? styles.maxLength : ''}>{currentLength}</span>
          <span>/</span>
          <span>{maxLength}</span>
        </p>
      )}
    </div>
  )
}
