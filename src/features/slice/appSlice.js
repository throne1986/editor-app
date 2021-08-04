import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
};

export const appSlice = createSlice({
  name: 'counter',
  initialState,
});

export default appSlice.reducer;
