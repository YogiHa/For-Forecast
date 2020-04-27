import React, { useState, useEffect } from 'react';
import { usePosition } from 'use-position';
import { useSelector, useDispatch } from 'react-redux';
import { getGeoForecast } from '../../../store/actions/apiActions';
import { withRouter, Link } from 'react-router-dom';
import { Button, Divider } from '@material-ui/core';

function Links(props) {
  const { latitude, longitude } = usePosition();
  const userName = useSelector(state => state.firebase.profile.firstName);
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState('My');

  useEffect(() => {
    userName ? setDisplayName(`${userName}'s`) : setDisplayName('My');
  }, [userName]);

  const handleGeoCall = () => {
    latitude
      ? dispatch(getGeoForecast(`${latitude},${longitude}`))
      : alert('unable to get user coordinates');
  };

  const { location, CustomTag, setAnchorMenu } = props;
  return (
    <div>
      {location.pathname === `/` ? (
        <div>
          <Link to={`/favorite`} style={{ textDecoration: 'none' }}>
            {' '}
            <CustomTag
              onClick={() => setAnchorMenu && setAnchorMenu(null)}
              id="fav_nav"
              style={{
                color: `${CustomTag === Button ? 'white' : 'black'}`
              }}
            >
              {' '}
              {displayName} favorites{' '}
            </CustomTag>{' '}
          </Link>
          <CustomTag
            onClick={() => setAnchorMenu && setAnchorMenu(null)}
            id="geo_nav"
            onClick={handleGeoCall}
            style={{
              color: `${CustomTag === Button ? 'white' : 'black'}`
            }}
          >
            {' '}
            {displayName} Geo Location Forecast{' '}
          </CustomTag>
        </div>
      ) : (
        <Link to={`/`} style={{ textDecoration: 'none' }}>
          {' '}
          <CustomTag
            onClick={() => setAnchorMenu && setAnchorMenu(null)}
            style={{
              color: `${CustomTag === Button ? 'white' : 'black'}`
            }}
          >
            {' '}
            Main Page{' '}
          </CustomTag>{' '}
        </Link>
      )}
      {CustomTag !== Button && <Divider />}
    </div>
  );
}

export default withRouter(Links);
