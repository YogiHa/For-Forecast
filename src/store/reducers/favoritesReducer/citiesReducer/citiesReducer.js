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
      return state.filter(city => city.name != action.name);

    case 'FAVORITES_CITIES_API_CALL':
      return state.map(city =>
        city.name === action.payload.name
          ? { ...city, forecast: action.payload.forecast }
          : city
      );

    case 'FAVORITES_CITIES_FB_INITIALS':
      return [...action.cities];

    case 'FAVORITES_SIGNOUT_SUCCESS':
      return [];

    case 'FAVORITES_CITIES_IMG':
      return state.map(city =>
        city.name === action.name ? { ...city, ing: action.img } : city
      );

    default:
      return state;
  }
};
