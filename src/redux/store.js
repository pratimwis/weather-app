import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './slice/WeatherSlice'
import searchHistoryReducer from './slice/SearchHistory'
import bookmarkReducer from './slice/BookmarkSlice'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    searchHistory: searchHistoryReducer,
    bookmarks: bookmarkReducer,
  },
})