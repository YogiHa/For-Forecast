export default {
  screen: 'pc',
  modal: null,
  authError: null,
  api: {
    autoComplete: null,
    currentForecast: {
      city: null,
      key: null,
      forecast: { imperial: 0, metric: 0, text: null }
    },
    daysForecast: null
  },
  favorites: {
    cities: [],
    unit: 'metric'
  }
};
