import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

export default function CurrentForecast({ currentForecast }) {
  const unit = useSelector(state => state.favorites.unit);

  return (
    <div>
      <Grid
        className="my-center"
        item
        xs={12}
        container
        direction="row"
        spacing={1}
      >
        <Grid item xs={8}>
          <Typography variant="h3">
            Sky condition: {currentForecast.forecast.text}
          </Typography>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid id="current_temp" className="my-center" item xs={12}>
        <Typography variant="h1">
          {currentForecast.forecast[unit] + '°'}
        </Typography>
      </Grid>
    </div>
  );
}
