import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  unitAction,
  initialFBFavorites
} from '../store/actions/favoritesActions';
import firebase from './config';

export default function FetchFavorites({ uid }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let FBFavorites = firebase
      .firestore()
      .collection(uid)
      .onSnapshot(sanpshot => {
        const cities = sanpshot.docs.map(doc => ({
          ...doc.data().location,
          created: doc.data().created,
          img: doc.data().img
        }));
        dispatch(initialFBFavorites(cities));
      });

    let FBUnit = firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(sanpshot => {
        dispatch(unitAction({ uid, unit: sanpshot.data().unit }));
      });
    return () => {
      FBFavorites();
      FBUnit();
    };
  }, []);

  return null;
}
