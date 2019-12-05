export const setMobileScreen = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SCREEN_MOBILE'
    });
  };
};

export const setPCScreen = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SCREEN_PC'
    });
  };
};
