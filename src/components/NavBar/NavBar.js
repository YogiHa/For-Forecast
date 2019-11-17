import React from 'react';

import Links from './Links/Links';
import DropDown from './DropDown/DropDown';

import { Grid, AppBar, Toolbar, Typography } from '@material-ui/core';


export default function NavBar() {

    return (
        <AppBar style={{background: '#2E3B55'}} position="sticky">
           <Toolbar>
               <Grid container justify="space-between" >
                    <Grid item xs={7}>
                     <Typography variant="h5" align="left">
                        For Forecast
                     </Typography>
                   </Grid>

                 <Links />
                 <DropDown />
                 
               </Grid>
            </Toolbar>
         </AppBar>
    )
}