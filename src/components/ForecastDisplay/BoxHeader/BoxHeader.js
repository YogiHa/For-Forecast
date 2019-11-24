import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
  addFavoriteImg
} from '../../../store/actions/favoritesActions';

import Moment from 'react-moment';
import { Grid, Typography, Button } from '@material-ui/core';

export default function BoxHeader({ currentForecast }) {
  const { name } = currentForecast;

  const dispatch = useDispatch();

  const uid = useSelector(state => state.firebase.auth.uid);
  const favorites = useSelector(state => state.favorites.cities);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites) {
      let favNames = favorites.map(favorite => favorite.name);
      setIsFavorite(favNames.includes(name));
    }
  }, [favorites, name]);

  const handleAddToFavorites = () => {
    dispatch(addToFavorites({ city: currentForecast, uid }));
    dispatch(addFavoriteImg({ uid, name }));
  };

  return (
    <Grid
      item
      xs={12}
      container
      direction="row"
      justify="space-between"
      spacing={2}
    >
      <Grid container item xs={7} justify="flex-start">
        <Grid id="fav_button" item xs={2}>
          {isFavorite ? (
            <Button
              onClick={() => dispatch(removeFromFavorites({ name, uid }))}
            >
              <img
                alt="star"
                height={50}
                widtg={50}
                src={require('../../../assets/star.png')}
              />
            </Button>
          ) : (
            <Button onClick={handleAddToFavorites}>
              <img
                alt="hollowstar"
                height={40}
                widtg={40}
                src={require('../../../assets/emptystar.png')}
              />
            </Button>
          )}
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h3">{name}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Moment style={{ marginLeft: '10%' }} format="HH:mm DD/MM/YYYY">
          {new Date()}
        </Moment>
      </Grid>
    </Grid>
  );
}
