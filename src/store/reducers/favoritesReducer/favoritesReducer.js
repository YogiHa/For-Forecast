import { combineReducers } from 'redux';
import { citiesReducer } from './citiesReducer/citiesReducer';
import { unitReducer } from './unitReducer/unitReducer';


const favoritesRducer = combineReducers({
    cities: citiesReducer,
    unit: unitReducer,
})

export default favoritesRducer