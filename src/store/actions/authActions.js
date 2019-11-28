export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({
          type: 'AUTH_ERROR_CLEARED'
        });
      })
      .catch(err => {
        dispatch({
          type: 'AUTH_ERR',
          err
        });
      });
  };
};

export const register = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection('users')
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            unit: 'metric'
          });
      })
      .then(() => {
        dispatch({ type: 'AUTH_ERROR_CLEARED' });
      })
      .catch(err => {
        dispatch({
          type: 'AUTH_ERR',
          err
        });
      });
  };
};

export const cleanError = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'AUTH_ERROR_CLEARED'
    });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'FAVORITES_SIGNOUT_SUCCESS' });
      });
  };
};
