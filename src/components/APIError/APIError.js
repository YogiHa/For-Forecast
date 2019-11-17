import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';

export default function APIError() {
    return (
        <Box className="my-center" style={{ background: "#2E3B55", minWidth: "4000" }}>
          <Grid container direction="column">
            <Grid item xs={12}>
             <Typography variant="h3">
                 OOOPPPPSSS, 
             </Typography>
          <br/><br/>
              <Typography variant="h6">
                 the app reached it 50 calls per day 
              </Typography>
          </Grid>
          <br/><br/>
          <Grid item xs={12}>
             <Typography variant="h5">
                You can always try again tomorrow :)
             </Typography>
            </Grid>
          </Grid>
        </Box>
    )
}