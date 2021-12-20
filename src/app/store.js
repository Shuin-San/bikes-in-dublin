import { configureStore } from '@reduxjs/toolkit'
import stationsListReducer from '../features/stationsList/stationsListSlice'


export const store = configureStore({
    reducer: {
        stations: stationsListReducer,
    },
})