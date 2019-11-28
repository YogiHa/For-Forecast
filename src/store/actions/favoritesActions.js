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
      type: 'FAVORITE_CITIES_SESSION',
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
      type: 'FAVORITE_CITIES_SESSION_REMOVE',
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
    dispatch({ type: 'FAVORITES_UNIT_SESSION', unit: params.unit });
  };
};

export const initialFBFavorites = cities => {
  return (dispatch, getState) => {
    dispatch({ type: 'FAVORITES_CITIES_FB_INITIALS', cities });
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
        dispatch({ type: 'FAVORITES_CITIES_IMG', name, img: response });
      });
  };
};
