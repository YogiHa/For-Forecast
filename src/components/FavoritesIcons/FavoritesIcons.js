import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromFB, removeFromFavorites } from '../../store/actions/favoritesActions';
import { clearForecast } from '../../store/actions/apiActions';

import { ButtonGroup, Button } from '@material-ui/core';

export default function FavoritesIcons({ name }) {

    const favorites = useSelector(state => state.favorites.cities);
    const uid = useSelector(state => state.firebase.auth.uid);
    const dispatch = useDispatch();
    const currentCity = favorites.filter(favorite => favorite.name === name)

    const handleRemoveFromFavorites = () => {
        uid ? dispatch(removeFromFB({ name, uid })) : dispatch(removeFromFavorites(name))
    }

    return (
        <ButtonGroup>
          <Button onClick={()=>dispatch(clearForecast())}>
            <Link to={{
             pathname: '/',
             state: {currentCity}
           }} >
             <img alt="reload" src={require('../../assets/reload.png')} height={60} width={60} />
            </Link>
           </Button>
          <Button onClick={handleRemoveFromFavorites}>
            <img alt="delete" src={require('../../assets/trash.png')} height={60} width={60}  />
         </Button>
      </ButtonGroup>
    )
}