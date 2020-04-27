import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import BoxHeader from './BoxHeader/BoxHeader';
import CurrentForecast from './CurrentForecast/CurrentForecast';
import FutureForecast from './FutureForecast/FutureForecast';

import { Box, Grid } from '@material-ui/core';

export default function ForcastDisplay() {
  const currentForecast = useSelector(state => state.api.currentForecast);

  return (
    <Box style={{ background: '#fffdd0', marginLeft: '7%' }} width="86%">
      {currentForecast && (
        <Grid
          container
          direction="column"
          spacing={7}
          justify="space-between"
          alignItems="stretch"
        >
          <BoxHeader currentForecast={currentForecast} />
          <br />
          <br />
          <CurrentForecast currentForecast={currentForecast} />
          <br />
          <br />
          <FutureForecast style={{ width: '86%' }} />
        </Grid>
      )}
    </Box>
  );
}
