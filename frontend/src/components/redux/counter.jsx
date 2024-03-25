import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "LOGIN",
  name:"NAME:",
  id:"ID:",
  location:"Location:"
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value = action.payload
    },
    incrementName: (state, action) => {
      state.name = action.payload
    },
    incrementId: (state, action) => {
      state.id = action.payload
    },
    incrementLocation: (state, action) => {
      state.location = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, incrementName , incrementId, incrementLocation} = counterSlice.actions

export default counterSlice.reducer