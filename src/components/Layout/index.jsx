import { Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Layout() {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={darkTheme}>
            <ScopedCssBaseline>
                <AppBar position='static'>
                    <Container >
                        <Toolbar disableGutters>
                            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                                Portfolio - alvarorom3
                            </Typography>
                            <Button color='inherit' onClick={() => { navigate('/') }}>
                                Home
                            </Button>
                            <Button variant='outlined' sx={{ fontWeight: 'bold' }} onClick={() => { navigate('/create') }}>
                                Crear nuevo proyecto
                            </Button>
                        </Toolbar>

                    </Container>
                </AppBar>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        minHeight: '100vh',
                        paddingBottom: '3em'
                    }}
                >
                    <Outlet />
                </Container>
            </ScopedCssBaseline>
        </ThemeProvider>
    )
}
