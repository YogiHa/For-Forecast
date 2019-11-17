import initialState from '../../initialState';

export const autoCompleteReducer = (state = initialState.api.autoComplete, action) => {
    switch (action.type) {

        case 'API_AUTOCOMPLETE':
            return action.locations

        case "API_CLEAN":
        case "API_CLEAN_AUTOCOMPLETE":
            return null

        default:
            return state
    }
}