import styles from '../../styles/swap.module.css';
import Header from "../../components/Header";
import { styled } from '@mui/material/styles';
import ChartContainer from "../../components/CustomChart";
import {Container, CssBaseline, Grid, Paper} from "@mui/material";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const Swap = () => {

    const theme = createTheme();

    /*return (
        <div className={styles.container}>
            <Header type={false}/>
            <Container maxWidth={"xl"}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <ChartContainer />
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                </Grid>
            </Container>
            {/!*<div className={styles.outerContainer}>
                <div className={styles.outerSubContainer}>
                    <div className={styles.leftContainer}>
                        <ChartContainer />
                    </div>
                    <div className={styles.rightContainer}>

                    </div>
                </div>
            </div>*!/}
        </div>
    );*/
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={"xl"}>
                <Header type={false} />
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <ChartContainer />
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default Swap;