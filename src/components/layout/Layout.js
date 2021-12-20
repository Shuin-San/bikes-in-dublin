import { Outlet } from 'react-router-dom'

// Components
import { Container, Grid } from '@mui/material'
import MenuBar from '../menuBar/MenuBar'

export default function Layout({ children }) {
    return (
        <Container maxWidth={false} disableGutters>
            <MenuBar />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    )
}
