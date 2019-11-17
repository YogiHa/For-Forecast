import initialState from '../initialState';


export const authErrorReducer = (state = initialState.authError, action) => {
    switch (action.type) {
        case 'AUTH_ERROR_CLEARED':
            return null;

        case 'AUTH_ERR':
            return action.err.message;

        default:
            return state;
    }
};