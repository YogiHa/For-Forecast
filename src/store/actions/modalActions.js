export const registerModal = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'REGISTER_MODAL'
        })
    }
}

export const signInModal = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SIGNIN_MODAL'
        })
    }
}

export const clearModal = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CLEAR_MODAL'
        })
    }
}