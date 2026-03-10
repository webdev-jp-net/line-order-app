---
name: 'parts-component'
root: 'src/components'
output: '**/*'
ignore: []
questions:
  name: 'パーツコンポーネントの名前を入力:'
---

# `{{ inputs.name | pascal }}/index.ts`

```typescript
export { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}'

```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```typescript
import type { FC, ComponentProps } from 'react'

import styles from './{{ inputs.name | pascal }}.module.scss'

type {{ inputs.name | pascal }}Props = ComponentProps<'div'> & {
  children?: React.ReactNode
}

export const {{ inputs.name | pascal }}: FC<{{ inputs.name | pascal }}Props> = ({ children, ...props }) => {
  const customClass = [props.className]

  return (
    <div className={[styles.{{ inputs.name | camel }}, ...customClass].join(' ')} {...props}>
      <p>{{ inputs.name | pascal }}</p>
      {children}
    </div>
  )
}

```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.module.scss`

```scss
@use "style/_variable" as *;

.{{ inputs.name | camel }} {
  position: relative;
}

```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.stories.tsx`

```typescript
import { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof {{ inputs.name | pascal }}> = {
  title: 'parts/{{ inputs.name | pascal }}',
  component: {{ inputs.name | pascal }},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="decorator center">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

```
