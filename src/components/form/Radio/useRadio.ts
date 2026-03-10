import { useState, useEffect } from 'react'

interface UseRadioProps {
  value?: string | number
  onChange?: (value: string) => void
}

export const useRadio = ({ value: externalValue, onChange }: UseRadioProps) => {
  const [selectedValue, setSelectedValue] = useState(externalValue || '')

  useEffect(() => {
    if (externalValue !== undefined) {
      setSelectedValue(externalValue)
    }
  }, [externalValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setSelectedValue(newValue)
    onChange?.(newValue)
  }

  return {
    selectedValue,
    handleChange,
  }
}
