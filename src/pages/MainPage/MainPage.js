import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux';
import { getCurrentForecast, getDaysForecast, clearForecast, handleFavorite } from '../../store/actions/apiActions';

import SearchCity from '../../components/SearchCity/SearchCity';
import ForecastDisplay from '../../components/ForecastDisplay/ForecastDisplay';
import Grid from '@material-ui/core/Grid';

function MainPage(props) {

    const daysForecast = useSelector(state => state.api.daysForecast);
    const modal = useSelector(state => state.modal);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        dispatch(clearForecast());
        const { state } = props.location;
        state && state.currentCity ? dispatch(handleFavorite(state.currentCity)) : handleSubmit({ key: "215854", name: "Tel Aviv" })
    }, [])


    useEffect(() => {
        modal === 'apiError' && setIsLoading(false)
    }, [modal])

    if (daysForecast && isLoading) {
        setIsLoading(false)
    }


    const handleSubmit = city => {
        dispatch(clearForecast());
        setIsLoading(true);
        document.getElementsByName('search-input')[0].value = "";

        dispatch(getCurrentForecast(city));
        dispatch(getDaysForecast(city.key));
    }

    return (
        <Grid container direction="column" spacing={6} justify="space-between" alignItems="stretch">

        <Grid className="my-center" item xs={12}>
          <SearchCity  handleSubmit={handleSubmit} />
        </Grid>

        {isLoading &&
           <img alt="loading" src={require('../../assets/loading.svg')} />
          }

        {daysForecast &&
           <Grid  item xs={12}>
             <ForecastDisplay />
           </Grid> 
          }
         

        </Grid>
    )

}

export default withRouter(MainPage)