import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyC9TGFztgJ9l0mFPHzHtHLEP7KC4mQ_jwg",
  authDomain: "cs394-scheduler-47013.firebaseapp.com",
  databaseURL: "https://cs394-scheduler-47013-default-rtdb.firebaseio.com",
  projectId: "cs394-scheduler-47013",
  storageBucket: "cs394-scheduler-47013.appspot.com",
  messagingSenderId: "769511323809",
  appId: "1:769511323809:web:329e77e3e7ea286bd098e0"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) console.log(`loading ${path}`);

    return onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        if (devMode) console.log(val);
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, loading, error];
};
