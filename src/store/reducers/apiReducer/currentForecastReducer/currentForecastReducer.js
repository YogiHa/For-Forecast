import initialState from '../../initialState';

export const currentForecastReducer = (
  state = initialState.api.currentForecast,
  action
) => {
  switch (action.type) {
    case 'API_DAYS_FAVORITES_CURENNT':
    case 'API_CURRENT_FORECAST':
      return action.payload;

    case 'API_CLEAN':
      return null;

    default:
      return state;
  }
};
