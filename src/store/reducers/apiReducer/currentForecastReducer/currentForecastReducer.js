import initialState from '../../initialState';

export const currentForecastReducer = (state = initialState.api.currentForecast, action) => {
    switch (action.type) {

        case "API_GEO_CALL":
        case 'API_DAYS_FAVORITES_CURENNT':
        case 'API_CURRENT_FORECAST':
            return action.data

        case "API_CLEAN":
            return null

        default:
            return state
    }
}