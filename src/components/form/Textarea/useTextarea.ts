import { useState, useEffect } from 'react'

interface UseTextareaProps {
  syncValue?: (value: string) => void
  defaultValue?: string
  maxLength?: number
}

export const useTextarea = ({ syncValue, defaultValue = '', maxLength }: UseTextareaProps) => {
  // 入力値
  const [inputValue, setInputValue] = useState(defaultValue)
  
  // defaultValueが変更されたときに入力値を更新
  useEffect(() => {
    if (defaultValue !== undefined) {
      setInputValue(defaultValue)
    }
  }, [defaultValue])

  const currentLength = inputValue.length

  // 入力値が最大文字数を超えているかどうか
  const isMaxLength = maxLength ? currentLength >= maxLength : false

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    if (maxLength && newValue.length > maxLength) return

    setInputValue(newValue)
  }

  // フォーカスが外れた時に入力値を整形して親コンポーネントに渡す
  const formatValue = (value: string) => {
    const formattedValue = value.trim()
    setInputValue(formattedValue)
    syncValue?.(formattedValue)
  }

  return {
    inputValue,
    handleChange,
    formatValue,
    currentLength,
    isMaxLength,
  }
}
