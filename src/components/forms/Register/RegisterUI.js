import React from 'react';

import Span from '../../Span/Span'

import { useStyles, Copyright } from '../style';
import {
    Container,
    Button,
    Card,
    CardContent,
    CssBaseline,
    TextField,
    Typography,
    Box,
    Grid,
    Link
} from "@material-ui/core";

export default function RegisterUI({ setFirstName, setLastName, setEmail, setPassword, span, onSubmitRegister }) {

    const classes = useStyles();

    return (
        <div className="my-center">
      <Card className={classes.card} style={{ background: "#2E3B55" }}>
        <CardContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                  autoComplete="off"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={e=>setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="off"
                      onChange={e=>setLastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="off"
                      onChange={e=>setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      onChange={e=>setPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSubmitRegister}
                >
                  Register
                </Button>
                   {span && (
                        <Span content={span} />
                    )}
              </form>
            </div>
    
            <Box mt={5}>
              <Copyright Typography={Typography} Link={Link}/>
            </Box>
          </Container>
        </CardContent>
      </Card>
    </div>)
}