import { useState, useCallback } from 'react'

interface UseCheckboxProps {
  values?: (string | number)[]
  onChange?: (values: (string | number)[]) => void
}

export const useCheckbox = ({ values, onChange }: UseCheckboxProps) => {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(values || [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const isNumber = !isNaN(Number(value))
      const convertedValue = isNumber ? Number(value) : value

      let newValues: (string | number)[]

      if (selectedValues.includes(convertedValue)) {
        // 既に選択されている場合は削除
        newValues = selectedValues.filter(v => v !== convertedValue)
      } else {
        // 選択されていない場合は追加
        newValues = [...selectedValues, convertedValue]
      }

      setSelectedValues(newValues)

      if (onChange) {
        onChange(newValues)
      }
    },
    [selectedValues, onChange]
  )

  return {
    selectedValues,
    handleChange,
  }
}
