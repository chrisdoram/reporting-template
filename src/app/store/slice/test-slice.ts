import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@app/store'

const INITIAL_STATE = {
  test: 1,
}

const testSlice = createSlice({
  name: 'slice/test',
  initialState: INITIAL_STATE,
  reducers: {
    testSet(state, action: PayloadAction<number>) {
      state.test = action.payload
    },
  },
})

export const { testSet } = testSlice.actions

export const selectTest = (state: RootState) => state.test

export default testSlice.reducer
