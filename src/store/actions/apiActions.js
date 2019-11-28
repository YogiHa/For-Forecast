export const cityAutoComplete = input => {
  let locations = [];
  return (dispatch, getState) => {
    fetch('http://localhost:3001/autocomplete', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input })
    })
      .then(response => response.json())
      .then(respCities => {
        let modified = JSON.parse(respCities);
        modified.filter(city => {
          if (!locations.includes(city.LocalizedName))
            locations.push({ name: city.LocalizedName, key: city.Key });
        });
      })
      .then(() => dispatch({ type: 'API_AUTOCOMPLETE', locations }))

      .catch(err => dispatch({ type: 'MODAL_API_ERR', err }));
  };
};

export const clearAutoComplete = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'API_CLEAN_AUTOCOMPLETE' });
  };
};

const handleDaysAPI = key => {
  let days = [];
  return fetch('http://localhost:3001/get5daysforecast', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key })
  })
    .then(response => response.json())
    .then(response => {
      let respDays = JSON.parse(response);
      respDays.DailyForecasts.map(day => {
        days.push({
          date: day.Date,
          temp: day.Temperature
        });
      });
      return days;
    });
};

export const getDaysForecast = key => {
  return (dispatch, getState) => {
    handleDaysAPI(key)
      .then(days => {
        dispatch({ type: 'API_DAYS_FORECAST', days });
      })
      .catch(err => dispatch({ type: 'MODAL_API_ERR', err }));
  };
};

export const handleFavorite = city => {
  return (dispatch, getState) => {
    handleDaysAPI(city[0].key)
      .then(days => {
        dispatch({
          type: 'API_DAYS_FAVORITES_CURENNT',
          days,
          payload: city[0]
        });
      })
      .catch(err => dispatch({ type: 'MODAL_API_ERR', err }));
  };
};

const handleCurrentAPI = key => {
  return fetch('http://localhost:3001/getcurrentforecast', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key })
  })
    .then(response => response.json())
    .then(response => {
      let modified = JSON.parse(response);
      let forecast = {
        imperial: modified[0].Temperature.Imperial.Value,
        metric: modified[0].Temperature.Metric.Value,
        text: modified[0].WeatherText
      };
      return forecast;
    });
};

export const getCurrentForecast = ({ key, name }) => {
  let payload = {};
  payload.name = name;
  payload.key = key;
  return (dispatch, getState) => {
    handleCurrentAPI(key)
      .then(forecast => (payload.forecast = forecast))
      .then(() => {
        dispatch({ type: 'API_CURRENT_FORECAST', payload });
      })

      .catch(err => dispatch({ type: 'MODAL_API_ERR', err }));
  };
};

export const getFavoriteForecast = ({ key, name }) => {
  let payload = {};
  payload.name = name;
  return (dispatch, getState) => {
    handleCurrentAPI(key)
      .then(forecast => (payload.forecast = forecast))
      .then(() => {
        dispatch({ type: 'FAVORITES_CITIES_API_CALL', payload });
      })
      .catch(err => dispatch({ type: 'MODAL_API_ERR', err }));
  };
};

export const getGeoForecast = coordinates => {
  return (dispatch, getState) => {
    fetch('http://localhost:3001/getgeoforecast', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ coordinates })
    })
      .then(response => response.json())
      .then(response => {
        let modified = JSON.parse(response);
        dispatch(
          getCurrentForecast({ name: modified.EnglishName, key: modified.Key })
        );
      })
      .catch(err => dispatch({ type: 'MODAL_API_ERR', err }));
  };
};

export const clearForecast = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'API_CLEAN' });
  };
};
