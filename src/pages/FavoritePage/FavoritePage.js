import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getFavoriteForecast } from '../../store/actions/apiActions';

import FavoritesIcons from '../../components/FavoritesIcons/FavoritesIcons';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Box,
  Typography
} from '@material-ui/core';
import { useStyles } from './style';

export default function FavoritePage() {
  const favorites = useSelector(state => state.favorites);
  const { cities, unit } = favorites;
  const dispatch = useDispatch();

  useEffect(() => {
    cities.map(city => {
      const { key, name } = city;
      dispatch(getFavoriteForecast({ key, name }));
    });
  }, []);

  const classes = useStyles();
  return (
    <Box width={'100%'} mt={'7%'}>
      {cities.length === 0 ? (
        <Typography id="empty_favorites" className="my-center" variant="h3">
          You have not saved any location yet.
        </Typography>
      ) : (
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={2.5}>
            {cities.map(tile => {
              const { key, name, forecast, img } = tile;
              return (
                <GridListTile key={name}>
                  <img
                    src={img ? img : require('../../assets/flower.png')}
                    height={280}
                    width={400}
                    alt={name}
                  />
                  <GridListTileBar
                    title={`${name} - ${forecast[unit]}°`}
                    actionIcon={
                      <FavoritesIcons
                        cityKey={key}
                        name={name}
                        className={classes.title}
                      />
                    }
                  />
                </GridListTile>
              );
            })}
          </GridList>
        </div>
      )}
    </Box>
  );
}
