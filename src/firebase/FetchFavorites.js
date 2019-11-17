import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unitAction, initialFBFavorites } from '../store/actions/favoritesActions';
import firebase from './config';

export default function FetchFavorites({ uid }) {

    const dispatch = useDispatch();

    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot(sanpshot => {
                dispatch(unitAction(sanpshot.data().unit))
            });
        return () => unsubscribe();

    }, []);

    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection(uid)
            .onSnapshot(sanpshot => {
                const cities = sanpshot.docs.map(doc => ({
                    ...doc.data().location,
                    created: doc.data().created
                }));
                dispatch(initialFBFavorites(cities))
            });
        return () => unsubscribe();

    }, []);


    return null;
}