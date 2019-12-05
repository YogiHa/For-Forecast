import { combineReducers } from 'redux';
import apiReducer from './apiReducer/apiReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { authErrorReducer } from './authErrorReducer/authErrorReducer';
import { modalReducer } from './modalReducer/modalReducer';
import { screenReducer } from './screenReducer/screenReducer';
import favoritesReducer from './favoritesReducer/favoritesReducer';

const rootReducer = combineReducers({
  api: apiReducer,
  firebase: firebaseReducer,
  authError: authErrorReducer,
  modal: modalReducer,
  screen: screenReducer,
  favorites: favoritesReducer
});

export default rootReducer;
