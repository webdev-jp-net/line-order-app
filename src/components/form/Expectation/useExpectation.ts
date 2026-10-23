import { useState } from 'react'

interface UseExpectationProps {
  value?: number
  onChange?: (value: string) => void
}

export const useExpectation = ({ value, onChange }: UseExpectationProps) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(value)

  // 親から渡された値が変わったときだけ選択値を合わせる
  const [prevValue, setPrevValue] = useState(value)
  if (!Object.is(value, prevValue)) {
    setPrevValue(value)
    setSelectedValue(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSelectedValue(Number(newValue))
    onChange?.(newValue)
  }

  return {
    selectedValue,
    handleChange,
  }
}
