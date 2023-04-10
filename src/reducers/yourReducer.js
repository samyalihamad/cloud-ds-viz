// src/reducers/yourReducer.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: false,
  error: null,
};


export const getAllData = createAsyncThunk(
  '/data',
  async () => {
    const { data } = await axios.get('https://rmeilhyex1.execute-api.us-west-1.amazonaws.com/prod/gMaps/8,16/3,18');
    return data;
  }
);

const yourSlice = createSlice({
  name: 'yourSlice',
  initialState,
  reducers: {
    // fetchDataRequest: (state) => {
    //   state.loading = true;
    // },
    // fetchDataSuccess: (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    //   state.error = null;
    // },
    // fetchDataFailure: (state, action) => {
    //   state.loading = false;
    //   state.data = null;
    //   state.error = action.payload;
    // },
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
        state.data = null;
        state.error = action.payload;
      });
  }
});

// export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = yourSlice.actions;

// export const fetchData = () => async (dispatch) => {
//   dispatch(fetchDataRequest());
//   try {
//     const response = await axios.get('https://rmeilhyex1.execute-api.us-west-1.amazonaws.com/prod/gMaps/8,16/3,18');
//     console.log("response", response);
//     dispatch(fetchDataSuccess(response.data));
//   } catch (error) {
//     dispatch(fetchDataFailure(error.message));
//   }
// };



export default yourSlice.reducer;
