import initialState from '../../initialState';

export const daysForecastReducer = (state = initialState.api.daysForecast, action) => {
    switch (action.type) {

        case 'API_DAYS_FORECAST':
        case 'API_DAYS_FAVORITES_CURENNT':
            return action.days

        case "API_CLEAN":
            return null

        default:
            return state
    }
}