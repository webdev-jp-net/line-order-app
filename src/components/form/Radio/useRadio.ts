import { useState } from 'react'

interface UseRadioProps {
  value?: string | number
  onChange?: (value: string) => void
}

export const useRadio = ({ value: externalValue, onChange }: UseRadioProps) => {
  const [selectedValue, setSelectedValue] = useState(externalValue ?? '')

  // 親から渡された値が変わったときだけ選択値を合わせる
  const [prevExternalValue, setPrevExternalValue] = useState(externalValue)
  if (!Object.is(externalValue, prevExternalValue)) {
    setPrevExternalValue(externalValue)
    if (externalValue !== undefined) {
      setSelectedValue(externalValue)
    }
  }

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
