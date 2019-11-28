export const registerModal = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'MODAL_REGISTER'
    });
  };
};

export const signInModal = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'MODAL_SIGNIN'
    });
  };
};

export const clearModal = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'MODAL_CLEAR'
    });
  };
};
