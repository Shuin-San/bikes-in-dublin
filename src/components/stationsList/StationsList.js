// Hooks
import { useSelector } from 'react-redux'

// UI Components
import { Grid } from "@mui/material"
import StationCard from "../stationCard/StationCard"


export default function StationsList({ filters }) {
    // Initialize Hooks
    const { stations } = useSelector(state => state.stations)

    // Destructure filters
    const { nameFilter, availableStandsFilter, availableBikesFilter } = filters

    return (
        <Grid container spacing={2} alignItems="center" justifyItems="center">
            {stations.filter(
                station => station.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase())
                    && station.available_bike_stands >= availableStandsFilter
                    && station.available_bikes >= availableBikesFilter
            ).map(station => (
                <Grid key={station.id} item xs={12}>
                    <StationCard station={station} />
                </Grid>
            ))}
        </Grid>
    )
}
