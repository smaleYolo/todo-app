import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ILoginValues } from '@models';
import Cookies from 'js-cookie';
import { api } from '@api';
import { LoadingStatuses } from '../../models/settings.ts';


interface AuthState {
  isAuth: boolean;
  loading: LoadingStatuses,
  error?: string;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: ILoginValues, thunkAPI) => {
    try {
      const { token } = await api.login({ username, password });

      Cookies.set('token', token)

      return token
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message || 'Failed to login');
    }
  }
);


const initialState: AuthState = {
  isAuth: false,
  loading: 'idle',
  error: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    selectIsAuth: state => state.isAuth,
    selectIsAuthLoading: state => state.loading
  },
  reducers: {
    checkIsAuth: state => {
      const token = Cookies.get('token')
      if(token){
        state.isAuth = true
      }
    },
    logout: state => {
      state.isAuth = false

      Cookies.remove('token')
    }
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuth = true
      state.loading = 'succeeded'
    })
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.error.message
    })
  }
});

export const {checkIsAuth, logout} = authSlice.actions;
export const { selectIsAuth, selectIsAuthLoading } = authSlice.selectors;

export default authSlice.reducer;