import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { cityAutoComplete, clearAutoComplete } from '../../store/actions/apiActions';

import Span from '../Span/Span';
import { TextField, InputLabel, FormHelperText, Grid, Button } from '@material-ui/core';

export default function SearchCity({ handleSubmit }) {

    const autoComplete = useSelector(state => state.api.autoComplete);
    const modal = useSelector(state => state.modal);

    const dispatch = useDispatch();

    const [searchField, setSearchField] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);
    const [isSpan, setIsSpan] = useState(false);

    useEffect(() => {
        if (autoComplete) {
            setIsSpan(autoComplete.length === 0)
            if (isLoading) {
                setIsLoading(false);
                setFilteredCities(autoComplete);
            } else {
                setFilteredCities(autoComplete.filter(city => city.name.toLowerCase().includes(searchField.toLowerCase())))
            }
        } else {
            setFilteredCities([])
        }
    }, [isLoading, searchField, autoComplete]);

    useEffect(() => {
        modal === 'apiError' && setIsLoading(false)
    }, [modal])

    const handleChange = e => {
        const { value } = e.target;
        setSearchField(value);
        if (value.length > 2 && !autoComplete) {
            setIsLoading(true)
            dispatch(cityAutoComplete(value))
        } else if (value.length <= 2) {
            setIsLoading(false);
            dispatch(clearAutoComplete())
        }
    }

    return (
        <div>
         <TextField name="search-input" onChange={handleChange} />
         { !autoComplete ?
            (
            <InputLabel>
               <FormHelperText> type 3 letters for auto-complete </FormHelperText>
            </InputLabel>
            ) 
          :
           (
            <Grid container spacing={3}>
                {
                 filteredCities.map(city =>{
                    const { name, key } = city;
                    return(
                      <Grid onClick={()=>handleSubmit({key, name})} key={name} item xs={3}>
                        <Button  style={{background: "#DDA0DD"}} fullWidth>{name}</Button> 
                      </Grid>)
                  })
                 }      
                 {
                  isSpan ?  <Span span={"there is no city match "} /> :      
                  <Grid style={{background: "#ff0000"}} item xs={10}>
                    <Button onClick={()=>dispatch(cityAutoComplete(searchField))} > Isn't what you search for ? </Button>
                  </Grid>
                 }              
             </Grid>
            )
         }
         {isLoading && <img alt="loading" src={require('../../assets/loading.svg')} height='150' width='150' />}        
        </div>
    )
}