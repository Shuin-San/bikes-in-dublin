// Hooks
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

// UI Components
import { Container, Grid, LinearProgress, Slider, TextField, Typography } from "@mui/material"
// import StationCard from "../stationCard/StationCard"
import StationsList from '../stationsList/StationsList'
import FavStations from '../favStations/FavStations'


// Import Redux Actions
import { fetchStationsList } from '../../features/stationsList/stationsListSlice'

export default function Stations() {
    // Initialize Hooks
    const dispatch = useDispatch()
    const [nameFilter, setNameFilter] = useState('')
    const [availableBikesFilter, setAvailableBikesFilter] = useState(0)
    const [availableStandsFilter, setAvailableStandsFilter] = useState(0)
    const { errorMessage, hasError, status } = useSelector(state => state.stations)
    // On load fetch stations list
    useEffect(() => { dispatch(fetchStationsList()) }, [dispatch])


    return (
        <Container maxWidth="lg">
            <Grid container spacing={2} alignItems="center" justifyItems="center">
                <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center">Filters</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setNameFilter(e.target.value.toLocaleLowerCase())} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                align="center">
                                Minimum available bike stands
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Slider
                                name="minFreeStands"
                                label="Available stands min"
                                onChange={(e) => setAvailableStandsFilter(e.target.value)}
                                valueLabelDisplay="auto"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                align="center">
                                Minimum available bikes
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Slider
                                name="minAvailableBikes"
                                label="Available bikes min"
                                onChange={(e) => setAvailableBikesFilter(e.target.value)}
                                valueLabelDisplay="auto" />
                        </Grid>
                    </Grid>
                    <hr />
                </Grid>
                <Grid item xs={12}>
                    {status === 'pending' && <LinearProgress />}
                    {hasError && <Typography variant="body1" align="center">{errorMessage}</Typography>}
                </Grid>
                <Grid item xs={12}>
                    {status === 'resolved' && !hasError && <FavStations filters={{ nameFilter, availableStandsFilter, availableBikesFilter }} />}
                </Grid>
                <Grid item xs={12}>
                    {status === 'resolved' && !hasError && <StationsList filters={{ nameFilter, availableStandsFilter, availableBikesFilter }} />}
                </Grid>
            </Grid >
        </Container>
    )
}
