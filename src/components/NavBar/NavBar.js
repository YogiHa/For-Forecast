import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Links from './Links/Links';
import DropDown from './DropDown/DropDown';

import { Grid, AppBar, Toolbar, Typography, Button } from '@material-ui/core';

export default function NavBar() {
  const screen = useSelector(state => state.screen);
  return (
    <AppBar style={{ background: '#2E3B55' }} position="sticky">
      <Toolbar>
        <Grid container justify="space-between">
          <Grid item xs={7}>
            <Typography variant="h5" align="left">
              For Forecast
            </Typography>
          </Grid>

          {screen === 'pc' && <Links CustomTag={Button} />}
          <DropDown />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
