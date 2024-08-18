import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISuccessResponse } from '@models';
import Cookies from 'js-cookie';


const initialState: {isAuth: boolean; token: string} = {
  isAuth: false,
  token: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    selectIsAuth: state => state.isAuth,
  },
  reducers: {
    loginUser: (state, action: PayloadAction<ISuccessResponse>) => {
      Cookies.set('token', action.payload.token);

      state.token = action.payload.token
      state.isAuth = true
    },
    checkIsAuth: (state) => {
      const token = Cookies.get('token')

      if (token) {
        state.token = token
        state.isAuth = true
      }
    }, logout: (state) => {
      Cookies.remove('token')

      state.token = ''
      state.isAuth = false
    }
  }, extraReducers: builder => {

  }
})

export const { loginUser, checkIsAuth, logout } = authSlice.actions
export const { selectIsAuth } = authSlice.selectors

export default authSlice.reducer