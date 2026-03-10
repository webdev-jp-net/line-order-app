import { useState, useEffect } from 'react'

interface UseExpectationProps {
  value?: number
  onChange?: (value: string) => void
}

export const useExpectation = ({ value, onChange }: UseExpectationProps) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(value)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

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