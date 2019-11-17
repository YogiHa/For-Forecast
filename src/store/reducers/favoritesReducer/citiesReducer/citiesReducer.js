import initialState from '../../initialState'

export const citiesReducer = (state = initialState.favorites.cities, action) => {
    let newState;
    switch (action.type) {

        case 'ADD_FAVORITE_LOCALLY':
            return [...state, action.city]

        case 'REMOVE_FAVORITE_LOCALLY':
            newState = state.slice();
            for (let i = 0; i < newState.length; i++) {
                if (newState[i].name === action.name)
                    newState.splice(i, 1)
            }
            return newState

        case 'FAVORITES_API_CALL':
            newState = state.slice();
            for (let i = 0; i < newState.length; i++) {
                if (newState[i].name === action.name)
                    newState[i].forecast = action.forecast.Temperature
            }
            return newState

        case "FB_FAVORITES":
            return [...action.cities]

        case "SIGNOUT_SUCCESS":
            return []

        default:
            return state;

    }
}