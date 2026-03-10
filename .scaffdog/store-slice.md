---
name: 'store-slice'
root: 'src/store'
output: '**/*'
ignore: []
questions:
  name: 'スライスの名前を入力:'
---

# `{{ inputs.name | camel }}.ts`

```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  data: any
}

const initialState: State = {
  data: false,
}

const {{ inputs.name | camel }} = createSlice({
  name: '{{ inputs.name | camel }}',

  initialState,

  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        data: action.payload,
      }
    },
  },
})

// Action Creator
export const { setData } = {{ inputs.name | camel }}.actions

// Reducer
export default {{ inputs.name | camel }}.reducer

```
