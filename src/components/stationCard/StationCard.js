// Hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Components
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Link,
    Typography,
} from '@mui/material'

//Redux actions 
import { addToFavs, removeFromFavs } from '../../features/stationsList/stationsListSlice'

// Import icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'



export default function StationCard({ station }) {
    const dispatch = useDispatch()
    const { favoriteStations } = useSelector(state => state.stations)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        if (favoriteStations.some(favStation => favStation.id === station.id)) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }

    }, [favoriteStations, station.id])

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavs(station))
            setIsFavorite(false)
        } else {
            dispatch(addToFavs(station))
            setIsFavorite(true)
        }
    }

    // Destructure Station data
    const {
        address,
        available_bike_stands,
        available_bikes,
        bike_stands,
        latitude,
        longitude,
        name,
    } = station

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <Typography variant="h5" component="div">
                                {name}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Address : {address}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Total bike capacity : {bike_stands}
                            </Typography>
                            <Typography variant="body1">
                                Available bikes : {available_bikes}
                                <br />
                                Available bike stands : {available_bike_stands}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Button onClick={() => toggleFavorite(station)}>
                                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container spacing={2} >
                        <Grid item xs>
                            <Link target="_blank" href={`https://www.google.com/maps/@${latitude},${longitude},20z`} sx={{ textDecoration: 'none' }}>
                                <Button variant="outlined" fullWidth>View on Google Maps</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Box >
    )
}