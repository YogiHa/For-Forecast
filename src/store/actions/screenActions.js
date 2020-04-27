export const setScreen = screen => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SCREEN',
      screen
    });
  };
};
