import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './slice/WeatherSlice'

export const store = configureStore({
  reducer: {
    weather: weatherReducer
  },
})