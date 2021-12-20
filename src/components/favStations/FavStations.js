import { Grid } from '@mui/material'

import { useSelector } from 'react-redux'


import StationCard from '../stationCard/StationCard'

export default function FavStations({ filters }) {
    const { favoriteStations } = useSelector(state => state.stations)
    const { nameFilter, availableBikesFilter, availableStandsFilter } = filters
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {favoriteStations.filter(
                    station => station.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase())
                        && station.available_bike_stands >= availableStandsFilter
                        && station.available_bikes >= availableBikesFilter
                ).map(favStation => (
                    <Grid key={favStation.id} item xs={12}>
                        <StationCard
                            station={favStation}
                        />
                    </Grid>
                ))}
                <hr />
            </Grid>
        </Grid>
    )
}
