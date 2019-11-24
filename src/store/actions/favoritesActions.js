export const addToFavorites = params => {
  return (dispatch, getState, { getFirestore }) => {
    if (params.uid) {
      const firestore = getFirestore();
      firestore
        .collection(params.uid)
        .doc(params.city.name)
        .set({
          location: params.city,
          created: new Date(),
          img: null
        });
    }
    dispatch({
      type: 'ADD_FAVORITE_LOCALLY',
      city: { ...params.city, created: new Date(), img: null }
    });
  };
};

export const removeFromFavorites = params => {
  return (dispatch, getState, { getFirestore }) => {
    if (params.uid) {
      const firestore = getFirestore();
      firestore
        .collection(params.uid)
        .doc(params.name)
        .delete();
    }
    dispatch({
      type: 'REMOVE_FAVORITE_LOCALLY',
      name: params.name
    });
  };
};

export const unitAction = params => {
  return (dispatch, getState, { getFirestore }) => {
    if (params.uid) {
      const firestore = getFirestore();
      firestore
        .collection('users')
        .doc(params.uid)
        .update({ unit: params.unit });
    }
    dispatch({ type: 'UNIT', unit: params.unit });
  };
};

export const initialFBFavorites = cities => {
  return (dispatch, getState) => {
    dispatch({ type: 'FB_FAVORITES', cities });
  };
};

export const addFavoriteImg = params => {
  const { name, uid } = params;
  return (dispatch, getState, { getFirestore }) => {
    fetch('http://localhost:3001/getimg', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(response => {
        if (uid) {
          const firestore = getFirestore();
          firestore
            .collection(uid)
            .doc(name)
            .update({ img: response });
        }
        dispatch({ type: 'FAVORITE_IMG', name, img: response });
      });
  };
};
