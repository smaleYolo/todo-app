import { createSlice } from '@reduxjs/toolkit'



export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    increment: (state) => {

    }
  }, extraReducers: builder => {

  }
})

export const { increment } = userSlice.actions

export default userSlice.reducer