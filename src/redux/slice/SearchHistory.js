import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchHistory: [],
 
}


const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    setSearchHistory: (state, action) => {
      const { name, region, country, url, current } = action.payload.locationData;
      const alreadyExists = state.searchHistory.some(entry => entry.url === url);
      if (alreadyExists) {
        return; 
      }
      const newEntry = { name, region, country, url ,current};
      state.searchHistory.unshift(newEntry);
      if (state.searchHistory.length > 5) {
        state.searchHistory.pop();
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [{
        name: "",
        region: "",
        country: "",
        url: ""
      }]
    },
 
  },
});

export const { setSearchHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer


