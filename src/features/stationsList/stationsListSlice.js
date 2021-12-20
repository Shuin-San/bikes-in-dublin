// Libraries
import axios from 'axios'

// Redux Toolkit related imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    stations: [],
    currentStation: null,
    favoriteStations: [],
    hasError: false,
    errorMessage: '',
    state: 'idle'
}


/* 
    * Fetch Data - For time being, we are using a static JSON file,
    * but in real world, we would be using a REST API to fetch the data
    * from the backend server using proper routing and data caching mechanisms
    * to avoid unnecessary requests. 
*/
export const fetchStationsList = createAsyncThunk('stationsList/fetchStations', async () => {
    const response = await axios.get('https://app-media.noloco.app/noloco/dublin-bikes-api.json')
    // sort the stations by name
    return response.data.sort((a, b) => a.name.localeCompare(b.name))
})

export const stationsListSlice = createSlice({
    name: 'stations',
    initialState,
    reducers: {
        setCurrentStation: (state, { payload }) => {
            state.currentStation = state.stations.filter(station => station.id === payload.id)[0]
        },
        addToFavs: (state, { payload }) => {
            state.favoriteStations = [...state.favoriteStations, payload]
            // Keep the station off the main stations list
            state.stations = state.stations.filter(station => station.id !== payload.id)
            // Order favorite stations by name
            state.favoriteStations = state.favoriteStations.sort((a, b) => a.name.localeCompare(b.name))
        },
        removeFromFavs: (state, { payload }) => {
            state.favoriteStations = state.favoriteStations.filter(station => station.id !== payload.id)
            // Add the station back to the main stations list
            state.stations = [...state.stations, payload]
            // make sure the order is respected
            state.stations.sort((a, b) => a.name.localeCompare(b.name))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStationsList.fulfilled, (state, { payload }) => {
            state.stations = payload
            state.status = 'resolved'
        })
        builder.addCase(fetchStationsList.rejected, (state, { error }) => {
            state.hasError = true
            state.errorMessage = error.message
            state.status = 'failed'
        })
        builder.addCase(fetchStationsList.pending, (state) => {
            state.status = 'pending'
        })
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentStation, addToFavs, removeFromFavs } = stationsListSlice.actions

export default stationsListSlice.reducer