import React, { useState, useEffect } from 'react';
import { usePosition } from 'use-position';
import { useSelector, useDispatch } from 'react-redux';
import { getGeoForecast } from '../../../store/actions/apiActions';
import { withRouter, Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

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

  const { pathname } = props.location;
  return (
    <div>
      {pathname === '/' ? (
        <div>
          <Link to="favorite">
            {' '}
            <Button id="fav_nav" style={{ color: 'white' }}>
              {' '}
              {displayName} favorites{' '}
            </Button>{' '}
          </Link>
          <Button
            id="geo_nav"
            onClick={handleGeoCall}
            style={{ color: 'white' }}
          >
            {' '}
            {displayName} Geo Location Forecast{' '}
          </Button>
        </div>
      ) : (
        <Link to="/">
          {' '}
          <Button> Main Page </Button>{' '}
        </Link>
      )}
    </div>
  );
}

export default withRouter(Links);
