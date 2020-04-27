import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setScreen } from '../store/actions/screenActions';
import { HashRouter, Route, Switch } from 'react-router-dom';

import MainPage from './MainPage/MainPage';
import FavoritePage from './FavoritePage/FavoritePage';

import NavBar from '../components/NavBar/NavBar';

import Modal from '../components/Modal/Modal';
import SignIn from '../components/forms/SignIn/SignIn';
import Register from '../components/forms/Register/Register';
import APIError from '../components/APIError/APIError';

import FetchFavorites from '../firebase/FetchFavorites';

import Particles from 'react-particles-js';
import particlesOptions from '../assets/particlesOptions';

export default function Router() {
  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 1075
        ? dispatch(setScreen('mobile'))
        : dispatch(setScreen('pc'));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const dispatch = useDispatch();

  const uid = useSelector(state => state.firebase.auth.uid);
  const modal = useSelector(state => state.modal);
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Particles className="particles" param={particlesOptions} />
      <NavBar />
      <Switch>
        <Route exact path={`/`} component={MainPage} />
        <Route exact path={`/favorite`} component={FavoritePage} />
      </Switch>

      {modal && (
        <Modal dispatch={dispatch}>
          {modal === 'register' && <Register />}
          {modal === 'signIn' && <SignIn />}
          {modal === 'apiError' && <APIError />}
        </Modal>
      )}

      {uid && <FetchFavorites uid={uid} />}
    </HashRouter>
  );
}
