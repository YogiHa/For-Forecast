import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Grid, Typography, Box } from '@material-ui/core';
import ScrollY from '../../ScrollY';
export default function FutureForecast() {
  const screen = useSelector(state => state.screen);
  const unit = useSelector(state => state.favorites.unit);
  const daysForecast = useSelector(state => state.api.daysForecast);

  const [days, setDays] = useState([]);

  useEffect(() => {
    if (daysForecast) {
      setDays(daysForecast);
    }
  }, [daysForecast]);

  const imperialToMetric = num => Math.floor((num - 32) / 1.8);

  const colors = ['#fe6b40', '#ff8829', '#ffb366', '#a5c90f', '#6f9c3d'];

  const Degree = ({ minTemp, maxTemp }) => {
    let minDegree =
      unit === 'metric'
        ? imperialToMetric(minTemp).toString()
        : minTemp.toString();
    let maxDegree =
      unit === 'metric'
        ? imperialToMetric(maxTemp).toString()
        : maxTemp.toString();

    return (
      <Grid id="future_temp" item xs={12}>
        <Typography
          variant={screen === 'mobile' ? 'h6' : 'h4'}
          style={{ align: 'center', flexGrow: 1 }}
        >
          {minDegree}°-{maxDegree}°
        </Typography>
      </Grid>
    );
  };

  return (
    <div style={{ width: '95%', alignSelf: 'center' }}>
      <ScrollY>
        {days.length > 0 && (
          <Grid
            item
            style={{
              marginLeft: `${screen === 'pc' ? '3%' : '1%'}`,
              marginTop: '1%',
              paddingBottom: '1%',
              flex: 0.5
            }}
            xs={12}
            container
            direction="row"
            spacing={3}
            justify="space-between"
          >
            {days.map((day, i) => (
              <Grid
                key={i}
                item
                xs={screen === 'mobile' ? 1 : 2}
                container
                direction="row"
                spacing={screen === 'mobile' ? 1 : 2}
                justify="space-between"
              >
                <Box style={{ background: colors[i] }}>
                  <Grid item xs={6}>
                    <Degree
                      minTemp={day.temp.Minimum.Value}
                      maxTemp={day.temp.Maximum.Value}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Moment style={{ marginLeft: '10%' }} format="DD/MM/YYYY">
                      {day.date}
                    </Moment>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </ScrollY>
    </div>
  );
}
