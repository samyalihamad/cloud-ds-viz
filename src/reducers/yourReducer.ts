// src/reducers/yourReducer.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface YourState {
  gMapsResponse: gMapsResponse;
  loading: boolean;
  error: any;
}

const initialState: YourState = {
  gMapsResponse: {
    vicinityPaths: [],
    shortestPaths: []
  },
  loading: false,
  error: null,
};

export const getAllData = createAsyncThunk<gMapsResponse>(
  '/data',
  async () => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const config = {
      headers: {
        'x-api-key': apiKey,
      }
    }
    
    const response = await axios.get<gMapsResponse>(
      'https://rmeilhyex1.execute-api.us-west-1.amazonaws.com/prod/gMaps/1,11/14,7',
      config);
    
    console.log('response', response.data);
    return response.data;
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
        state.gMapsResponse = action.payload;
        state.error = null;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.gMapsResponse = {
          vicinityPaths: [],
          shortestPaths: []
        };
        state.error = action.payload;
      });
  }
});

export default yourSlice.reducer;


// console.log('data', data);
    // let data = [
    //   {
    //     a: {
    //       x: 1,
    //       y: 0
    //     },
    //     b: {
    //       x: 0,
    //       y: 0
    //     }
    //   },
    //   {
    //     a: {
    //       x: 1,
    //       y: 0
    //     },
    //     b: {
    //       x: 4,
    //       y: 3
    //     }
    //   },
    //   {
    //     a: {
    //       x: 1,
    //       y: 0
    //     },
    //     b: {
    //       x: 3,
    //       y: 4
    //     }
    //   },
    //   {
    //     a: {
    //       x: 0,
    //       y: 0
    //     },
    //     b: {
    //       x: 0,
    //       y: 4
    //     }
    //   },
    //   {
    //     a: {
    //       x: 1,
    //       y: 0
    //     },
    //     b: {
    //       x: 0,
    //       y: 4
    //     }
    //   },
    //   {
    //     a: {
    //       x: 3,
    //       y: 4
    //     },
    //     b: {
    //       x: 0,
    //       y: 4
    //     }
    //   },
    //   {
    //     a: {
    //       x: 4,
    //       y: 3
    //     },
    //     b: {
    //       x: 3,
    //       y: 4
    //     }
    //   }
    // ];
    // let path = [
    //   {
    //     a: {
    //       x: 4,
    //       y: 3
    //     },
    //     b: {
    //       x: 3, 
    //       y: 4
    //     }
    //   },
    //   {
    //     a: {
    //       x: 3,
    //       y: 4
    //     },
    //     b: {
    //       x: 0,
    //       y: 4
    //     }
    //   }
    // ]