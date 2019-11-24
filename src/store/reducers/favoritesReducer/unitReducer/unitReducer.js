import initialState from '../../initialState';

export const unitReducer = (state = initialState.favorites.unit, action) => {
  switch (action.type) {
    case 'UNIT':
      return action.unit;
    case 'SIGNOUT_SUCCESS':
      return 'metric';
    default:
      return state;
  }
};
