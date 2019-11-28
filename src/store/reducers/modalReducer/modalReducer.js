import initialState from '../initialState';

export const modalReducer = (state = initialState.modal, action) => {
  switch (action.type) {
    case 'MODAL_SIGNIN':
      return 'signIn';
    case 'MODAL_REGISTER':
      return 'register';
    case 'MODAL_API_ERR':
      return 'apiError';
    case 'MODAL_CLEAR':
      return null;
    default:
      return state;
  }
};
