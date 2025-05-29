import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchHistory: [{
    name: "",
    region: "",
    country: "",
    url: ""
  }]
}


const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    // setSearchHistory: (state, action) => {
      
      
    // },
    clearSearchHistory: (state) => {
      state.location = {};
      state.current = {};
      state.forecast = {};
    }
  },
});

export const { setSearchHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer


