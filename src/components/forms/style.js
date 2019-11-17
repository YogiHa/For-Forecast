import React from 'react';
import { makeStyles } from "@material-ui/core/styles";


export const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    card: {
        minWidth: 400
    },

    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));


export const Copyright = ({ Typography, Link }) => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
         {"Copyright © "}
          <Link color="inherit" href="http://hagaiharari.tk/">
            Hagai Harari
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
    );
};