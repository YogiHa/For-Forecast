import initialState from '../../initialState';

export const citiesReducer = (
  state = initialState.favorites.cities,
  action
) => {
  let newState;
  switch (action.type) {
    case 'FAVORITE_CITIES_SESSION':
      return [...state, { ...action.city }];

    case 'FAVORITE_CITIES_SESSION_REMOVE':
      newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].name === action.name) newState.splice(i, 1);
      }
      return newState;

    case 'FAVORITES_CITIES_API_CALL':
      newState = [...state];
      newState.filter(city => {
        city.name === action.payload.name &&
          (city.forecast = action.payload.forecast);
      });
      return newState;

    case 'FAVORITES_CITIES_FB_INITIALS':
      return [...action.cities];

    case 'FAVORITES_SIGNOUT_SUCCESS':
      return [];

    case 'FAVORITES_CITIES_IMG':
      newState = [...state];
      newState.filter(city => {
        city.name === action.name && (city.img = action.img);
      });
      return newState;

    default:
      return state;
  }
};
