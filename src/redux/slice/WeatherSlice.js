import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  location:{},
  current:{},
  forecast:{}
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state,payload) => {
      state.location = payload.payload.location;
      state.current = payload.payload.current;
      state.forecast = payload.payload.forecast;
    },
   
  },
})

export const { setWeather } = weatherSlice.actions

export default weatherSlice.reducer
