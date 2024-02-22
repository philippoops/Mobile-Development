// firebase configuration
import firebase from 'firebase/compat';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Web app firebase config

const firebaseConfig = {
  apiKey: 'AIzaSyCifawJxM1I-XOpDdgR686Yflk5Ya_Tlu0',
  authDomain: 'authentication-50ebd.firebaseapp.com',
  projectId: 'authentication-50ebd',
  storageBucket: 'authentication-50ebd.appspot.com',
  messagingSenderId: '23387035376',
  appId: '1:23387035376:web:f77bc716d0478de7f39435',
  measurementId: 'G-9ER6CH4D9T',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
