import { combineReducers } from 'redux';
import { autoCompleteReducer } from './autoCompleteReducer/autoCompleteReducer';
import { currentForecastReducer } from './currentForecastReducer/currentForecastReducer';
import { daysForecastReducer } from './daysForecastReducer/daysForecastReducer';

const apiReducer = combineReducers({
  autoComplete: autoCompleteReducer,
  currentForecast: currentForecastReducer,
  daysForecast: daysForecastReducer
});

export default apiReducer;
