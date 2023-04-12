// src/reducers/yourReducer.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Point {
  x: number;
  y: number;
}

interface Edge {
  a: Point;
  b: Point;
}

interface YourState {
  data: Edge[];
  loading: boolean;
  error: any;
}

const initialState: YourState = {
  data: [],
  loading: false,
  error: null,
};

export const getAllData = createAsyncThunk<Edge[]>(
  '/data',
  async () => {
    let { data } = await axios.get<Edge[]>('https://rmeilhyex1.execute-api.us-west-1.amazonaws.com/prod/gMaps/8,16/3,18');
    console.log('data', data);
    data = [
      {
        a: {
          x: 0,
          y: 0
        },
        b: {
          x: 1,
          y: 1
        }
      }
    ]
    return data;
  }
);

const yourSlice = createSlice({
  name: 'yourSlice',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload;
      });
  }
});

export default yourSlice.reducer;
