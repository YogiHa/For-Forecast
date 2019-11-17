export const addToFavorites = city => {
    return (dispatch, getState) => {
        dispatch({
            type: 'ADD_FAVORITE_LOCALLY',
            city: { ...city, created: new Date() }

        })
    }
}



export const removeFromFavorites = name => {
    return (dispatch, getState) => {
        dispatch({
            type: 'REMOVE_FAVORITE_LOCALLY',
            name
        })
    }
}



export const unitAction = unit => {
    return (dispatch, getState) => {
        dispatch({ type: 'UNIT', unit })
    }
}



export const initialFBFavorites = cities => {
    return (dispatch, getState) => {
        dispatch({ type: "FB_FAVORITES", cities })
    }
}



export const addToFB = paramas => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection(paramas.uid)
            .doc(paramas.currentForecast.name)
            .set({
                location: paramas.currentForecast,
                created: new Date()
            });

        dispatch(addToFavorites(paramas.currentForecast));

    }
}

export const removeFromFB = paramas => {
    const { uid, name } = paramas;
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection(uid)
            .doc(name).delete()


        dispatch(removeFromFavorites(name));

    }
}




export const setFBUnit = paramas => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection("users")
            .doc(paramas.uid)
            .update({ unit: paramas.unit });

        dispatch(unitAction(paramas.unit));

    }
}