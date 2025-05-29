import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      const exists = state.bookmarks.some(b => b.url === action.payload.url);
      if (!exists) state.bookmarks.unshift(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(b => b.url !== action.payload.url);
    },
    clearBookmarks: (state) => {
      state.bookmarks = [];
    }
  },
});

export const { addBookmark, removeBookmark, clearBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;