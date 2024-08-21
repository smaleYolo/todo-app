import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Tag } from '@models';
import { api } from '@api';
import toast from 'react-hot-toast';
import { LoadingStatuses } from '../../models/settings.ts';

interface userState {
  tags: Tag[],
  loading: LoadingStatuses,
}

const initialState: userState = {
  tags: [],
  loading: 'idle',
}

export const fetchUserTags = createAsyncThunk(
  'user/fetchUserTags',
  async(_, thunkAPI) => {
    try {
      return await api.getAllTags()
    } catch (error){
      return thunkAPI.rejectWithValue((error as Error).message || 'Failed to fetch tags');
    }
  }
)


export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectTags: state => state.tags
  },
  reducers: {
  }, extraReducers: builder => {

    //FetchUserTags
    builder.addCase(fetchUserTags.fulfilled, (state, action) => {
      state.tags = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchUserTags.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchUserTags.rejected, (state, action) => {
      state.loading = 'failed';

      toast.error('Failed to fetch tags')
    });
  }
})

export const {  } = userSlice.actions
export const { selectTags } = userSlice.selectors

export default userSlice.reducer