import initialState from '../initialState';

export const screenReducer = (state = initialState.screen, action) => {
  switch (action.type) {
    case 'SCREEN':
      return action.screen;
    default:
      return state;
  }
};
