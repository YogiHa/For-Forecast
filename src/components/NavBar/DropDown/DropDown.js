import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { unitAction } from '../../../store/actions/favoritesActions';

import DropDownUI from './DropDownUI';

export default function DropDown() {
  const uid = useSelector(state => state.firebase.auth.uid);
  const unit = useSelector(state => state.favorites.unit);

  const dispatch = useDispatch();

  const [toggleValue, setToggleValue] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState(null);

  useEffect(() => {
    setToggleValue(unit === 'imperial');
  }, [unit]);

  const handleClick = e => {
    if (anchorMenu) {
      setAnchorMenu(null);
    } else {
      e.preventDefault();
      setAnchorMenu(e.currentTarget);
    }
  };

  const handleToggle = () => {
    setTimeout(() => handleClick(), 300);
    toggleValue
      ? dispatch(unitAction({ uid, unit: 'metric' }))
      : dispatch(unitAction({ uid, unit: 'imperial' }));
  };

  return (
    <DropDownUI
      handleClick={handleClick}
      anchorMenu={anchorMenu}
      setAnchorMenu={setAnchorMenu}
      toggleValue={toggleValue}
      handleToggle={handleToggle}
    />
  );
}
