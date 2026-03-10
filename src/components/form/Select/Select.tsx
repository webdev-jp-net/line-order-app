import type { FC } from 'react'

import { ChevronDown } from 'lucide-react'

import styles from './Select.module.scss'

export type SelectOption = {
  label: string
  value: string | number
}

type SelectProps = React.JSX.IntrinsicElements['select'] & {
  children?: React.ReactNode
  option: SelectOption[]
  name: string
  handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  placeholder?: string
}

export const Select: FC<SelectProps> = props => {
  const {
    className,
    value,
    option,
    handleChange,
    children,
    name,
    placeholder = '選択してください',
    ...rest
  } = props
  const customClass = [className]

  return (
    <div className={[styles.select, ...customClass].join(' ')}>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={styles.selectElement}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {children}
        {option.map((item: SelectOption) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <ChevronDown className={styles.icon} />
    </div>
  )
}
