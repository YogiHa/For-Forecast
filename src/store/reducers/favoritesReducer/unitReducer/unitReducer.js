import initialState from '../../initialState';

export const unitReducer = (state = initialState.favorites.unit, action) => {
  switch (action.type) {
    case 'FAVORITES_UNIT_SESSION':
      return action.unit;
    case 'FAVORITES_SIGNOUT_SUCCESS':
      return 'metric';
    default:
      return state;
  }
};
