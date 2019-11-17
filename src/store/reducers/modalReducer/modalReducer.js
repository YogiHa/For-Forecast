import initialState from '../initialState';

export const modalReducer = (state = initialState.modal, action) => {
    switch (action.type) {
        case 'SIGNIN_MODAL':
            return 'signIn';
        case 'REGISTER_MODAL':
            return 'register';
        case 'API_ERR':
            return 'apiError';
        case 'CLEAR_MODAL':
            return null
        default:
            return state;
    }
}