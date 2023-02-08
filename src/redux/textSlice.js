import { createSlice } from "@reduxjs/toolkit"

const initialState = {value: "",}

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    enterText: (state, action) => {
      state.value = action.payload
    },
    editText: (state, action) => {
      state = action.payload
    },
  },
})

export const {
  enterText,
  editText
} = textSlice.actions
export default textSlice.reducer
