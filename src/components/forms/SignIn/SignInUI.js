import React from 'react';

import Span from '../../Span/Span';

import { useStyles, Copyright } from '../style';
import {
  Button,
  Card,
  CardContent,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container
} from '@material-ui/core';

export default function SignInUI({
  setEmail,
  setPassword,
  span,
  onSubmitSignIn
}) {
  const classes = useStyles();

  return (
    <div className="my-center">
      <Card className={classes.card} style={{ background: '#2E3B55' }}>
        <CardContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="off"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                />
                <Button
                  id="signin_button"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSubmitSignIn}
                >
                  Sign In
                </Button>
              </form>
              {span && <Span content={span} />}
            </div>

            <Box mt={8}>
              <Copyright Typography={Typography} Link={Link} />
            </Box>
          </Container>
        </CardContent>
      </Card>
    </div>
  );
}
