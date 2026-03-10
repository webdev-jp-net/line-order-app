// SelectのProps型に合うように、Optionの構造をvalue, labelに変換
export const createSelectOption = (options: Record<string | number, string>) => {
  return Object.entries(options).map(([value, label]) => ({
    value,
    label,
  }))
}
