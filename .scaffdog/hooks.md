---
name: 'hooks'
root: 'src/hooks'
output: '**/*'
ignore: []
questions:
  name: 'hooksの名前を入力:'
---

# `use{{ inputs.name | pascal }}.ts`

```typescript
export const use{{inputs.name | pascal}} = () => {
  return null
}

```
