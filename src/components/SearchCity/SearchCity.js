import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  cityAutoComplete,
  clearAutoComplete
} from '../../store/actions/apiActions';

import { TextField, InputLabel, FormHelperText } from '@material-ui/core';
import './SearchCity.css';

export default function SearchCity({ handleSubmit }) {
  const autoComplete = useSelector(state => state.api.autoComplete);
  const modal = useSelector(state => state.modal);

  const dispatch = useDispatch();

  const [searchField, setSearchField] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  const [isSpan, setIsSpan] = useState(false);

  useEffect(() => {
    if (autoComplete) {
      setIsSpan(autoComplete.length === 0);
      if (isLoading) {
        setIsLoading(false);
        setFilteredCities(autoComplete);
        setShowOptions(true);
      } else {
        setFilteredCities(
          autoComplete.filter(city =>
            city.name.toLowerCase().includes(searchField.toLowerCase())
          )
        );
      }
    } else {
      setFilteredCities([]);
      setShowOptions(false);
    }
  }, [isLoading, searchField, autoComplete]);

  useEffect(() => {
    modal === 'apiError' && setIsLoading(false);
  }, [modal]);

  const handleChange = e => {
    let { value } = e.target;
    setSearchField(value);
    if (value.length > 2 && !autoComplete) {
      setIsLoading(true);
      dispatch(cityAutoComplete(value));
    } else if (value.length <= 2) {
      setIsLoading(false);
      dispatch(clearAutoComplete());
    }
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      setActiveOption(0);
      let { key, name } = filteredCities[activeOption];
      handleSubmit({ key, name });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setActiveOption(activeOption - 1);
    } else if (e.keyCode === 40) {
      if (activeOption === filteredCities.length - 1) {
        return;
      }
      setActiveOption(activeOption + 1);
    } else if (e.keyCode === 27) {
      setShowOptions(false);
    }
  };
  return (
    <div>
      <div className="my-center">
        <TextField
          autoComplete="off"
          autoFocus
          variant="outlined"
          fullWidth
          id="search_input"
          name="search-input"
          onChange={handleChange}
          onKeyDown={e => handleKeyDown(e)}
        />
        {isLoading ? (
          <img
            alt="loading"
            src={require('../../assets/loading.svg')}
            height="75"
            width="75"
          />
        ) : (
          <img
            alt="arrow"
            onClick={() => autoComplete && setShowOptions(!showOptions)}
            src={require('../../assets/arrow.jpg')}
            height="75"
            width="75"
            className={`${autoComplete && 'pointer'} ${showOptions &&
              'transform'}`}
          />
        )}
      </div>

      {!autoComplete ? (
        <InputLabel>
          <FormHelperText> type 3 letters for auto-complete </FormHelperText>
        </InputLabel>
      ) : (
        showOptions && (
          <ul className="options">
            {filteredCities.map((city, index) => {
              const { name, key } = city;
              return (
                <li
                  className={index === activeOption && 'active-option'}
                  id="filtered"
                  onClick={() => handleSubmit({ key, name })}
                  key={index}
                >
                  {name}
                </li>
              );
            })}
            {autoComplete.length > filteredCities.length && (
              <li
                style={{ background: '#F08080' }}
                onClick={() => dispatch(cityAutoComplete(searchField))}
              >{`isn't what you search for?`}</li>
            )}
            {isSpan && <li>{'there is no city match to your input search'}</li>}
          </ul>
        )
      )}
    </div>
  );
}
