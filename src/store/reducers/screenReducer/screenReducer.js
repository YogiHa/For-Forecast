import initialState from '../initialState';

export const screenReducer = (state = initialState.screen, action) => {
  switch (action.type) {
    case 'SCREEN_MOBILE':
      return 'mobile';
    case 'SCREEN_PC':
      return 'pc';
    default:
      return state;
  }
};
